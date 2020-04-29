import { getProteinPositionFromProteinChange, VariantAnnotationSummary } from "cbioportal-frontend-commons";
import { Mutation } from "react-mutation-mapper";
import { getTranscriptConsequenceSummary } from "./AnnotationSummaryUtil";

export function variantToMutation(
    data: VariantAnnotationSummary | undefined
): Mutation[] {
    let mutations = [];
    let mutation: Mutation;
    if (data !== undefined) {
        let transcriptConsequenceSummary = getTranscriptConsequenceSummary(
            data
        );
        mutation = {
            gene: {
                hugoGeneSymbol: transcriptConsequenceSummary.hugoGeneSymbol,
                entrezGeneId: Number(
                    transcriptConsequenceSummary.entrezGeneId
                ),
            },
            chromosome: data.genomicLocation.chromosome,
            startPosition: data.genomicLocation.start,
            endPosition: data.genomicLocation.end,
            referenceAllele: data.genomicLocation.referenceAllele,
            variantAllele: data.genomicLocation.variantAllele,
            // TODO: is it ok to return "" if no protein change data?
            proteinChange: transcriptConsequenceSummary.hgvspShort,
            proteinPosStart: transcriptConsequenceSummary.proteinPosition
                ? transcriptConsequenceSummary.proteinPosition.start
                : getProteinPosStart(
                      transcriptConsequenceSummary.hgvspShort
                  ),
            proteinPosEnd: transcriptConsequenceSummary.proteinPosition
                ? transcriptConsequenceSummary.proteinPosition.end
                : undefined,
            mutationType:
                transcriptConsequenceSummary.variantClassification,
        };
        mutations.push(mutation);
    }
    return mutations;
}

export function getProteinPosStart(proteinChange: string | undefined) {
    var proteinPosition = getProteinPositionFromProteinChange(
        proteinChange
    );
    // TODO: is it ok to return 0 if no protein change data?
    return proteinPosition ? proteinPosition.start : 0;
}