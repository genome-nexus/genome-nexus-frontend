import {computed} from "mobx";
import {observer} from "mobx-react";
import * as React from 'react';
import { Row, Col, Alert } from "react-bootstrap";
import SideBar from '../component/variantPage/SideBar';
import BasicInfo from "../component/variantPage/BasicInfo";
import './Variant.css'
import { VariantStore } from "./VariantStore";
import TranscriptSummaryTable from "../component/variantPage/TranscriptSummaryTable";
import { VariantAnnotationSummary } from "cbioportal-frontend-commons";
import { Mutation, TrackName } from "react-mutation-mapper";
import GenomeNexusMutationMapper from "../component/GenomeNexusMutationMapper";

interface IVariantProps
{
    variant: string;
    store: VariantStore;
    mainLoadingIndicator?: JSX.Element;
}


const win:any = (window as any);

@observer
class Variant extends React.Component<IVariantProps>
{

    constructor(props: IVariantProps) {
        super(props);
        win.props = props;
    }

    @computed
    private get variant() {
        return this.props.variant;
    }

    protected get isLoading() {
        return this.props.store.annotation.isPending;
    }

    protected get loadingIndicator() {
        return this.props.mainLoadingIndicator || <i className="fa fa-spinner fa-pulse fa-2x" />;
    }

    private getComponentByRescource(resource: string) {
        // TODO: each resource should have a component here
        switch(resource) {
            case "Cancer Hotspots": 
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case "OncoKB":
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case "COSMIC":
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case "cBioPortal":
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case "Mutation Assessor":
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case "CIViC":
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case "PMKB":
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case "SIFT":
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case "Polyphen-2":
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case "UniProt":
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case "PFAM":
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case "PDB":
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case "ProSite":
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case "PhosphoSitePlus":
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case "PTM":
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case "External Links":
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );

            default:
                    return;
        }
    }

    private variantToMutation(data: VariantAnnotationSummary | undefined): Mutation[] {
        let mutations = [];
        let mutation: Mutation;
        if(data !== undefined) {
            mutation = {
                "gene": {
                    "hugoGeneSymbol": data.transcriptConsequenceSummary.hugoGeneSymbol,
                    "entrezGeneId": parseInt(data.transcriptConsequenceSummary.entrezGeneId)
                },
                "chromosome": data.genomicLocation.chromosome,
                "startPosition": data.genomicLocation.start,
                "endPosition": data.genomicLocation.end,
                "referenceAllele": data.genomicLocation.referenceAllele,
                "variantAllele": data.genomicLocation.variantAllele,
                "proteinChange": data.transcriptConsequenceSummary.hgvspShort,
                "proteinPosEnd": data.transcriptConsequenceSummary.proteinPosition.end,
                "proteinPosStart": data.transcriptConsequenceSummary.proteinPosition.start,
                "mutationType": data.transcriptConsequenceSummary.variantClassification
            }
            mutations.push(mutation);
        }
        return mutations;
    }

    public render(): React.ReactNode
    {
        return this.isLoading ? this.loadingIndicator : (
            <div>
                <Row>
                    {/* TODO: the height should automatically change with the content */}
                    <Col lg="2" className="mt-0 sidebar" style={{height: "1050px"}}>
                        <SideBar store={this.props.store} variant={this.variant}/>
                    </Col>
                    <Col lg="10">
                        <Row>
                            <Col lg="12" className="pl-5">
                            {                              
                                <BasicInfo annotation={this.props.store.annotation.result}/>
                            }
                            </Col>
                        </Row>
                        <Row>
                            <Col className="pl-5">
                                <TranscriptSummaryTable annotation={this.props.store.annotation.result}/>
                            </Col>
                        </Row>
                        <Row className="pl-5 pb-3 small">
                            <GenomeNexusMutationMapper
                                data={this.variantToMutation(this.props.store.annotation.result!)}
                                tracks={[TrackName.CancerHotspots, TrackName.OncoKB, TrackName.PTM]}
                                hugoSymbol={this.props.store.annotation.result ? this.props.store.annotation.result.transcriptConsequenceSummary.hugoGeneSymbol: ""} 
                                entrezGeneId={this.props.store.annotation.result ? Number(this.props.store.annotation.result.transcriptConsequenceSummary.entrezGeneId): 0}
                                showPlotLegendToggle={false}
                                showPlotDownloadControls={false}
                            />
                        </Row>
                        <Row>
                            <Col>
                                {/* add resouce components */}
                                {
                                    this.props.store.allResources.map((resource, index) => {
                                        if (this.props.store.selectedRecources.includes(resource)) {
                                            return (
                                                <Row id={resource} key={index}>
                                                    <Col lg="12" className="pl-5">
                                                        {variantComponentHeader(resource)}
                                                        {this.getComponentByRescource(resource)}
                                                    </Col>
                                                </Row>
                                            )
                                        }
                                    })
                                }

                                {/* show notification when no fields has been selected */}
                                {this.props.store.selectedRecources.length === 0 && (
                                    <div className="pl-4">
                                        <Alert key={"alert"} variant={"primary"}>
                                            Use the list on the left to show some content.
                                        </Alert>
                                    </div>
                                    )
                                }
                            </Col>
                        </Row>
                    </Col>
                </Row>
             </div>
        );
    }
}

function variantComponentHeader(name: string)
{
    // header for each resouce component
    return (
        <div className="componentHeader" id={name}>
            {name}
        </div>
    );
}

export default Variant;
