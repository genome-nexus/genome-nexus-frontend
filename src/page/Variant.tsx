import {computed} from "mobx";
import {observer} from "mobx-react";
import * as React from 'react';
import { Row, Col } from "react-bootstrap";
import SideBar from '../component/SideBar';
import BasicInfo from "../component/BasicInfo";
import './Variant.css'
import CancerHotspots from "../component/variantPage/cancerHotspot";
import { VariantStore } from "./VariantStore";
interface IVariantProps
{
    variant: string;
}

const variantStore = new VariantStore();

const win:any = (window as any);

win.patientViewPageStore = variantStore;

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
                    <Col lg="2" className="mt-0 sidebar" style={{height: "auto"}}>
                        <SideBar store={variantStore} variant={this.variant}/>
                    </Col>
                    <Col lg="10">
                        <Row>
                            <Col lg="12" className="pl-5">
                                <BasicInfo/>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="12" className="pl-5">
                                <CancerHotspots/>
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
                        <Row>
                            <Col lg="12" className="pl-5">
                                <CancerHotspots/>
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
                    </Col>
                </Row>
             </div>
        );
    }
}

export default Variant;
