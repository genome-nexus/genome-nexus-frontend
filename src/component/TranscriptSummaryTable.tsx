import autobind from "autobind-decorator";
import * as React from 'react';
import "./TranscriptSummaryTable.css";
import { observer } from "mobx-react";
import { action, observable } from "mobx";
import { Button, Row, Col, Collapse, Table } from "react-bootstrap";
import _ from "lodash";

interface ITranscriptSummaryTableProps
{
    primaryTranscript: Transcript;
    otherTranscripts: Transcript[];
}

type Transcript = {
    transcript:String,
    hugoGeneSymbol:string,
    HGVSShort:string,
    refSeq:string,
    variantClassification:string,
    HGVSC: string,
    exon: string
}

@observer
class TranscriptSummaryTable extends React.Component<ITranscriptSummaryTableProps>
{
    @observable showAllTranscript = false;

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
                            TranscriptTable(!this.showAllTranscript, this.props.primaryTranscript)
                        )}
                        {this.showAllTranscript && (
                            TranscriptTable(this.showAllTranscript, this.props.primaryTranscript, this.props.otherTranscripts)
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

function TranscriptTable(isOpen:boolean, primaryTranscript:Transcript, otherTranscripts?:Transcript[]) 
{
    if (_.isEmpty(otherTranscripts)) {
        return (
            <>
            <Collapse in={isOpen}>
                <div className="tableContent">
                    <Table responsive striped bordered hover size="sm">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Transcript</th>
                            <th>Hugo Gene Symbol</th>
                            <th>HGVS Short</th>
                            <th>Ref Seq</th>
                            <th>Variant Classification</th>
                            <th>HGVSC</th>
                            <th>Exon</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>1</td>
                            <td>{primaryTranscript.transcript}</td>
                            <td>{primaryTranscript.hugoGeneSymbol}</td>
                            <td>{primaryTranscript.HGVSShort}</td>
                            <td>{primaryTranscript.refSeq}</td>
                            <td>{primaryTranscript.variantClassification}</td>
                            <td>{primaryTranscript.HGVSC}</td>
                            <td>{primaryTranscript.exon}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                </Collapse>
            </>
        );
    }
    else {
        const allTranscripts = _.concat(otherTranscripts!, primaryTranscript);
        return (
            <>
            <Collapse in={isOpen}>
                <div className="tableContent">
                    <Table responsive striped bordered hover size="sm">
                        <thead>
                            <tr>
                            <th>#</th>
                            <th>Transcript</th>
                            <th>Hugo Gene Symbol</th>
                            <th>HGVS Short</th>
                            <th>Ref Seq</th>
                            <th>Variant Classification</th>
                            <th>HGVSC</th>
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
                                    <td>{transcript.HGVSShort}</td>
                                    <td>{transcript.refSeq}</td>
                                    <td>{transcript.variantClassification}</td>
                                    <td>{transcript.HGVSC}</td>
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