import * as React from 'react';
import "./BasicInfoUnit.css";
import { observer } from "mobx-react";
import { computed, observable } from "mobx";
import { Row, Col, OverlayTrigger, Tooltip } from "react-bootstrap";
import autobind from 'autobind-decorator';

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

    @observable tooltipVisible = false;
    @observable.ref private el:HTMLDivElement|null = null;

    @autobind
    setRef(el:HTMLDivElement){
        this.el = el;
    }

    @computed get isOverflowed() {
        if (this.el) {
            let shownWidth =  this.el!.offsetWidth;
            let actualWidth = this.el!.scrollWidth;
            
            return (actualWidth! - shownWidth!) > 1;
        }
        return false;
    }

    public render()
    {
        return (
            <Row>
                <Col lg="4" className="field">
                    {this.props.field}
                </Col>
                <Col lg="8">
                    {this.isOverflowed && (
                        <OverlayTrigger
                            key={'top'}
                            placement={'top'}
                            overlay={
                                <Tooltip id={`tooltip-${'top'}`}>
                                    {this.props.data}
                                </Tooltip>
                            }
                            >
                            <div ref={this.setRef} className="data" >
                                {this.props.data}
                            </div>
                        </OverlayTrigger>
                        )
                    }

                    {!this.isOverflowed && (
                        <div ref={this.setRef} className="data" >
                            {this.props.data}
                        </div>
                        )
                    }
                </Col>
            </Row>

        );
    }
}

export default BasicInfoUnit;