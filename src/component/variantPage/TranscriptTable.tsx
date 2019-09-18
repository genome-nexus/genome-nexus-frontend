import * as React from 'react';
import "./TranscriptSummaryTable.css";
import { observer } from "mobx-react";
import { Collapse, Table } from "react-bootstrap";
import _ from "lodash";
import { Transcript } from "./TranscriptSummaryTable"

interface ITranscriptTableProps
{
    canonicalTranscript: Transcript;
    otherTranscripts?: Transcript[];
    isOpen: boolean;
}

@observer
class TranscriptTable extends React.Component<ITranscriptTableProps>
{
    public render()
    {
        if (_.isEmpty(this.props.otherTranscripts)) {
            return (
                <Collapse in={this.props.isOpen}>
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
                                <td>{this.props.canonicalTranscript.transcript}</td>
                                <td>{this.props.canonicalTranscript.hugoGeneSymbol}</td>
                                <td>{this.props.canonicalTranscript.hgvsShort}</td>
                                <td>{this.props.canonicalTranscript.refSeq}</td>
                                <td>{this.props.canonicalTranscript.variantClassification}</td>
                                <td>{this.props.canonicalTranscript.hgvsc}</td>
                                <td>{this.props.canonicalTranscript.consequenceTerms}</td>
                                <td>{this.props.canonicalTranscript.exon}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </Collapse>
            );
        }
        else {
            const allTranscripts = _.concat(this.props.canonicalTranscript, this.props.otherTranscripts!);
            return (
                <Collapse in={this.props.isOpen}>
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
            );
        }
    }
}

export default TranscriptTable;