import { observable } from 'mobx';
import {
    VariantAnnotationSummary,
    remoteData,
    MyVariantInfo,
} from 'cbioportal-frontend-commons';
import client from './genomeNexusClientInstance';
import MobxPromise from 'mobxpromise';

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

    readonly annotation = remoteData<VariantAnnotationSummary>({
        invoke: async () => {
            return await client.fetchVariantAnnotationSummaryGET({
                variant: this.variant,
            });
        },
        onError: (err: Error) => {
            // fail silently
        },
    });

    readonly myVariantInfo: MobxPromise<MyVariantInfo> = remoteData({
        invoke: async () => {
            return await client.fetchMyVariantInfoAnnotationGET({
                variant: this.variant,
            });
        },
        onError: () => {
            // fail silently, leave the error handling responsibility to the data consumer
        },
    });
}
