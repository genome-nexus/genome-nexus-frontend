import { observable } from "mobx";
import { VariantAnnotationSummary, remoteData} from "cbioportal-frontend-commons";
import client from "./genomeNexusClientInstance";


export interface VariantStoreConfig {
    variant: string;
}
export class VariantStore {

    constructor(private variantId: string) {
        this.variant = variantId;
    }

    @observable public allResources: string[] = ["Cancer Hotspots", "OncoKB", "COSMIC", "cBioPortal",
                                        "Mutation Assessor", "CIViC", "PMKB", "SIFT", "Polyphen-2",
                                        "UniProt", "PFAM", "PDB", "ProSite", "PhosphoSitePlus",
                                        "PTM", "External Links"];
    @observable public selectedResources: string[] = this.allResources;
    @observable public variant : string = "";
    
    readonly annotation = remoteData<VariantAnnotationSummary>({
        invoke: async() => {           
            const result = await client.fetchVariantAnnotationSummaryGET({variant: this.variant});
            return result;
        },
        onError: (err: Error) => {
            // fail silently
        }
    });
}