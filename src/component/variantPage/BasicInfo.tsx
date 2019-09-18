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
    key: string;
}
@observer
class BasicInfo extends React.Component<IBasicInfoProps>
{
    private parseAnnotation(annotation: VariantAnnotationSummary | undefined): BasicInfoData[] {
        let parsedData: BasicInfoData[] = [];
        if (annotation !== undefined) {
            parsedData.push({
                "key": "allele",
                "name": "Allele",
                "value": `${annotation.genomicLocation.referenceAllele}/${annotation.genomicLocation.variantAllele}`
            });
            parsedData.push({
                "key": "chomosome",
                "name": "Chomosome",
                "value": annotation.genomicLocation.chromosome
            });
            parsedData.push({
                "key": "position",
                "name": "Position",
                "value": annotation.genomicLocation.start === annotation.genomicLocation.end ? `${annotation.genomicLocation.start}` :
                        `${annotation.genomicLocation.start}_${annotation.genomicLocation.end}`
            });
            parsedData.push({
                "key": "assemblyName",
                "name": "Assembly Name",
                "value": annotation.assemblyName
            });
            parsedData.push({
                "key": "variantType",
                "name": "Variant Type",
                "value": annotation.variantType
            });
            parsedData.push({
                "key": "strandSign",
                "name": "Strand Sign",
                "value": annotation.strandSign
            });
        }
        else {
            parsedData.push({
                "key": "allele",
                "name": "Allele",
                "value": "N/A"
            });
            parsedData.push({
                "key": "chomosome",
                "name": "Chomosome",
                "value": "N/A"
            });
            parsedData.push({
                "key": "position",
                "name": "Position",
                "value": "N/A"
            });
            parsedData.push({
                "key": "assemblyName",
                "name": "Assembly Name",
                "value": "N/A"
            });
            parsedData.push({
                "key": "variantType",
                "name": "Variant Type",
                "value": "N/A"
            });
            parsedData.push({
                "key": "strandSign",
                "name": "Strand Sign",
                "value": "N/A"
            });
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
                            {BasicInfoUnit(data.name, data.value, data.key)}
                        </Col>
                        )
                    })}
                </Row>
            </div>
        );
    }
}

function BasicInfoUnit(field: string, data: string | undefined, key: string) 
{
    return (
        <Row key={key}>
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