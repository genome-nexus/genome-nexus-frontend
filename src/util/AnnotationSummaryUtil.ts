import {
    VariantAnnotationSummary,
    TranscriptConsequenceSummary,
} from 'cbioportal-frontend-commons';

export function getTranscriptConsequenceSummary(
    data: VariantAnnotationSummary | undefined
): TranscriptConsequenceSummary {
    let transcriptConsequenceSummary: TranscriptConsequenceSummary = {
        codonChange: '',
        consequenceTerms: '',
        entrezGeneId: '',
        exon: '',
        hgvsc: '',
        hgvsp: '',
        hgvspShort: '',
        hugoGeneSymbol: '',
        proteinPosition: {
            start: 0,
            end: 0,
        },
        refSeq: '',
        transcriptId: '',
        variantClassification: '',
    };
    if (data !== undefined && data.transcriptConsequenceSummary) {
        transcriptConsequenceSummary = data.transcriptConsequenceSummary;
    }
    return transcriptConsequenceSummary;
}
