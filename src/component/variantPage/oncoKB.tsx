import * as React from 'react';
import { observer } from "mobx-react";
import { Row, Col } from "react-bootstrap";
import VariantComponentHeader from './variantComponentHeader';


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
                       <VariantComponentHeader name="OncoKB"/>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default CancerHotspots;