import autobind from "autobind-decorator";
import * as React from 'react';
import "./TranscriptSummaryTable.css";
import { observer } from "mobx-react";
import { action, observable } from "mobx";
import { Button, Row, Col, Collapse, Table } from "react-bootstrap";
import _ from "lodash";
import { VariantAnnotationSummary } from "cbioportal-frontend-commons";

interface ITranscriptSummaryTableProps
{
    annotation: VariantAnnotationSummary | undefined;
}

type Transcript = {
    transcript: String | undefined,
    hugoGeneSymbol: string | undefined,
    hgvsShort: string | undefined,
    refSeq: string | undefined,
    variantClassification: string | undefined,
    hgvsc: string | undefined,
    consequenceTerms: string | undefined,
    exon: string | undefined
}

@observer
class TranscriptSummaryTable extends React.Component<ITranscriptSummaryTableProps>
{
    @observable showAllTranscript = false;

    private getCanonicalTranscript(annotation: VariantAnnotationSummary | undefined ) {
        let canonicalTranscript:Transcript;
        if(annotation !== undefined) {
            canonicalTranscript = {
                "transcript": annotation.transcriptConsequenceSummary.transcriptId,
                "hugoGeneSymbol": annotation.transcriptConsequenceSummary.hugoGeneSymbol,
                "hgvsShort": annotation.transcriptConsequenceSummary.hgvspShort,
                "refSeq": annotation.transcriptConsequenceSummary.refSeq,
                "variantClassification": annotation.transcriptConsequenceSummary.variantClassification,
                "hgvsc": annotation.transcriptConsequenceSummary.hgvsc,
                "consequenceTerms": annotation.transcriptConsequenceSummary.consequenceTerms,
                "exon": annotation.transcriptConsequenceSummary.exon
            } as Transcript;
        }
        else {
            canonicalTranscript = {
                "transcript": "",
                "hugoGeneSymbol": "",
                "hgvsShort": "",
                "refSeq": "",
                "variantClassification": "",
                "hgvsc": "",
                "consequenceTerms": "",
                "exon": ""
            } as Transcript;
        }
        return canonicalTranscript;
    }

    private getOtherTranscript(annotation: VariantAnnotationSummary | undefined ) {
        let otherTranscript:Transcript[] = [];
        if(annotation !== undefined) {
            annotation.transcriptConsequenceSummaries.forEach(transcript => {
                otherTranscript.push({
                    "transcript": transcript.transcriptId,
                    "hugoGeneSymbol": transcript.hugoGeneSymbol,
                    "hgvsShort": transcript.hgvspShort,
                    "refSeq": transcript.refSeq,
                    "variantClassification": transcript.variantClassification,
                    "hgvsc": transcript.hgvsc,
                    "consequenceTerms": transcript.consequenceTerms,
                    "exon": transcript.exon
                } as Transcript);
            });

        }
        else {
            otherTranscript.push({
                "transcript": "",
                "hugoGeneSymbol": "",
                "hgvsShort": "",
                "refSeq": "",
                "variantClassification": "",
                "hgvsc": "",
                "consequenceTerms": "",
                "exon": ""
            } as Transcript);
        }
        return otherTranscript;
    }

    public render()
    {
        return (
            <div>
                <Row>
                    <Col lg="12" className="transcriptTable">
                        <strong>Transcript Consequence Summary</strong>&nbsp;&nbsp;&nbsp;
                        <Button
                            onClick={this.onButtonClick}
                            aria-controls="table-content"
                            aria-expanded={this.showAllTranscript}
                            variant="outline-secondary"
                            className="btn-sm"
                        >
                            see all transcripts
                        </Button>
                        {/* make sure we have at least one transcript here*/}
                        {!this.showAllTranscript && (
                            TranscriptTable(!this.showAllTranscript, this.getCanonicalTranscript(this.props.annotation))
                        )}
                        {this.showAllTranscript && (
                            TranscriptTable(this.showAllTranscript, this.getCanonicalTranscript(this.props.annotation), this.getOtherTranscript(this.props.annotation))
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

function TranscriptTable(isOpen:boolean, canonicalTranscript:Transcript, otherTranscripts?:Transcript[]) 
{
    if (_.isEmpty(otherTranscripts)) {
        return (
            <Collapse in={isOpen}>
                {/* show table header and the first row in default */}
                <div className="tableContent">
                    <Table responsive striped bordered hover size="sm">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Transcript</th>
                            <th>Hugo Gene Symbol</th>
                            <th>Hgvs Short</th>
                            <th>Ref Seq</th>
                            <th>Variant Classification</th>
                            <th>Hgvsc</th>
                            <th>Consequence Terms</th>
                            <th>Exon</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td>{canonicalTranscript.transcript}</td>
                            <td>{canonicalTranscript.hugoGeneSymbol}</td>
                            <td>{canonicalTranscript.hgvsShort}</td>
                            <td>{canonicalTranscript.refSeq}</td>
                            <td>{canonicalTranscript.variantClassification}</td>
                            <td>{canonicalTranscript.hgvsc}</td>
                            <td>{canonicalTranscript.consequenceTerms}</td>
                            <td>{canonicalTranscript.exon}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </Collapse>
        );
    }
    else {
        const allTranscripts = _.concat(otherTranscripts!, canonicalTranscript);
        return (
            <>
            <Collapse in={isOpen}>
                {/* expand the table if have more transcript */}
                <div className="tableContent">
                    <Table responsive striped bordered hover size="sm">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Transcript</th>
                            <th>Hugo Gene Symbol</th>
                            <th>Hgvs Short</th>
                            <th>Ref Seq</th>
                            <th>Variant Classification</th>
                            <th>Hgvsc</th>
                            <th>Consequence Terms</th>
                            <th>Exon</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allTranscripts.map((transcript, index) => {
                                return (
                                    <tr>
                                    <td>{index + 1}</td>
                                    <td>{transcript.transcript}</td>
                                    <td>{transcript.hugoGeneSymbol}</td>
                                    <td>{transcript.hgvsShort}</td>
                                    <td>{transcript.refSeq}</td>
                                    <td>{transcript.variantClassification}</td>
                                    <td>{transcript.hgvsc}</td>
                                    <td>{transcript.consequenceTerms}</td>
                                    <td>{transcript.exon}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </Collapse>
            </>
        );
    }
}

export default TranscriptSummaryTable;