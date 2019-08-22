import * as React from 'react';
import "./BasicInfoUnit.css";
import { observer } from "mobx-react";
import { Row, Col } from "react-bootstrap";

interface IBasicInfoUnitProps
{
    field: string;
    data?: string;
}

@observer
class BasicInfoUnit extends React.Component<IBasicInfoUnitProps>
{
    public static defaultProps = {
        data: "N/A"
    };

    public render()
    {
        return (
            <Row>
                <Col lg="4" className="fieldName">
                    {this.props.field}
                </Col>
                <Col lg="8" className="data">
                    {this.props.data}
                </Col>
            </Row>
        );
    }
}

export default BasicInfoUnit;