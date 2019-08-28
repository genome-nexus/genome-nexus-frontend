import { observable } from "mobx";
import { remoteData, GenomeNexusAPI, GenomeNexusAPIInternal} from "cbioportal-frontend-commons";
import { initGenomeNexusClient, initGenomeNexusInternalClient } from "../util/DataFetcherUtils";


export interface VariantDataFetcherConfig {
    genomeNexusUrl?: string;

}
export class VariantDataFetcher {
    @observable public allRecources = ["Cancer Hotspots", "OncoKB", "COSMIC", "cBioPortal",
                                        "Mutation Assessor", "CIViC", "PMKB", "SIFT", "Polyphen-2",
                                        "UniProt", "PFAM", "PDB", "ProSite", "PhosphoSitePlus",
                                        "PTM", "External Links"];
    @observable public selectedRecources: string[] = this.allRecources;

    public genomeNexusClient: GenomeNexusAPI;
    public genomeNexusInternalClient: GenomeNexusAPIInternal;

    constructor(
        private config: VariantDataFetcherConfig,
        genomeNexusClient?: Partial<GenomeNexusAPI>,
        genomeNexusInternalClient?: Partial<GenomeNexusAPIInternal>,
    ) {
        this.genomeNexusClient = genomeNexusClient as GenomeNexusAPI || initGenomeNexusClient(config.genomeNexusUrl);
        this.genomeNexusInternalClient = genomeNexusInternalClient as GenomeNexusAPIInternal || initGenomeNexusInternalClient(config.genomeNexusUrl);
    }

    public async fetchCanonicalTranscript(hugoSymbol: string,
        isoformOverrideSource?: string,
        client: GenomeNexusAPI = this.genomeNexusClient)
    {
        return await client.fetchCanonicalEnsemblTranscriptByHugoSymbolGET({
            hugoSymbol, isoformOverrideSource
        });
    }

}