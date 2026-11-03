import { VariantAnnotation } from 'genome-nexus-ts-api-client';

/**
 * AlphaGenome payload shapes mirroring
 * workstreams/contracts/alpha_genome_schema.json.
 *
 * Declared locally because the pinned genome-nexus-ts-api-client (1.1.40)
 * predates the alpha_genome field; remove this shim once the client is
 * regenerated with alpha_genome support.
 */
export interface AlphaGenomeScore {
    output_type: string;
    variant_scorer: string;
    gene_id?: string;
    gene_name?: string;
    junction_start?: number | null;
    junction_end?: number | null;
    track_name?: string;
    ontology_curie?: string | null;
    biosample_name?: string | null;
    raw_score?: number | null;
    quantile_score?: number | null;
}

export interface AlphaGenome {
    variant: string;
    hg38_variant?: string;
    scored_interval?: string;
    model_version?: string;
    canonical_gene_id?: string;
    canonical_gene?: string;
    merged_splicing_score?: number | null;
    scores?: AlphaGenomeScore[];
}

export interface AlphaGenomeAnnotation {
    license?: string;
    annotation?: AlphaGenome;
}

export type VariantAnnotationWithAlphaGenome = VariantAnnotation & {
    alpha_genome?: AlphaGenomeAnnotation;
};
