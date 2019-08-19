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

export enum ResourceName {
    "Cancer Hotspots",
    "OncoKB",
    "COSMIC",
    "cBioPortal",
    "Mutation Assessor",
    "CIVIC",
    "PMKB",
    "SIFT",
    "Polyphen-2",
    "UniProt",
    "PFAM",
    "PDB",
    "ProSite",
    "PhosphoSitePlus",
    "PTM",
    "External Links"
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

    private getComponentByRescource(resource: string) {
        switch(resource) {
            case "Cancer Hotspots": 
                return (
                    <div>
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    </div>
                );
            case "OncoKB":
                return (
                    <div>
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    <p>{resource} under construction.</p> 
                    </div>
                )
            default:
                    return;
        }
    }

    public render()
    {
        return (
            <div>
                <Row>
                    {/* TODO the height should automatically change with the content */}
                    <Col lg="2" className="mt-0 sidebar" style={{height: "300px"}}>
                        <SideBar store={variantStore} variant={this.variant}/>
                    </Col>
                    <Col lg="10">
                        <Row>
                            <Col lg="12" className="pl-5">
                                <BasicInfo/>
                            </Col>
                        </Row>
                        {
                            variantStore.selectedRecources.map((resource) => {
                                return (
                                    <Row id={resource}>
                                        <Col lg="12" className="pl-5">
                                            <CancerHotspots data={resource}/>
                                            {this.getComponentByRescource(resource)}
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                        {variantStore.selectedRecources.length === 0 && (
                                <p>Use the list on the left to show some content.</p>
                            )
                        }
                    </Col>
                </Row>
             </div>
        );
    }
}

export default Variant;
