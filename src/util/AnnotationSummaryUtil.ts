import {
    VariantAnnotationSummary,
    TranscriptConsequenceSummary,
} from 'genome-nexus-ts-api-client';

export function getTranscriptConsequenceSummary(
    data: VariantAnnotationSummary | undefined
): TranscriptConsequenceSummary {
    let transcriptConsequenceSummary: TranscriptConsequenceSummary = {
        aminoAcidAlt: '',
        aminoAcidRef: '',
        aminoAcids: '',
        codonChange: '',
        consequenceTerms: '',
        entrezGeneId: '',
        exon: '',
        hgvsc: '',
        hgvsp: '',
        hgvspShort: '',
        hugoGeneSymbol: '',
        polyphenPrediction: '',
        polyphenScore: 0,
        proteinPosition: {
            start: 0,
            end: 0,
        },
        refSeq: '',
        siftPrediction: '',
        siftScore: 0,
        transcriptId: '',
        uniprotId: '',
        variantClassification: '',
    };
    if (data !== undefined && data.transcriptConsequenceSummary) {
        transcriptConsequenceSummary = data.transcriptConsequenceSummary;
    }
    return transcriptConsequenceSummary;
}
