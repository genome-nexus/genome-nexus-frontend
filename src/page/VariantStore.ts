import { observable } from "mobx";

export class VariantStore {
    @observable public allResources = ["Cancer Hotspots", "OncoKB", "COSMIC", "cBioPortal",
                                        "Mutation Assessor", "CIViC", "PMKB", "SIFT", "Polyphen-2",
                                        "UniProt", "PFAM", "PDB", "ProSite", "PhosphoSitePlus",
                                        "PTM", "External Links"];
    @observable public selectedResources: string[] = this.allResources;
}