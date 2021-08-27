import {
    VariantAnnotationSummary,
    TranscriptConsequenceSummary,
} from 'genome-nexus-ts-api-client';
import _ from 'lodash';

export function getTranscriptConsequenceSummary(
    data: VariantAnnotationSummary | undefined,
    transcriptId?: string
): TranscriptConsequenceSummary | undefined {
    let transcriptConsequenceSummary = undefined;
    if (data?.transcriptConsequenceSummaries && transcriptId) {
        transcriptConsequenceSummary = _.find(
            data.transcriptConsequenceSummaries,
            (transcriptConsequence) =>
                transcriptConsequence.transcriptId === transcriptId
        );
    } else if (data?.transcriptConsequenceSummary) {
        transcriptConsequenceSummary = data.transcriptConsequenceSummary;
    }

    return transcriptConsequenceSummary;
}
