import * as React from 'react';
import { observer } from "mobx-react";
import { Row, Col } from "react-bootstrap";
import Structure from './structure';


interface ICancerHotspotsProps
{
    data?: string;
}

@observer
class CancerHotspots extends React.Component<ICancerHotspotsProps>
{

    public render()
    {
        return (
            <div>
                <Row className="mb-1 mt-3">
                    <Col lg="12">
                       <Structure name="Cancer Hotspots"/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CancerHotspots;