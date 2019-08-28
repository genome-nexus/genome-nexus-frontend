import {GenomeNexusAPI, GenomeNexusAPIInternal, OncoKbAPI} from "cbioportal-frontend-commons";
export const DEFAULT_GENOME_NEXUS_URL = "https://www.genomenexus.org/";
const DEFAULT_GENOME_NEXUS_CLIENT = initGenomeNexusClient();

export function initGenomeNexusClient(genomeNexusUrl?: string): GenomeNexusAPI {
    return new GenomeNexusAPI(genomeNexusUrl || DEFAULT_GENOME_NEXUS_URL);
}

export function initGenomeNexusInternalClient(genomeNexusUrl?: string): GenomeNexusAPIInternal {
    return new GenomeNexusAPIInternal(genomeNexusUrl || DEFAULT_GENOME_NEXUS_URL);
}

// export async function fetchVariantAnnotationByIdGET(variantId: Mutation[],
//     fields: string[] = ["annotation_summary"],
//     isoformOverrideSource: string = "uniprot",
//     client: GenomeNexusAPI = genomeNexusClient)
// {
// return GenomeNexusAPI.(mutations, fields, isoformOverrideSource, client);
// }