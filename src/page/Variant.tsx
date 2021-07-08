import { computed, action, makeObservable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Row, Col, Alert } from 'react-bootstrap';
import SideBar from '../component/variantPage/SideBar';
import BasicInfo from '../component/variantPage/BasicInfo';
import './Variant.css';
import { VariantStore } from './VariantStore';
import { TrackName, DataFilterType } from 'react-mutation-mapper';
import GenomeNexusMutationMapper from '../component/GenomeNexusMutationMapper';
import { getTranscriptConsequenceSummary } from '../util/AnnotationSummaryUtil';
import { genomeNexusApiRoot } from './genomeNexusClientInstance';
import FunctionalGroups from '../component/variantPage/FunctionalGroups';
import Spinner from 'react-spinkit';
import { variantToMutation } from '../util/variantUtils';

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
        makeObservable(this);
        win.props = props;
    }

    @computed
    private get variant() {
        return this.props.variant;
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
    private get civic() {
        return this.props.store.civicVariants.result;
    }

    @computed
    private get variantAnnotation() {
        return this.props.store.annotation.result
            ? this.props.store.annotation.result
            : undefined;
    }

    @computed
    get isCanonicalTranscriptSelected() {
        if (this.props.store.annotationSummary) {
            // no selection, canonical transcript will be selected as default
            return (
                this.props.store.selectedTranscript === '' ||
                this.props.store.selectedTranscript ===
                    this.props.store.annotationSummary.canonicalTranscriptId
            );
        } else {
            return undefined;
        }
    }

    protected get isLoading() {
        return (
            this.props.store.annotation.isPending ||
            this.props.store.oncokbGenesMap.isPending ||
            this.props.store.civicVariants.isPending ||
            this.props.store.isAnnotatedSuccessfully.isPending
        );
    }

    protected get loadingIndicator() {
        return (
            this.props.mainLoadingIndicator || (
                <div className={'loadingIndicator'}>
                    <Spinner
                        fadeIn={'none'}
                        name="ball-scale-multiple"
                        color="aqua"
                    />
                </div>
            )
        );
    }

    @computed get allValidTranscripts() {
        if (
            this.props.store.isAnnotatedSuccessfully.isComplete &&
            this.props.store.isAnnotatedSuccessfully.result === true &&
            this.props.store.getMutationMapperStore &&
            this.props.store.getMutationMapperStore.transcriptsWithAnnotations
                .result &&
            this.props.store.getMutationMapperStore.transcriptsWithAnnotations
                .result.length > 0
        ) {
            return this.props.store.getMutationMapperStore
                .transcriptsWithAnnotations.result;
        }
        return [];
    }

    @action
    private setActiveTranscript = (transcriptId: string) => {
        // set mutation mapper active transcript
        this.props.store.getMutationMapperStore!.setSelectedTranscript(
            transcriptId
        );
        // set variant page active transcript
        this.props.store.selectedTranscript = transcriptId;
        var transcriptIdQuery = '?transcriptId=' + transcriptId;
        win.history.pushState(
            { transcriptId: transcriptIdQuery, title: document.title },
            document.title,
            transcriptIdQuery
        );
    };

    private getMutationMapper() {
        let mutation = variantToMutation(this.props.store.annotationSummary);
        if (
            mutation[0] &&
            mutation[0].gene &&
            mutation[0].gene.hugoGeneSymbol.length !== 0 &&
            this.props.store.getMutationMapperStore !== undefined
        ) {
            return (
                <GenomeNexusMutationMapper
                    genomeNexusUrl={genomeNexusApiRoot}
                    data={mutation}
                    store={this.props.store.getMutationMapperStore}
                    tracks={[
                        TrackName.CancerHotspots,
                        TrackName.OncoKB,
                        TrackName.dbPTM,
                    ]}
                    // allow default tracks to show up
                    trackVisibility={{
                        [TrackName.CancerHotspots]: 'visible',
                        [TrackName.OncoKB]: 'visible',
                        [TrackName.dbPTM]: 'visible',
                    }}
                    hugoSymbol={
                        getTranscriptConsequenceSummary(
                            this.props.store.annotationSummary
                        ).hugoGeneSymbol
                    }
                    entrezGeneId={Number(
                        getTranscriptConsequenceSummary(
                            this.props.store.annotationSummary
                        ).entrezGeneId
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
                    plotVizHeight={150}
                    // select the lollipop by default
                    selectionFilters={[
                        {
                            type: DataFilterType.POSITION,
                            values: [mutation[0].proteinPosStart],
                        },
                    ]}
                    oncoKbUrl={'https://www.cbioportal.org/proxy/oncokb'}
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

    public render(): React.ReactNode {
        return this.isLoading ? (
            this.loadingIndicator
        ) : (
            <div>
                <div className={'page-body variant-page'}>
                    <div className={'page-section'}>
                        <Row>
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
                            <Col>
                                <Row>
                                    <Col>
                                        <BasicInfo
                                            annotation={
                                                this.props.store
                                                    .annotationSummary
                                            }
                                            mutation={
                                                variantToMutation(
                                                    this.props.store
                                                        .annotationSummary
                                                )[0]
                                            }
                                            variant={this.props.variant}
                                            oncokbGenesMap={
                                                this.props.store.oncokbGenesMap
                                                    .result
                                            }
                                            oncokb={this.oncokb}
                                            selectedTranscript={
                                                this.props.store
                                                    .selectedTranscript
                                            }
                                            isCanonicalTranscriptSelected={
                                                this
                                                    .isCanonicalTranscriptSelected
                                            }
                                            allValidTranscripts={
                                                this.allValidTranscripts
                                            }
                                            onTranscriptSelect={transcriptId =>
                                                this.setActiveTranscript(
                                                    transcriptId
                                                )
                                            }
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col className="pb-3 small gn-mutation-mapper">
                                        {this.getMutationMapper()}
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
                                                        <Row
                                                            id={resource}
                                                            key={index}
                                                        >
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
                                        {this.props.store.selectedResources
                                            .length === 0 && (
                                            <div className="pl-4">
                                                <Alert
                                                    key={'alert'}
                                                    variant={'primary'}
                                                >
                                                    Use the list on the left to
                                                    show some content.
                                                </Alert>
                                            </div>
                                        )}
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FunctionalGroups
                                    myVariantInfo={this.myVariantInfo}
                                    annotationInternal={
                                        this.props.store.annotationSummary
                                    }
                                    variantAnnotation={this.variantAnnotation}
                                    oncokb={this.oncokb}
                                    civic={this.civic}
                                    isCanonicalTranscriptSelected={
                                        this.isCanonicalTranscriptSelected!
                                    }
                                />
                            </Col>
                        </Row>
                        {!this.isCanonicalTranscriptSelected && (
                            <div>
                                * This resource uses a transcript different from
                                the displayed one, but the genomic change is the
                                same.
                            </div>
                        )}
                    </div>
                </div>
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
