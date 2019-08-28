import * as React from 'react';
import "./BasicInfo.css";
import { observer } from "mobx-react";
import { Row, Col } from "react-bootstrap";
import { VariantAnnotation } from 'cbioportal-frontend-commons';

interface IBasicInfoProps
{
    // TODO: need to pass real data into this component
    data?: string;
    annotation: VariantAnnotation | undefined;
}

@observer
class BasicInfo extends React.Component<IBasicInfoProps>
{

    public render()
    {
        console.log("see annotation below");
        console.log(this.props.annotation);
        return (
            <div>
                <Row className="mb-1 mt-3">
                    <Col lg="4">
                        {BasicInfoUnit("Organism")}
                    </Col>
                    <Col lg="4">
                        {BasicInfoUnit("Allele")}
                    </Col>
                    <Col lg="4">
                        {BasicInfoUnit("Chromesome", this.props.annotation ? this.props.annotation.seq_region_name : "nothinghere")}
                    </Col>
                </Row>
                <Row className="mb-1">
                    <Col lg="4">
                        {BasicInfoUnit("Position")}
                    </Col>
                    <Col lg="4">
                        {BasicInfoUnit("Variantion Type")}
                    </Col>
                    <Col lg="4">
                        {BasicInfoUnit("Protein Change")}
                    </Col>
                </Row>
                <Row className="mb-1">
                    <Col lg="4">
                        {BasicInfoUnit("Reference Genome Build")}
                    </Col>
                </Row>
            </div>
        );
    }
}

function BasicInfoUnit(field: string, data?: string ) 
{
    return (
        <Row>
            <Col lg="4" className="fieldName">
                {field}
            </Col>
            <Col lg="8" className="data">
                {data? data: "N/A"}
            </Col>
        </Row>
    );
}


export default BasicInfo;