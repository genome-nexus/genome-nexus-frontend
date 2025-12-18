import * as React from 'react';
import { DefaultTooltip } from 'cbioportal-frontend-commons';
import { MutationAssessor as MutationAssessorData } from 'genome-nexus-ts-api-client';
import { action, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import { Collapse, Table } from 'react-bootstrap';
import Toggle from '../../Toggle';
import functionalGroupsStyle from '../functionalGroups.module.scss';

// Most of this component comes from cBioPortal-frontend

// TODO: Need to update the url when new manuscript is available
const MUTATION_ASSESSOR_URL = 'http://mutationassessor.org/r3/';

export interface IMutationAssessorProps {
    mutationAssessor?: MutationAssessorData;
    isCanonicalTranscriptSelected: boolean;
}

export function hideArrow(tooltipEl: any) {
    const arrowEl = tooltipEl.querySelector('.rc-tooltip-arrow');
    arrowEl.style.display = 'true';
}

const MutationAssessorLegend: React.FunctionComponent = () => {
    return (
        <div style={{ minWidth: 450 }}>
            <Table table-border-top striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>
                            <span
                                style={{ display: 'inline-block' }}
                                title="Mutation Assessor"
                            >
                                <img
                                    height={14}
                                    src={require('./styles/mutationAssessor.png')}
                                    alt="Mutation Assessor"
                                />
                                &nbsp;Qualitative prediction
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <b>High</b>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>Medium</b>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>Low</b>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <b>Neutral</b>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

const MutationAssessorInfo: React.FunctionComponent = () => {
    return (
        <div style={{ maxWidth: 450 }}>
            Mutation Assessor predicts the functional impact of amino-acid
            substitutions in proteins, such as mutations discovered in cancer or
            missense polymorphisms. The functional impact is assessed based on
            evolutionary conservation of the affected amino acid in protein
            homologs. The method has been validated on a large set of disease
            associated and polymorphic variants (
            <a
                href="https://www.ncbi.nlm.nih.gov/clinvar/"
                target="_blank"
                rel="noopener noreferrer"
            >
                ClinVar
            </a>
            ).
            <br />
            <b>
                Mutation Assessor V4 data is now available in Genome Nexus!
            </b>{' '}
            New manuscript is in progress. Click{` `}
            <a
                href={MUTATION_ASSESSOR_URL}
                target="_blank"
                rel="noopener noreferrer"
            >
                here
            </a>
            {` `} to see information about V3 data.
        </div>
    );
};

const MutationAssessorValue: React.FunctionComponent<{
    mutationAssessor?: MutationAssessorData;
}> = ({ mutationAssessor }) => {
    if (!mutationAssessor) return null;

    const scoreElement =
        mutationAssessor.functionalImpactScore != null ? (
            <div>
                <span className="mr-2">Score</span>
                <strong>
                    {mutationAssessor.functionalImpactScore.toFixed(2)}
                </strong>
            </div>
        ) : null;

    const msaLink = mutationAssessor.msa ? (
        <div>
            Multiple sequence alignment file:{' '}
            <a
                href={`https://projects.sanderlab.org/av/?url=https://genome-nexus-static-data.s3.us-east-1.amazonaws.com/mutationassessor-v4-multiple-sequence-alignment-files-uncompressed/${mutationAssessor.msa}.fa`}
                target="_blank"
                rel="noopener noreferrer"
            >
                View
            </a>
            {' | '}
            <a
                href={`https://genome-nexus-static-data.s3.us-east-1.amazonaws.com/mutationassessor-v4-multiple-sequence-alignment-files-uncompressed/${mutationAssessor.msa}.fa`}
                target="_blank"
                rel="noopener noreferrer"
            >
                Download
            </a>
        </div>
    ) : null;

    if (!scoreElement && !msaLink) return null;

    return (
        <div>
            {scoreElement}
            {msaLink}
        </div>
    );
};

@observer
export default class MutationAssessor extends React.Component<
    IMutationAssessorProps,
    {}
> {
    @observable showDetails = false;

    constructor(props: IMutationAssessorProps) {
        super(props);
        makeObservable(this);
    }

    public render() {
        let functionalImpactPrediction =
            this.props.mutationAssessor?.functionalImpactPrediction || 'N/A';

        const dataSource = (
            <div className={functionalGroupsStyle['data-with-link']}>
                Mutation Assessor&nbsp;
                <i className="fas fa-external-link-alt" />
                {!this.props.isCanonicalTranscriptSelected && <span> *</span>}
            </div>
        );
        // TODO: Need to add url link when new manuscript is available
        return (
            <div className={functionalGroupsStyle['functional-group']}>
                <div className={functionalGroupsStyle['data-source']}>
                    <DefaultTooltip
                        placement="top"
                        overlay={<MutationAssessorInfo />}
                    >
                        <a
                            href={MUTATION_ASSESSOR_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {dataSource}
                        </a>
                    </DefaultTooltip>
                </div>
                <div>
                    <span className={functionalGroupsStyle['data-with-link']}>
                        <>{functionalImpactPrediction}</>
                    </span>
                    <Toggle
                        isOpen={this.showDetails}
                        textWhenOpen="Less"
                        textWhenClosed="More"
                        onToggle={this.onToggleDetails}
                    />
                    <Collapse in={this.showDetails}>
                        <div className="pt-2">
                            <MutationAssessorValue
                                mutationAssessor={this.props.mutationAssessor}
                            />
                            <br />
                            <MutationAssessorLegend />
                        </div>
                    </Collapse>
                </div>
            </div>
        );
    }

    @action
    onToggleDetails = () => {
        this.showDetails = !this.showDetails;
    };
}
