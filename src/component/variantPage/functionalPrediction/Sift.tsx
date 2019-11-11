import * as React from 'react';
import annotationStyles from './styles/annotation.module.scss';
import classNames from 'classnames';
import tooltipStyles from './styles/siftTooltip.module.scss';
import { DefaultTooltip } from 'cbioportal-frontend-commons';
import '../FunctionalGroups.css';

export interface ISiftProps {
    siftPrediction: string; // deleterious, deleterious_low_confidence, tolerated, tolerated_low_confidence
    siftScore: number;
}

export function hideArrow(tooltipEl: any) {
    const arrowEl = tooltipEl.querySelector('.rc-tooltip-arrow');
    arrowEl.style.display = 'none';
}

export default class Sift extends React.Component<ISiftProps, {}> {
    static SIFT_URL: string = 'http://sift.bii.a-star.edu.sg/';

    constructor(props: ISiftProps) {
        super(props);
        this.tooltipContent = this.tooltipContent.bind(this);
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
                {siftContent}
                <DefaultTooltip
                    placement="top"
                    overlay={
                        <span>
                            SIFT predicts whether an amino acid substitution
                            <br />
                            affects protein function based on sequence homology
                            <br />
                            and the physical properties of amino acids.
                            <br />
                            <a
                                href="http://sift.bii.a-star.edu.sg/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span>
                                    Click to see variant on SIFT website.
                                </span>
                            </a>
                        </span>
                    }
                >
                    <span className="data-source">&nbsp;[SIFT]</span>
                </DefaultTooltip>
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
                    <tr>
                        <td>Impact</td>
                        <td>
                            <span
                                className={
                                    tooltipStyles[
                                        `sift-${this.props.siftPrediction}`
                                    ]
                                }
                            >
                                {this.props.siftPrediction}
                            </span>
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
