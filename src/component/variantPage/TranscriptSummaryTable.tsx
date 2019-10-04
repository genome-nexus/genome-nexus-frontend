import autobind from 'autobind-decorator';
import * as React from 'react';
import './TranscriptSummaryTable.css';
import { observer } from 'mobx-react';
import { action, observable } from 'mobx';
import { Button, Row, Col } from 'react-bootstrap';
import { VariantAnnotationSummary } from 'cbioportal-frontend-commons';
import TranscriptTable from './TranscriptTable';
import { getTranscriptConsequenceSummary } from '../../util/AnnotationSummaryUtil';

interface ITranscriptSummaryTableProps {
    annotation: VariantAnnotationSummary | undefined;
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

    private getCanonicalTranscript(
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

    private getOtherTranscript(
        annotation: VariantAnnotationSummary | undefined
    ) {
        let otherTranscript: Transcript[] = [];
        let canonicalTranscriptId = this.getCanonicalTranscript(annotation)
            .transcript;
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
            <div>
                <Row>
                    <Col lg="12" className="transcriptTable">
                        <strong>Transcript Consequence Summary</strong>
                        &nbsp;&nbsp;&nbsp;
                        <Button
                            onClick={this.onButtonClick}
                            aria-controls="table-content"
                            aria-expanded={this.showAllTranscript}
                            variant="outline-secondary"
                            className="btn-sm"
                        >
                            see all transcripts
                        </Button>
                        {/* show canonical transcript */}
                        {!this.showAllTranscript && (
                            <TranscriptTable
                                isOpen={!this.showAllTranscript}
                                canonicalTranscript={this.getCanonicalTranscript(
                                    this.props.annotation
                                )}
                            />
                        )}
                        {/* show all trancscripts after click the button */}
                        {this.showAllTranscript && (
                            <TranscriptTable
                                isOpen={this.showAllTranscript}
                                canonicalTranscript={this.getCanonicalTranscript(
                                    this.props.annotation
                                )}
                                otherTranscripts={this.getOtherTranscript(
                                    this.props.annotation
                                )}
                            />
                        )}
                    </Col>
                </Row>
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
