import * as React from 'react';
import classNames from 'classnames';
import { DefaultTooltip } from 'cbioportal-frontend-commons';
import { Table } from 'react-bootstrap';

import annotationStyles from './styles/annotation.module.scss';
import tooltipStyles from './styles/polyPhen2Tooltip.module.scss';
import functionalImpactColor from './styles/functionalImpactTooltip.module.scss';
import functionalGroupsStyle from '../functionalGroups.module.scss';

// Most of this component comes from cBioPortal-frontend

export interface IPolyPhen2Props {
    polyPhenPrediction: string; // benign, possibly_damaging, probably_damging
    polyPhenScore: number;
}

export default class PolyPhen2 extends React.Component<IPolyPhen2Props, {}> {
    static POLYPHEN2_URL: string = 'http://genetics.bwh.harvard.edu/pph2/';

    constructor(props: IPolyPhen2Props) {
        super(props);
        this.polyPhenData = this.polyPhenData.bind(this);
    }

    public static polyPhenText() {
        return (
            <div style={{ width: 450, height: 77 }}>
                <a
                    href={PolyPhen2.POLYPHEN2_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    PolyPhen-2
                </a>{' '}
                (Polymorphism Phenotyping v2) is a tool which predicts possible
                impact of an amino acid substitution on the structure and
                function of a human protein using straightforward physical and
                comparative considerations.
            </div>
        );
    }

    public polyPhenData() {
        const impact = this.props.polyPhenPrediction ? (
            <div>
                <table className={tooltipStyles['polyPhen2-tooltip-table']}>
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
                <span>
                    Please refer to the score range{' '}
                    <a
                        href="https://useast.ensembl.org/info/genome/variation/prediction/protein_function.html"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        here
                    </a>
                    .
                </span>
            </div>
        ) : null;

        return (
            <div>
                {impact}
                <br />
            </div>
        );
    }

    public polyPhenTooltip(tooltipTrigger: JSX.Element) {
        return (
            <DefaultTooltip
                placement="top"
                overlay={
                    <div>
                        {PolyPhen2.polyPhenText()}
                        {this.polyPhenData()}
                        {PolyPhen2.polyPhenTooltipTable()}
                    </div>
                }
            >
                {tooltipTrigger}
            </DefaultTooltip>
        );
    }

    public static polyPhenTooltipTable() {
        return (
            <div>
                <Table table-border-top striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Legend</th>
                            <th>
                                <span
                                    style={{ display: 'inline-block' }}
                                    title="PolyPhen-2"
                                >
                                    <img
                                        height={14}
                                        src={require('./styles/polyPhen-2.png')}
                                        alt="PolyPhen-2"
                                    />
                                    &nbsp;Qualitative prediction
                                </span>
                            </th>
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
                            <td>
                                <b>probably_damaging</b>
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
                            <td>
                                <b>possibly_damaging</b>
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
                            <td>
                                <b>benign</b>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <span>
                                    <i
                                        className={classNames(
                                            functionalImpactColor['unknown']
                                        )}
                                        aria-hidden="true"
                                    ></i>
                                </span>
                            </td>
                            <td>
                                <b>-</b>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }

    public render() {
        let polyPhen2content: JSX.Element = (
            <span className={`${annotationStyles['annotation-item-text']}`} />
        );

        const dataSource = (
            <span className={functionalGroupsStyle['data-source']}>
                PolyPhen-2
            </span>
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
                    <span
                        className={
                            functionalGroupsStyle['functional-prediction-data']
                        }
                    >
                        {this.props.polyPhenPrediction}
                    </span>
                </span>
            );
        } else {
            polyPhen2content = (
                <span
                    className={
                        functionalGroupsStyle['functional-prediction-no-data']
                    }
                >
                    N/A
                </span>
            );
        }

        return (
            <span className={functionalGroupsStyle['data-group-gap']}>
                {this.polyPhenTooltip(
                    <span className={functionalGroupsStyle['link']}>
                        <a
                            href={PolyPhen2.POLYPHEN2_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {dataSource}
                            {polyPhen2content}
                        </a>
                    </span>
                )}
            </span>
        );
    }
}
