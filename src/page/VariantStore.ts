import { observable } from 'mobx';
import {
    remoteData,
    VariantAnnotation,
    IndicatorQueryResp,
} from 'cbioportal-frontend-commons';
import client from './genomeNexusClientInstance';
import oncokbClient from './OncokbClientInstance';
import MobxPromise from 'mobxpromise';
import { Gene } from 'cbioportal-frontend-commons/dist/api/generated/OncoKbAPI';
import _ from 'lodash';

export interface VariantStoreConfig {
    variant: string;
}
export class VariantStore {
    constructor(public variantId: string) {
        this.variant = variantId;
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

    readonly oncokbGenes = remoteData<Gene[]>({
        await: () => [],
        invoke: async () => {
            return oncokbClient.genesGetUsingGET({});
        },
        onError: error => {},
        default: [],
    });

    readonly oncokbGenesMap = remoteData<{ [hugoSymbol: string]: Gene }>({
        await: () => [this.oncokbGenes],
        invoke: async () => {
            return Promise.resolve(
                _.keyBy(this.oncokbGenes.result, gene => gene.hugoSymbol)
            );
        },
        onError: error => {},
        default: {},
    });
}
