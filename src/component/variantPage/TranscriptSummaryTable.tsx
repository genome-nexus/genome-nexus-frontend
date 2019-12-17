import autobind from 'autobind-decorator';
import * as React from 'react';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { VariantAnnotationSummary } from 'cbioportal-frontend-commons';
import TranscriptTable from './TranscriptTable';
import { getTranscriptConsequenceSummary } from '../../util/AnnotationSummaryUtil';
import './TranscriptSummaryTable.css';

interface ITranscriptSummaryTableProps {
    annotation: VariantAnnotationSummary | undefined;
    isOpen: boolean;
}

export type Transcript = {
    transcript: string | undefined;
    hugoGeneSymbol: string | undefined;
    hgvsShort: string | undefined;
    refSeq: string | undefined;
    variantClassification: string | undefined;
    hgvsc: string | undefined;
    consequenceTerms: string | undefined;
    exon: string | undefined;
};

@observer
class TranscriptSummaryTable extends React.Component<
    ITranscriptSummaryTableProps
> {
    @observable showAllTranscript = false;

    private putCanonicalTranscriptInTable(
        annotation: VariantAnnotationSummary | undefined
    ) {
        let transcriptConsequenceSummary = getTranscriptConsequenceSummary(
            annotation
        );

        let canonicalTranscript = {
            transcript: transcriptConsequenceSummary.transcriptId,
            hugoGeneSymbol: transcriptConsequenceSummary.hugoGeneSymbol,
            hgvsShort: transcriptConsequenceSummary.hgvspShort,
            refSeq: transcriptConsequenceSummary.refSeq,
            variantClassification:
                transcriptConsequenceSummary.variantClassification,
            hgvsc: transcriptConsequenceSummary.hgvsc,
            consequenceTerms: transcriptConsequenceSummary.consequenceTerms,
            exon: transcriptConsequenceSummary.exon,
        };

        return canonicalTranscript;
    }

    private putOtherTranscriptsInTable(
        annotation: VariantAnnotationSummary | undefined
    ) {
        let otherTranscript: Transcript[] = [];
        let canonicalTranscriptId = this.putCanonicalTranscriptInTable(
            annotation
        ).transcript;
        if (
            annotation !== undefined &&
            annotation.transcriptConsequenceSummaries
        ) {
            annotation.transcriptConsequenceSummaries.forEach(transcript => {
                if (transcript.transcriptId !== canonicalTranscriptId) {
                    otherTranscript.push({
                        transcript: transcript.transcriptId,
                        hugoGeneSymbol: transcript.hugoGeneSymbol,
                        hgvsShort: transcript.hgvspShort,
                        refSeq: transcript.refSeq,
                        variantClassification: transcript.variantClassification,
                        hgvsc: transcript.hgvsc,
                        consequenceTerms: transcript.consequenceTerms,
                        exon: transcript.exon,
                    });
                }
            });
        }
        return otherTranscript;
    }

    public render() {
        return (
            <div className="transcript-table">
                <TranscriptTable
                    isOpen={this.props.isOpen}
                    canonicalTranscript={this.putCanonicalTranscriptInTable(
                        this.props.annotation
                    )}
                    otherTranscripts={this.putOtherTranscriptsInTable(
                        this.props.annotation
                    )}
                />
            </div>
        );
    }

    @autobind
    @action
    onButtonClick() {
        this.showAllTranscript = !this.showAllTranscript;
    }
}

export default TranscriptSummaryTable;
