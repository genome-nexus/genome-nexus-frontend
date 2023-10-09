import {
    getProteinPositionFromProteinChange,
    Mutation,
} from 'cbioportal-utils';
import { VariantAnnotationSummary } from 'genome-nexus-ts-api-client';
import { getTranscriptConsequenceSummary } from './AnnotationSummaryUtil';

export function variantToMutation(
    data: VariantAnnotationSummary | undefined,
    transcript?: string
): Mutation[] {
    let mutations = [];
    let mutation: Mutation;
    const transcriptConsequence = getTranscriptConsequenceSummary(
        data,
        transcript
    );
    if (data && transcriptConsequence) {
        mutation = {
            gene: {
                hugoGeneSymbol: transcriptConsequence.hugoGeneSymbol,
                entrezGeneId: Number(transcriptConsequence.entrezGeneId),
            },
            chromosome: data.genomicLocation.chromosome,
            startPosition: data.genomicLocation.start,
            endPosition: data.genomicLocation.end,
            referenceAllele: data.genomicLocation.referenceAllele,
            variantAllele: data.genomicLocation.variantAllele,
            proteinChange: transcriptConsequence.hgvspShort,
            proteinPosStart: transcriptConsequence.proteinPosition?.start
                ? transcriptConsequence.proteinPosition.start
                : getProteinPosStart(transcriptConsequence.hgvspShort),
            proteinPosEnd: transcriptConsequence.proteinPosition
                ? transcriptConsequence.proteinPosition.end
                : undefined,
            mutationType: transcriptConsequence.variantClassification,
        };
        mutations.push(mutation);
    }
    return mutations;
}

export function getProteinPosStart(proteinChange: string | undefined) {
    const proteinPosition = getProteinPositionFromProteinChange(proteinChange);
    return proteinPosition ? proteinPosition.start : -1;
}

export function variantToGenomicLocationString(
    data: VariantAnnotationSummary | undefined
) {
    const genomicLocation = data?.genomicLocation;
    return genomicLocation
        ? `${genomicLocation.chromosome},${genomicLocation.start},${genomicLocation.end},${genomicLocation.referenceAllele},${genomicLocation.variantAllele}`
        : '';
}

export function isVue(
    annotation: VariantAnnotationSummary | undefined,
    selectedTranscript: string
) {
    if (selectedTranscript) {
        return annotation?.transcriptConsequenceSummaries.find(
            (summary) => summary.transcriptId === selectedTranscript
        )?.isVue;
    } else {
        return annotation?.transcriptConsequenceSummary?.isVue;
    }
}
