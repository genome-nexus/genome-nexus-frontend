import { observable, computed, reaction, makeObservable } from 'mobx';
import { remoteData } from 'cbioportal-frontend-commons';
import {
    fetchCivicVariants,
    getCivicGenes,
    ICivicGeneIndex,
    ICivicVariantIndex,
} from 'cbioportal-utils';
import { VariantAnnotation } from 'genome-nexus-ts-api-client';
import {
    IndicatorQueryResp,
    CancerGene as OncoKbGene,
} from 'oncokb-ts-api-client';
import client, { genomeNexusApiRoot } from './genomeNexusClientInstance';
import oncokbClient from './OncokbClientInstance';
import MobxPromise from 'mobxpromise';
import _ from 'lodash';
import qs from 'qs';
import { variantToMutation } from '../util/variantUtils';
import {
    initDefaultMutationMapperStore,
    DataFilterType,
} from 'react-mutation-mapper';
import { getTranscriptConsequenceSummary } from '../util/AnnotationSummaryUtil';
import { ANNOTATION_QUERY_FIELDS } from '../config/configDefaults';

export interface VariantStoreConfig {
    variant: string;
}
export class VariantStore {
    public query: any;
    constructor(public variantId: string, public queryString: string) {
        makeObservable(this);
        this.variant = variantId;
        this.query = qs.parse(this.queryString, { ignoreQueryPrefix: true });
        this.parseUrl();
        // set activeTranscript when MutationMapperStore is created
        reaction(
            () => this.getMutationMapperStore,
            store => {
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
            return await client.fetchVariantAnnotationGET({
                variant: this.variant,
                fields: ANNOTATION_QUERY_FIELDS,
            });
        },
        onError: (err: Error) => {
            // fail silently
        },
    });

    readonly oncokbData: MobxPromise<IndicatorQueryResp> = remoteData({
        invoke: async () => {
            return await oncokbClient.annotateMutationsByHGVSgGetUsingGET_1({
                hgvsg: this.variant,
            });
        },
        onError: () => {
            // fail silently, leave the error handling responsibility to the data consumer
        },
    });

    readonly oncokbGenes = remoteData<OncoKbGene[]>({
        await: () => [],
        invoke: async () => {
            return oncokbClient.utilsCancerGeneListGetUsingGET_1({});
        },
        onError: error => {},
        default: [],
    });

    readonly oncokbGenesMap = remoteData<{ [hugoSymbol: string]: OncoKbGene }>({
        await: () => [this.oncokbGenes],
        invoke: async () => {
            return Promise.resolve(
                _.keyBy(this.oncokbGenes.result, gene => gene.hugoSymbol)
            );
        },
        onError: error => {},
        default: {},
    });

    readonly civicGenes = remoteData<ICivicGeneIndex | undefined>({
        await: () => [this.annotation],
        invoke: async () =>
            getCivicGenes([
                Number(
                    getTranscriptConsequenceSummary(this.annotationSummary)
                        .entrezGeneId
                ),
            ]),
        onError: () => {},
    });

    readonly civicVariants = remoteData<ICivicVariantIndex | undefined>({
        await: () => [this.civicGenes],
        invoke: async () => {
            if (this.civicGenes.result) {
                const mutations = variantToMutation(this.annotationSummary);

                mutations.forEach(mutation => {
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

    @computed
    get annotationSummary() {
        return this.annotation.result
            ? this.annotation.result.annotation_summary
            : undefined;
    }

    @computed
    get getMutationMapperStore() {
        let mutation = variantToMutation(this.annotationSummary);
        if (
            mutation[0] &&
            mutation[0].gene &&
            mutation[0].gene.hugoGeneSymbol.length !== 0
        ) {
            const store = initDefaultMutationMapperStore({
                genomeNexusUrl: genomeNexusApiRoot,
                data: mutation,
                hugoSymbol: getTranscriptConsequenceSummary(
                    this.annotationSummary
                ).hugoGeneSymbol,
                oncoKbUrl: 'https://www.cbioportal.org/proxy/oncokb',
                enableOncoKb: true,
                // select the lollipop by default
                selectionFilters: [
                    {
                        type: DataFilterType.POSITION,
                        values: [mutation[0].proteinPosStart],
                    },
                ],
            });
            return store;
        }
        return undefined;
    }

    readonly isAnnotatedSuccessfully = remoteData<boolean>({
        await: () => [this.annotation],
        invoke: () => {
            // TODO use successfully_annotated instead of checking genomicLocation
            return Promise.resolve(
                this.annotation.result &&
                    this.annotation.result.annotation_summary.genomicLocation
                        .chromosome &&
                    this.annotation.result.annotation_summary.genomicLocation
                        .start &&
                    this.annotation.result.annotation_summary.genomicLocation
                        .end &&
                    this.annotation.result.annotation_summary.genomicLocation
                        .referenceAllele &&
                    this.annotation.result.annotation_summary.genomicLocation
                        .variantAllele
                    ? true
                    : false
            );
        },
    });
}
