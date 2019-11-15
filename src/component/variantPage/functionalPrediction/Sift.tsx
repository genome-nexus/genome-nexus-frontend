import * as React from 'react';
import classNames from 'classnames';
import { DefaultTooltip } from 'cbioportal-frontend-commons';
import { Table } from 'react-bootstrap';

import '../FunctionalGroups.css';
import annotationStyles from './styles/annotation.module.scss';
import tooltipStyles from './styles/siftTooltip.module.scss';
import functionalImpactColor from './styles/functionalImpactTooltip.module.scss';

// Most of this component comes from cBioPortal-frontend

export interface ISiftProps {
    siftPrediction: string; // deleterious, deleterious_low_confidence, tolerated, tolerated_low_confidence
    siftScore: number;
}

export function hideArrow(tooltipEl: any) {
    const arrowEl = tooltipEl.querySelector('.rc-tooltip-arrow');
    arrowEl.style.display = 'true';
}

export default class Sift extends React.Component<ISiftProps, {}> {
    static SIFT_URL: string = 'http://sift.bii.a-star.edu.sg/';

    constructor(props: ISiftProps) {
        super(props);
        this.tooltipContent = this.tooltipContent.bind(this);
    }

    public static siftText() {
        return (
            <div style={{ width: 450, height: 90 }}>
                <a
                    href={Sift.SIFT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    SIFT
                </a>{' '}
                predicts whether an amino acid substitution affects protein
                function based on sequence homology and the physical properties
                of amino acids. SIFT can be applied to naturally occurring
                nonsynonymous polymorphisms and laboratory-induced missense
                mutations.
            </div>
        );
    }

    public static siftTooltip() {
        return (
            <div>
                <Table table-border-top striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Legend</th>
                            <th>
                                <span
                                    style={{ display: 'inline-block' }}
                                    title="SIFT"
                                >
                                    <img
                                        height={14}
                                        src={require('./styles/siftFunnel.png')}
                                        alt="SIFT"
                                    />
                                    &nbsp;Qualitative prediction
                                </span>
                            </th>
                            <th>Score (0 ~ 1)</th>
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
                            <td>deleterious</td>
                            <td>Less than 0.05</td>
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
                            <td>deleterious_low_confidence</td>
                            <td>&nbsp;</td>
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
                            <td>tolerated_low_confidence</td>
                            <td>&nbsp;</td>
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
                            <td>tolerated</td>
                            <td>Greater than or equal to 0.05</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }

    public render() {
        let siftContent: JSX.Element = (
            <span className={`${annotationStyles['annotation-item-text']}`} />
        );

        if (this.props.siftPrediction && this.props.siftPrediction.length > 0) {
            siftContent = (
                <span
                    className={classNames(
                        annotationStyles['annotation-item-text'],
                        tooltipStyles[`sift-${this.props.siftPrediction}`]
                    )}
                >
                    <span className="functional-prediction-data">
                        {this.props.siftPrediction}
                    </span>
                </span>
            );
            const arrowContent = <div className="rc-tooltip-arrow-inner" />;
            siftContent = (
                <DefaultTooltip
                    overlay={this.tooltipContent}
                    placement="top"
                    trigger={['hover', 'focus']}
                    arrowContent={arrowContent}
                    onPopupAlign={hideArrow}
                    destroyTooltipOnHide={false}
                >
                    {siftContent}
                </DefaultTooltip>
            );
        } else {
            siftContent = (
                <span className="functional-prediction-no-data">N/A</span>
            );
        }

        return (
            <div>
                <DefaultTooltip
                    placement="top"
                    overlay={
                        <div>
                            {Sift.siftText()}
                            {Sift.siftTooltip()}
                        </div>
                    }
                >
                    <span className="data-source">SIFT</span>
                </DefaultTooltip>
                {siftContent}
            </div>
        );
    }

    private tooltipContent() {
        const impact = this.props.siftPrediction ? (
            <div>
                <table className={tooltipStyles['sift-tooltip-table']}>
                    <tr>
                        <td>Source</td>
                        <td>
                            <a
                                href="http://sift.bii.a-star.edu.sg/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                SIFT
                            </a>
                        </td>
                    </tr>
                    {(this.props.siftScore || this.props.siftScore === 0) && (
                        <tr>
                            <td>Score</td>
                            <td>
                                <b>{this.props.siftScore.toFixed(2)}</b>
                            </td>
                        </tr>
                    )}
                </table>
            </div>
        ) : null;

        return <span>{impact}</span>;
    }
}
