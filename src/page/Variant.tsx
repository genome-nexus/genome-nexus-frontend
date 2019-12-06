import { computed } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import SideBar from '../component/variantPage/SideBar';
import BasicInfo from '../component/variantPage/BasicInfo';
import './Variant.css';
import { VariantStore } from './VariantStore';
import TranscriptSummaryTable from '../component/variantPage/TranscriptSummaryTable';
import {
    VariantAnnotationSummary,
    getProteinPositionFromProteinChange,
} from 'cbioportal-frontend-commons';
import { Mutation, TrackName, DataFilterType } from 'react-mutation-mapper';
import GenomeNexusMutationMapper from '../component/GenomeNexusMutationMapper';
import { getTranscriptConsequenceSummary } from '../util/AnnotationSummaryUtil';
import { genomeNexusApiRoot } from './genomeNexusClientInstance';
import FunctionalGroups from '../component/variantPage/FunctionalGroups';
interface IVariantProps {
    variant: string;
    store: VariantStore;
    mainLoadingIndicator?: JSX.Element;
}

const win: any = window as any;

@observer
class Variant extends React.Component<IVariantProps> {
    constructor(props: IVariantProps) {
        super(props);
        win.props = props;
    }

    @computed
    private get variant() {
        return this.props.variant;
    }

    @computed
    private get annotationSummary() {
        return this.props.store.annotation.result
            ? this.props.store.annotation.result.annotation_summary
            : undefined;
    }

    @computed
    private get myVariantInfo() {
        return this.props.store.annotation.result &&
            this.props.store.annotation.result.my_variant_info
            ? this.props.store.annotation.result.my_variant_info.annotation
            : undefined;
    }

    @computed
    private get oncokb() {
        return this.props.store.oncokbData.result;
    }

    @computed
    private get variantAnnotation() {
        return this.props.store.annotation.result
            ? this.props.store.annotation.result
            : undefined;
    }

    protected get isLoading() {
        return this.props.store.annotation.isPending;
    }

    protected get loadingIndicator() {
        return (
            this.props.mainLoadingIndicator || (
                <i className="fa fa-spinner fa-pulse fa-2x" />
            )
        );
    }

    private getMutationMapper() {
        let mutation = this.variantToMutation(this.annotationSummary);
        if (mutation[0].gene && mutation[0].gene.hugoGeneSymbol.length !== 0) {
            return (
                <GenomeNexusMutationMapper
                    genomeNexusUrl={genomeNexusApiRoot}
                    data={mutation}
                    tracks={[
                        TrackName.CancerHotspots,
                        TrackName.OncoKB,
                        TrackName.PTM,
                    ]}
                    // allow default tracks to show up
                    trackVisibility={{
                        [TrackName.CancerHotspots]: 'visible',
                        [TrackName.OncoKB]: 'visible',
                        [TrackName.PTM]: 'visible',
                    }}
                    hugoSymbol={
                        getTranscriptConsequenceSummary(this.annotationSummary)
                            .hugoGeneSymbol
                    }
                    entrezGeneId={Number(
                        getTranscriptConsequenceSummary(this.annotationSummary)
                            .entrezGeneId
                    )}
                    showPlotLegendToggle={false}
                    showPlotDownloadControls={false}
                    // disable filter reset notification
                    showFilterResetPanel={false}
                    // hide track slider
                    showPlotYMaxSlider={false}
                    // hide track selector
                    showTrackSelector={false}
                    // hide y axis
                    showPlotYAxis={false}
                    // set lollipop height
                    plotTopYAxisDefaultMax={1}
                    // set plot height
                    plotLollipopHeight={150}
                    // select the lollipop by default
                    selectionFilters={[
                        {
                            type: DataFilterType.POSITION,
                            values: [mutation[0].proteinPosStart],
                        },
                    ]}
                />
            );
        } else {
            return (
                <Alert key={'alert'} variant={'secondary'}>
                    No plot.
                </Alert>
            );
        }
    }

    private getComponentByRescource(resource: string) {
        // TODO: each resource should have a component here
        switch (resource) {
            case 'Cancer Hotspots':
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case 'OncoKB':
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case 'COSMIC':
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case 'cBioPortal':
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case 'Mutation Assessor':
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case 'CIViC':
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case 'PMKB':
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case 'SIFT':
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case 'Polyphen-2':
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case 'UniProt':
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case 'PFAM':
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case 'PDB':
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case 'ProSite':
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case 'PhosphoSitePlus':
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case 'PTM':
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );
            case 'External Links':
                return (
                    <div>
                        <p>{resource} under construction.</p>
                    </div>
                );

            default:
                return;
        }
    }

    private variantToMutation(
        data: VariantAnnotationSummary | undefined
    ): Mutation[] {
        let mutations = [];
        let mutation: Mutation;
        if (data !== undefined) {
            let transcriptConsequenceSummary = getTranscriptConsequenceSummary(
                data
            );
            mutation = {
                gene: {
                    hugoGeneSymbol: transcriptConsequenceSummary.hugoGeneSymbol,
                    entrezGeneId: Number(
                        transcriptConsequenceSummary.entrezGeneId
                    ),
                },
                chromosome: data.genomicLocation.chromosome,
                startPosition: data.genomicLocation.start,
                endPosition: data.genomicLocation.end,
                referenceAllele: data.genomicLocation.referenceAllele,
                variantAllele: data.genomicLocation.variantAllele,
                // TODO: is it ok to return "" if no protein change data?
                proteinChange: transcriptConsequenceSummary.hgvspShort,
                proteinPosStart: transcriptConsequenceSummary.proteinPosition
                    ? transcriptConsequenceSummary.proteinPosition.start
                    : this.getProteinPosStart(
                          transcriptConsequenceSummary.hgvspShort
                      ),
                proteinPosEnd: transcriptConsequenceSummary.proteinPosition
                    ? transcriptConsequenceSummary.proteinPosition.end
                    : undefined,
                mutationType:
                    transcriptConsequenceSummary.variantClassification,
            };
            mutations.push(mutation);
        }
        return mutations;
    }

    private getProteinPosStart(proteinChange: string | undefined) {
        var proteinPosition = getProteinPositionFromProteinChange(
            proteinChange
        );
        // TODO: is it ok to return 0 if no protein change data?
        return proteinPosition ? proteinPosition.start : 0;
    }

    public render(): React.ReactNode {
        return this.isLoading ? (
            this.loadingIndicator
        ) : (
            <div>
                <Row className="variant-page-container">
                    {/* TODO: the height should automatically change with the content */}
                    {/* remove the d-none if have sidebar */}
                    <Col
                        lg="2"
                        className="mt-0 sidebar d-none"
                        style={{ height: '1050px' }}
                    >
                        <SideBar
                            store={this.props.store}
                            variant={this.variant}
                        />
                    </Col>
                    {/* change to lg="10" if have side bar */}
                    <Col className="variant-page">
                        {/* remove this row if have side bar */}
                        <Row>
                            <Col style={{ fontSize: '1.3rem' }}>
                                {this.props.variant}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {
                                    <BasicInfo
                                        annotation={this.annotationSummary}
                                    />
                                }
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col>
                                <TranscriptSummaryTable
                                    annotation={this.annotationSummary}
                                />
                            </Col>
                        </Row> */}
                        <Row>
                            <Col className="pb-3 small">
                                {this.getMutationMapper()}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FunctionalGroups
                                    myVariantInfo={this.myVariantInfo}
                                    annotationInternal={this.annotationSummary}
                                    variantAnnotation={this.variantAnnotation}
                                    oncokb={this.oncokb}
                                />
                            </Col>
                        </Row>
                        {/* remove the d-none if have sidebar */}
                        {/* the content for each resources */}
                        <Row className="d-none">
                            <Col>
                                {/* add resouce components */}
                                {this.props.store.allResources.map(
                                    (resource, index) => {
                                        return (
                                            this.props.store.selectedResources.includes(
                                                resource
                                            ) && (
                                                <Row id={resource} key={index}>
                                                    <Col
                                                        lg="12"
                                                        className="pl-5"
                                                    >
                                                        {variantComponentHeader(
                                                            resource
                                                        )}
                                                        {this.getComponentByRescource(
                                                            resource
                                                        )}
                                                    </Col>
                                                </Row>
                                            )
                                        );
                                    }
                                )}

                                {/* show notification when no fields has been selected */}
                                {this.props.store.selectedResources.length ===
                                    0 && (
                                    <div className="pl-4">
                                        <Alert
                                            key={'alert'}
                                            variant={'primary'}
                                        >
                                            Use the list on the left to show
                                            some content.
                                        </Alert>
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

function variantComponentHeader(name: string) {
    // header for each resouce component
    return (
        <div className="componentHeader" id={name}>
            {name}
        </div>
    );
}

export default Variant;
