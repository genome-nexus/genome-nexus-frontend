import { observable } from "mobx";

export class VariantStore {
    @observable public allRecources = ["Cancer Hotspots", "OncoKB"];
    @observable public selectedRecources: string[] = this.allRecources;
}