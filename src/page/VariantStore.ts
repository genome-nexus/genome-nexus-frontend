import { observable, computed, reaction } from 'mobx';
import {
    remoteData,
    VariantAnnotation,
    IndicatorQueryResp,
    OncoKbGene,
} from 'cbioportal-frontend-commons';
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

export interface VariantStoreConfig {
    variant: string;
}
export class VariantStore {
    public query: any;
    constructor(public variantId: string, public queryString: string) {
        this.variant = variantId;
        this.query = qs.parse(this.queryString, { ignoreQueryPrefix: true });
        this.parseUrl();
        // set activeTranscript when MutationMapperStore is created
        reaction(
            () => this.getMutationMapperStore,
            store => {
                if (store !== undefined) {
                    this.getMutationMapperStore!.activeTranscript = this.query.transcriptId;
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
                fields: [
                    'annotation_summary',
                    'my_variant_info',
                    'mutation_assessor',
                ],
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
            return oncokbClient.genesGetUsingGET({});
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
}
