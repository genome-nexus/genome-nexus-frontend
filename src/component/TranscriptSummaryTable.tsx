import autobind from "autobind-decorator";
import * as React from 'react';
import {FormEvent, useState} from "react";

import "./CheckBox.css";
import { observer } from "mobx-react";
import { computed, action } from "mobx";
import { Form, Button, Row, Col, DropdownButton, Dropdown, Accordion, Card, Collapse, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

interface ITranscriptSummaryTableProps
{

}

@observer
class TranscriptSummaryTable extends React.Component<ITranscriptSummaryTableProps>
{
    public render()
    {
        return (
            <div>
                <Row>
                    <Col lg="12">
                        <strong>Transcript Consequence Summary</strong>&nbsp;&nbsp;&nbsp;
                        <TranscriptTable />
                    </Col>
                </Row>
            </div>

        );
    }
}


function TranscriptTable() 
{
    const [open, setOpen] = useState(false);

    return (
        <>
        <Button
            onClick={() => setOpen(!open)}
            aria-controls="table-content"
            aria-expanded={open}
        >
            click
        </Button>
        <Collapse in={open}>
            <div id="table-content">
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
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        </tr>
                        <tr>
                        <td>2</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        </tr>
                        <tr>
                        <td>3</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        <td>Table cell</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </Collapse>
        </>
    );
}



export default TranscriptSummaryTable;