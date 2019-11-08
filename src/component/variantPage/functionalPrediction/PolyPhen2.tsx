import * as React from 'react';
import annotationStyles from './styles/annotation.module.scss';
import classNames from 'classnames';
import tooltipStyles from './styles/polyPhen2Tooltip.module.scss';
import { DefaultTooltip } from 'cbioportal-frontend-commons';
import '../FunctionalGroups.css';

export interface IPolyPhen2Props {
    polyPhenPrediction: string; // benign, possibly_damaging, probably_damging
    polyPhenScore: number;
}

export function hideArrow(tooltipEl: any) {
    const arrowEl = tooltipEl.querySelector('.rc-tooltip-arrow');
    arrowEl.style.display = 'none';
}

export default class PolyPhen2 extends React.Component<IPolyPhen2Props, {}> {
    static POLYPHEN2_URL: string = 'http://genetics.bwh.harvard.edu/pph2/';

    constructor(props: IPolyPhen2Props) {
        super(props);
        this.tooltipContent = this.tooltipContent.bind(this);
    }

    public static download(
        polyPhenScore: number,
        polyPhenPrediction: string
    ): string {
        return `impact: ${polyPhenPrediction}, score: ${polyPhenScore}`;
    }

    public render() {
        let polyPhen2content: JSX.Element = (
            <span className={`${annotationStyles['annotation-item-text']}`} />
        );

        if (
            this.props.polyPhenPrediction &&
            this.props.polyPhenPrediction.length > 0
        ) {
            polyPhen2content = (
                <span
                    className={classNames(
                        annotationStyles['annotation-item-text'],
                        tooltipStyles[
                            `polyPhen2-${this.props.polyPhenPrediction}`
                        ]
                    )}
                >
                    <span className="functional-prediction-data">
                        {this.props.polyPhenPrediction}
                    </span>
                </span>
            );
            const arrowContent = <div className="rc-tooltip-arrow-inner" />;
            polyPhen2content = (
                <DefaultTooltip
                    overlay={this.tooltipContent}
                    placement="top"
                    trigger={['hover', 'focus']}
                    arrowContent={arrowContent}
                    onPopupAlign={hideArrow}
                    destroyTooltipOnHide={false}
                >
                    {polyPhen2content}
                </DefaultTooltip>
            );
        } else {
            polyPhen2content = (
                <span className="functional-prediction-no-data">N/A</span>
            );
        }

        return (
            <div>
                {polyPhen2content}
                <DefaultTooltip
                    placement="top"
                    overlay={
                        <span>
                            PolyPhen-2 (Polymorphism Phenotyping v2) is a tool
                            which
                            <br />
                            predicts possible impact of an amino acid
                            substitution
                            <br />
                            on the structure and function of a human protein
                            using
                            <br />
                            straightforward physical and comparative
                            considerations.
                            <br />
                            <a
                                href="http://genetics.bwh.harvard.edu/pph2/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <span>
                                    Click to see variant on PolyPhen-2 website.
                                </span>
                            </a>
                        </span>
                    }
                >
                    <span className="data-source">&nbsp;[PolyPhen-2]</span>
                </DefaultTooltip>
            </div>
        );
    }

    private tooltipContent() {
        const impact = this.props.polyPhenPrediction ? (
            <div>
                <table className={tooltipStyles['polyPhen2-tooltip-table']}>
                    <tr>
                        <td>Source</td>
                        <td>
                            <a
                                href="http://genetics.bwh.harvard.edu/pph2/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                PolyPhen-2
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <td>Impact</td>
                        <td>
                            <span
                                className={
                                    tooltipStyles[
                                        `polyPhen2-${this.props.polyPhenPrediction}`
                                    ]
                                }
                            >
                                {this.props.polyPhenPrediction}
                            </span>
                        </td>
                    </tr>
                    {(this.props.polyPhenScore ||
                        this.props.polyPhenScore === 0) && (
                        <tr>
                            <td>Score</td>
                            <td>
                                <b>{this.props.polyPhenScore.toFixed(2)}</b>
                            </td>
                        </tr>
                    )}
                </table>
            </div>
        ) : null;

        return <span>{impact}</span>;
    }
}
