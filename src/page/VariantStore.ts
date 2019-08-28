import { observable, computed } from "mobx";
import { VariantAnnotation, remoteData} from "cbioportal-frontend-commons";
import { RemoteData } from "./RemoteData";
import { VariantDataFetcher } from "./VariantDataFetcher";
import MobxPromise from "mobxpromise";
import client from "./genomeNexusClientInstance";


export interface VariantStoreConfig {
    genomeNexusUrl?: string;
    variant: string;
}
export class VariantStore {

    constructor(private variantId: string) {
        this.getVariant(this.variantId);
    }

    // }
    @observable public allRecources: string[] = ["Cancer Hotspots", "OncoKB", "COSMIC", "cBioPortal",
                                        "Mutation Assessor", "CIViC", "PMKB", "SIFT", "Polyphen-2",
                                        "UniProt", "PFAM", "PDB", "ProSite", "PhosphoSitePlus",
                                        "PTM", "External Links"];
    @observable public selectedRecources: string[] = this.allRecources;
    @observable public variant : string = "";
    // @computed
    // public get dataFetcher(): VariantDataFetcher {
    //     return new VariantDataFetcher({
    //         genomeNexusUrl: this.config.genomeNexusUrl,
    //     });
    // }
    private getVariant(varaintId: string) {
        this.variant = varaintId;
    }
    



    readonly getAnnotation = remoteData<VariantAnnotation>({
        invoke: async() => {           
            const result = await client.fetchVariantAnnotationGET({variant: this.variant});
            console.log(result);
            // return Promise.resolve(result)
            return client.fetchVariantAnnotationGET({variant: this.variant});
            
        },
        onError: (err: Error) => {
            // fail silently
        }
    });
}