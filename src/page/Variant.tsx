import {computed} from "mobx";
import {observer} from "mobx-react";
import * as React from 'react';
import { Row, Col } from "react-bootstrap";
import SideBar from '../component/SideBar';
import BasicInfo from "../component/BasicInfo";
import './Variant.css'
interface IVariantProps
{
    variant: string;
}

@observer
class Variant extends React.Component<IVariantProps>
{
    @computed
    private get variant() {
        return this.props.variant;
    }

    public render()
    {
        return (
            <div>
                <Row>
                    <Col lg="2" className="mt-0 sidebar" style={{height: "200px"}}>
                        <SideBar variant={this.variant}/>
                    </Col>
                    <Col lg="10">
                        <Row>
                            <Col lg="12" className="pl-5">
                                <BasicInfo/>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="12" className="pl-5">

                            </Col>
                        </Row>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                        <p>
                            under construction.
                        </p>
                    </Col>
                </Row>
             </div>
        );
    }
}

export default Variant;
