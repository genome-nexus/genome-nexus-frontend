import * as React from 'react';
import "./BasicInfo.css";
import { observer } from "mobx-react";
import { Row, Col } from "react-bootstrap";
import { VariantAnnotationSummary } from 'cbioportal-frontend-commons';
import _ from 'lodash';

interface IBasicInfoProps
{
    annotation: VariantAnnotationSummary | undefined;
}

export type BasicInfoData = {
    name: string;
    value: string | undefined;
}
@observer
class BasicInfo extends React.Component<IBasicInfoProps>
{
    private parseAnnotation(annotation: VariantAnnotationSummary | undefined): BasicInfoData[] {
        let parsedData:BasicInfoData[] = [];
        if (annotation !== undefined) {
            parsedData.push({
                "name": "Allele",
                "value": annotation.genomicLocation.referenceAllele + "/" + annotation.genomicLocation.variantAllele
            } as BasicInfoData);
            parsedData.push({
                "name": "Chomosome",
                "value": annotation.genomicLocation.chromosome
            } as BasicInfoData);
            parsedData.push({
                "name": "Position",
                "value": annotation.genomicLocation.start === annotation.genomicLocation.end ? annotation.genomicLocation.start.toString() :
                        annotation.genomicLocation.start.toString() + "_" + annotation.genomicLocation.end.toString()
            } as BasicInfoData);
            parsedData.push({
                "name": "Assembly Name",
                "value": annotation.assemblyName
            } as BasicInfoData);
            parsedData.push({
                "name": "Variant Type",
                "value": annotation.variantType
            } as BasicInfoData);
            parsedData.push({
                "name": "Strand Sign",
                "value": annotation.strandSign
            } as BasicInfoData);
        }
        else {
            parsedData.push({
                "name": "Allele",
                "value": "N/A"
            } as BasicInfoData);
            parsedData.push({
                "name": "Chomosome",
                "value": "N/A"
            } as BasicInfoData);
            parsedData.push({
                "name": "Position",
                "value": "N/A"
            } as BasicInfoData);
            parsedData.push({
                "name": "Assembly Name",
                "value": "N/A"
            } as BasicInfoData);
            parsedData.push({
                "name": "Variant Type",
                "value": "N/A"
            } as BasicInfoData);
            parsedData.push({
                "name": "Strand Sign",
                "value": "N/A"
            } as BasicInfoData);
        }
        return parsedData;
        
    }

    public render()
    {
        const renderData: BasicInfoData[] = this.parseAnnotation(this.props.annotation);
        return (
            <div>
                <Row className="mb-1 mt-3"> {
                    _.map(renderData, (data) => {
                        return (
                        <Col lg="4">
                            {BasicInfoUnit(data.name, data.value)}
                        </Col>
                        )
                    })}
                </Row>
            </div>
        );
    }
}

function BasicInfoUnit(field: string, data: string | undefined) 
{
    return (
        <Row>
            <Col lg="4" className="fieldName">
                {field}
            </Col>
            <Col lg="8" className="data">
                {data === undefined ? "N/A": data}
            </Col>
        </Row>
    );
}

export default BasicInfo;