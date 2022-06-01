import { observable, computed, reaction, makeObservable } from 'mobx';
import { remoteData } from 'cbioportal-frontend-commons';
import {
    fetchCivicVariants,
    genomicLocationString,
    getCivicGenes,
    ICivicGeneIndex,
    ICivicVariantIndex,
} from 'cbioportal-utils';
import { VariantAnnotation } from 'genome-nexus-ts-api-client';
import {
    IndicatorQueryResp,
    CancerGene as OncoKbGene,
} from 'oncokb-ts-api-client';
import MobxPromise from 'mobxpromise';
import _ from 'lodash';
import qs from 'qs';
import {
    initDefaultMutationMapperStore,
    DataFilterType,
} from 'react-mutation-mapper';
import { annotationQueryFields } from '../config/configDefaults';
import { getTranscriptConsequenceSummary } from '../util/AnnotationSummaryUtil';
import { getDataFetcher } from '../util/ApiUtils';
import genomeNexusInternalClient from '../util/genomeNexusClientInternalInstance';
import genomeNexusClient from '../util/genomeNexusClientInstance';
import oncoKbClient from '../util/oncokbClientInstance';
import {
    variantToGenomicLocationString,
    variantToMutation,
} from '../util/variantUtils';
import { MainStore } from './MainStore';

export interface VariantStoreConfig {
    variant: string;
}
export class VariantStore {
    public query: any;
    constructor(
        public variantId: string,
        public queryString: string,
        public mainStore: MainStore
    ) {
        makeObservable(this);
        this.variant = variantId;
        this.query = qs.parse(this.queryString, { ignoreQueryPrefix: true });
        this.parseUrl();
        // set activeTranscript when MutationMapperStore is created
        reaction(
            () => this.getMutationMapperStore,
            (store) => {
                if (store !== undefined) {
                    this.getMutationMapperStore!.setSelectedTranscript(
                        this.query.transcriptId
                    );
                }
            }
        );
    }

    private parseUrl() {
        if (this.query.transcriptId) {
            this.selectedTranscript = this.query.transcriptId;
        }
    }

    @observable public allResources: string[] = [
        'Cancer Hotspots',
        'OncoKB',
        'COSMIC',
        'cBioPortal',
        'Mutation Assessor',
        'CIViC',
        'PMKB',
        'SIFT',
        'Polyphen-2',
        'UniProt',
        'PFAM',
        'PDB',
        'ProSite',
        'PhosphoSitePlus',
        'PTM',
        'External Links',
    ];
    @observable public selectedResources: string[] = this.allResources;
    @observable public variant: string = '';
    @observable public selectedTranscript: string = '';

    readonly annotation = remoteData<VariantAnnotation>({
        invoke: async () => {
            return await genomeNexusClient.fetchVariantAnnotationGET({
                variant: this.variant,
                isoformOverrideSource: 'mskcc',
                fields: annotationQueryFields(),
            });
        },
        onError: (err: Error) => {
            // fail silently
        },
    });

    readonly indexedAnnotation: MobxPromise<{
        [genomicLocation: string]: VariantAnnotation;
    }> = remoteData({
        await: () => [this.annotation],
        invoke: () => {
            const indexedAnnotation: {
                [genomicLocation: string]: VariantAnnotation;
            } = {};
            if (this.annotation.result?.annotation_summary?.genomicLocation) {
                indexedAnnotation[
                    genomicLocationString(
                        this.annotation.result.annotation_summary
                            .genomicLocation
                    )
                ] = this.annotation.result;
            }
            return Promise.resolve(indexedAnnotation);
        },
        onError: () => {
            // fail silently, leave the error handling responsibility to the data consumer
        },
    });

    readonly oncokbData: MobxPromise<IndicatorQueryResp> = remoteData({
        await: () => [this.mainStore.genomeBuild],
        invoke: async () => {
            return await oncoKbClient.annotateMutationsByHGVSgGetUsingGET_1({
                hgvsg: this.variant,
                referenceGenome: this.mainStore.genomeBuild.result || undefined,
            });
        },
        onError: () => {
            // fail silently, leave the error handling responsibility to the data consumer
        },
    });

    readonly oncokbGenes = remoteData<OncoKbGene[]>({
        await: () => [],
        invoke: async () => {
            return oncoKbClient.utilsCancerGeneListGetUsingGET_1({});
        },
        onError: (error) => {},
        default: [],
    });

    readonly oncokbGenesMap = remoteData<{ [hugoSymbol: string]: OncoKbGene }>({
        await: () => [this.oncokbGenes],
        invoke: async () => {
            return Promise.resolve(
                _.keyBy(this.oncokbGenes.result, (gene) => gene.hugoSymbol)
            );
        },
        onError: (error) => {},
        default: {},
    });

    readonly civicGenes = remoteData<ICivicGeneIndex | undefined>({
        await: () => [this.annotation],
        invoke: async () =>
            getCivicGenes([
                Number(
                    getTranscriptConsequenceSummary(this.annotationSummary)
                        ?.entrezGeneId
                        ? getTranscriptConsequenceSummary(
                              this.annotationSummary
                          )!.entrezGeneId
                        : 0
                ),
            ]),
        onError: () => {},
    });

    readonly civicVariants = remoteData<ICivicVariantIndex | undefined>({
        await: () => [this.civicGenes],
        invoke: async () => {
            if (this.civicGenes.result) {
                const mutations = variantToMutation(this.annotationSummary);

                mutations.forEach((mutation) => {
                    // fetchCivicVariants cannot handle protein change values starting with 'p.'
                    if (mutation.proteinChange) {
                        mutation.proteinChange = mutation.proteinChange.replace(
                            'p.',
                            ''
                        );
                    } else {
                        mutation.proteinChange = '';
                    }
                });

                return fetchCivicVariants(this.civicGenes.result, mutations);
            } else {
                return {};
            }
        },
        onError: () => {},
    });

    readonly curiousCases = remoteData({
        await: () => [this.annotation],
        invoke: async () => {
            return genomeNexusInternalClient.fetchCuriousCasesGET({
                genomicLocation: encodeURIComponent(
                    variantToGenomicLocationString(this.annotationSummary)
                ),
            });
        },
        onError: (err: Error) => {
            // fail silently
        },
    });

    @computed
    get annotationSummary() {
        return this.annotation.result
            ? this.annotation.result.annotation_summary
            : undefined;
    }

    @computed
    get getMutationMapperStore() {
        const mutation = variantToMutation(
            this.annotationSummary,
            this.selectedTranscript
        );
        if (
            mutation[0] &&
            mutation[0].gene &&
            mutation[0].gene.hugoGeneSymbol.length !== 0
        ) {
            return initDefaultMutationMapperStore({
                dataFetcher: getDataFetcher(),
                data: mutation,
                hugoSymbol: mutation[0].gene.hugoGeneSymbol,
                enableOncoKb: true,
                // select the lollipop by default
                selectionFilters: [
                    {
                        type: DataFilterType.POSITION,
                        values: [mutation[0].proteinPosStart],
                    },
                ],
                entrezGeneId: mutation[0].gene.entrezGeneId,
                isoformOverrideSource: 'mskcc',
            });
        }
        return undefined;
    }

    readonly isAnnotatedSuccessfully = remoteData<boolean>({
        await: () => [this.annotation],
        invoke: () => {
            return Promise.resolve(
                this.annotation.result?.successfully_annotated ? true : false
            );
        },
    });
}
