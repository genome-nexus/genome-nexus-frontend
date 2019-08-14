import * as React from 'react';

import "./CheckBox.css";
import { observer } from "mobx-react";
import { Row, Col } from "react-bootstrap";
import BasicInfoUnit from './BasicInfoUnit';

interface IBasicInfoProps
{
    data?: string;
}

@observer
class BasicInfo extends React.Component<IBasicInfoProps>
{

    public render()
    {
        return (
            <div>
                <Row className="mb-1 mt-2">
                    <Col lg="4">
                        <BasicInfoUnit field={"Organism"}/>
                    </Col>
                    <Col lg="4">
                        <BasicInfoUnit field={"Allele"} data={"thisisalonglonglongstring12345678945613245789123165478"}/>
                    </Col>
                    <Col lg="4">
                        <BasicInfoUnit field={"Chromesome"}/>
                    </Col>
                </Row>
                <Row className="mb-1">
                    <Col lg="4">
                        <BasicInfoUnit field={"Position"}/>
                    </Col>
                    <Col lg="4">
                        <BasicInfoUnit field={"Variantion Type"}/>
                    </Col>
                    <Col lg="4">
                        <BasicInfoUnit field={"Protein Change"}/>
                    </Col>
                </Row>
                <Row className="mb-1">
                    <Col lg="4">
                        <BasicInfoUnit field={"Reference Genome Build"}/>
                    </Col>
                </Row>

            </div>
        );
    }
}

export default BasicInfo;