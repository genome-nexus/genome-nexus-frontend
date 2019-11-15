import * as React from 'react';
import classNames from 'classnames';
import { MutationAssessor as MutationAssessorData } from 'cbioportal-frontend-commons/api/generated/GenomeNexusAPI';
import { DefaultTooltip } from 'cbioportal-frontend-commons';
import { Table } from 'react-bootstrap';

import '../FunctionalGroups.css';
import annotationStyles from './styles/annotation.module.scss';
import tooltipStyles from './styles/mutationAssessorTooltip.module.scss';
import mutationAssessorColumn from './styles/mutationAssessor.module.scss';
import functionalImpactColor from './styles/functionalImpactTooltip.module.scss';

// Most of this component comes from cBioPortal-frontend

export interface IMutationAssessorProps {
    mutationAssessor: MutationAssessorData;
}

export function hideArrow(tooltipEl: any) {
    const arrowEl = tooltipEl.querySelector('.rc-tooltip-arrow');
    arrowEl.style.display = 'true';
}

export default class MutationAssessor extends React.Component<
    IMutationAssessorProps,
    {}
> {
    static MUTATION_ASSESSOR_URL: string = 'http://mutationassessor.org/r3/';

    constructor(props: IMutationAssessorProps) {
        super(props);

        this.tooltipContent = this.tooltipContent.bind(this);
    }

    public static mutationAssessorText() {
        return (
            <div style={{ width: 450, height: 120 }}>
                <a
                    href={MutationAssessor.MUTATION_ASSESSOR_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Mutation Assessor
                </a>{' '}
                predicts the functional impact of amino-acid substitutions in
                proteins, such as mutations discovered in cancer or missense
                polymorphisms. The functional impact is assessed based on
                evolutionary conservation of the affected amino acid in protein
                homologs. The method has been validated on a large set (60k) of
                disease associated (OMIM) and polymorphic variants.
            </div>
        );
    }

    public static mutationAssessorTooltip() {
        return (
            <div>
                <Table table-border-top striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Legend</th>
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
                            <th>Score (‐5.545 ~ 5.937)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <span>
                                    <i
                                        className={classNames(
                                            functionalImpactColor['high'],
                                            'fa fa-circle'
                                        )}
                                        aria-hidden="true"
                                    ></i>
                                </span>
                            </td>
                            <td>High</td>
                            <td>Greater than 3.5</td>
                        </tr>
                        <tr>
                            <td>
                                <span>
                                    <i
                                        className={classNames(
                                            functionalImpactColor['medium'],
                                            'fa fa-circle'
                                        )}
                                        aria-hidden="true"
                                    ></i>
                                </span>
                            </td>
                            <td>Medium</td>
                            <td>
                                Greater than 1.938 and less than or equal to 3.5
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>
                                    <i
                                        className={classNames(
                                            functionalImpactColor['low'],
                                            'fa fa-circle'
                                        )}
                                        aria-hidden="true"
                                    ></i>
                                </span>
                            </td>
                            <td>Low</td>
                            <td>
                                Greater than 0.8 and less than or equal to 1.938
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>
                                    <i
                                        className={classNames(
                                            functionalImpactColor['neutral'],
                                            'fa fa-circle'
                                        )}
                                        aria-hidden="true"
                                    ></i>
                                </span>
                            </td>
                            <td>Neutral</td>
                            <td>Less than or equal to 0.8</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }

    public render() {
        let maContent: JSX.Element = (
            <span className={`${annotationStyles['annotation-item-text']}`} />
        );
        if (
            this.props.mutationAssessor &&
            this.props.mutationAssessor.functionalImpact != null &&
            this.props.mutationAssessor.functionalImpact !== ''
        ) {
            const maData = this.props.mutationAssessor;
            maContent = (
                <span
                    className={classNames(
                        annotationStyles['annotation-item-text'],
                        mutationAssessorColumn[`ma-${maData.functionalImpact}`]
                    )}
                >
                    <span className="functional-prediction-data">
                        {maData.functionalImpact}
                    </span>
                </span>
            );
            const arrowContent = <div className="rc-tooltip-arrow-inner" />;
            maContent = (
                <DefaultTooltip
                    overlay={this.tooltipContent}
                    placement="top"
                    trigger={['hover', 'focus']}
                    arrowContent={arrowContent}
                    onPopupAlign={hideArrow}
                    destroyTooltipOnHide={false}
                >
                    {maContent}
                </DefaultTooltip>
            );
        } else {
            maContent = (
                <span className="functional-prediction-no-data">N/A</span>
            );
        }

        return (
            <div>
                <DefaultTooltip
                    placement="top"
                    overlay={
                        <div>
                            {MutationAssessor.mutationAssessorText()}
                            {MutationAssessor.mutationAssessorTooltip()}
                        </div>
                    }
                >
                    <span className="data-source">Mutation Assessor</span>
                </DefaultTooltip>
                {maContent}
            </div>
        );
    }

    private tooltipContent() {
        const maData = this.props.mutationAssessor;
        const xVarLink = MutationAssessor.maLink(
            `http://mutationassessor.org/r3/?cm=var&p=${maData.uniprotId}&var=${maData.variant}`
        );
        const msaLink = MutationAssessor.maLink(maData.msaLink);
        const pdbLink = MutationAssessor.maLink(maData.pdbLink);

        const impact = maData.functionalImpact ? (
            <div>
                <table className={tooltipStyles['ma-tooltip-table']}>
                    <tr>
                        <td>Source</td>
                        <td>
                            <a
                                href="http://mutationassessor.org/r3"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                MutationAssessor
                            </a>
                        </td>
                    </tr>
                    {(maData.functionalImpactScore ||
                        maData.functionalImpactScore === 0) && (
                        <tr>
                            <td>Score</td>
                            <td>
                                <b>{maData.functionalImpactScore.toFixed(2)}</b>
                            </td>
                        </tr>
                    )}
                </table>
            </div>
        ) : null;

        const xVar = xVarLink ? (
            <div className={tooltipStyles['mutation-assessor-link']}>
                <a href={xVarLink} target="_blank" rel="noopener noreferrer">
                    <img
                        height="15"
                        width="19"
                        src={require('./styles/mutationAssessor.png')}
                        className={tooltipStyles['mutation-assessor-main-img']}
                        alt="Mutation Assessor"
                    />
                    Go to Mutation Assessor
                </a>
            </div>
        ) : null;

        const msa = msaLink ? (
            <div className={tooltipStyles['mutation-assessor-link']}>
                <a href={msaLink} target="_blank" rel="noopener noreferrer">
                    <span
                        className={`${tooltipStyles['ma-icon']} ${tooltipStyles['ma-msa-icon']}`}
                    >
                        msa
                    </span>
                    Multiple Sequence Alignment
                </a>
            </div>
        ) : null;

        const pdb = pdbLink ? (
            <div className={tooltipStyles['mutation-assessor-link']}>
                <a href={pdbLink} target="_blank" rel="noopener noreferrer">
                    <span
                        className={`${tooltipStyles['ma-icon']} ${tooltipStyles['ma-3d-icon']}`}
                    >
                        3D
                    </span>
                    Mutation Assessor 3D View
                </a>
            </div>
        ) : null;

        return (
            <span>
                {impact}
                {msa}
                {pdb}
                {xVar}
            </span>
        );
    }

    // This is mostly to make the legacy MA links work
    public static maLink(link: string | undefined) {
        let url = null;

        // ignore invalid links ("", "NA", "Not Available")
        if (link) {
            // getma.org is the legacy link, need to replace it with the actual value
            url = link.replace('getma.org', 'mutationassessor.org/r3');

            // prepend "http://" if needed
            if (url.indexOf('http://') !== 0) {
                url = `http://${url}`;
            }
        }

        return url;
    }
}
