import * as React from 'react';
import classNames from 'classnames';
import { DefaultTooltip } from 'cbioportal-frontend-commons';
import { action, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import { Collapse, Table } from 'react-bootstrap';

import Toggle from '../../Toggle';

import functionalImpactColor from './styles/functionalImpactTooltip.module.scss';
import functionalGroupsStyle from '../functionalGroups.module.scss';

// Most of this component comes from cBioPortal-frontend

export interface IPolyPhen2Props {
    polyPhenPrediction?: string; // benign, possibly_damaging, probably_damaging
    polyPhenScore?: number;
}

const POLYPHEN2_URL = 'http://genetics.bwh.harvard.edu/pph2/';

const PolyPhenLegend: React.FunctionComponent = () => {
    return (
        <div style={{ minWidth: 450 }}>
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
                                />
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
                                />
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
                                />
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
                                />
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
};

const PolyPhenInfo: React.FunctionComponent = () => {
    return (
        <div>
            <a href={POLYPHEN2_URL} target="_blank" rel="noopener noreferrer">
                PolyPhen-2
            </a>{' '}
            (Polymorphism Phenotyping v2) is a tool which predicts possible
            impact of an amino acid substitution on the structure and function
            of a human protein using straightforward physical and comparative
            considerations.
        </div>
    );
};

const PolyPhenValue: React.FunctionComponent<IPolyPhen2Props> = (props) => {
    return props.polyPhenPrediction ? (
        <div>
            {(props.polyPhenScore || props.polyPhenScore === 0) && (
                <div>
                    <span className="mr-2">Score</span>
                    <strong>{props.polyPhenScore.toFixed(2)}</strong>
                </div>
            )}
            <div>
                Please refer to the score range{' '}
                <a
                    href="https://useast.ensembl.org/info/genome/variation/prediction/protein_function.html"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    here
                </a>
                .
            </div>
        </div>
    ) : null;
};

@observer
export default class PolyPhen2 extends React.Component<IPolyPhen2Props, {}> {
    @observable showDetails = false;

    constructor(props: IPolyPhen2Props) {
        super(props);
        makeObservable(this);
    }

    public render() {
        let polyPhen2content: JSX.Element;

        const dataSource = (
            <>
                PolyPhen-2&nbsp;
                <i className="fas fa-external-link-alt" />
            </>
        );

        if (
            this.props.polyPhenPrediction &&
            this.props.polyPhenPrediction.length > 0
        ) {
            polyPhen2content = <span>{this.props.polyPhenPrediction}</span>;
        } else {
            polyPhen2content = <span>N/A</span>;
        }

        return (
            <div className={functionalGroupsStyle['functional-group']}>
                <div className={functionalGroupsStyle['data-source']}>
                    <DefaultTooltip
                        placement="top"
                        overlay={
                            <div style={{ maxWidth: 450 }}>
                                <PolyPhenInfo />
                            </div>
                        }
                    >
                        <a
                            href={POLYPHEN2_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {dataSource}
                        </a>
                    </DefaultTooltip>
                </div>
                <div>
                    <span className={functionalGroupsStyle['data-with-link']}>
                        <a
                            href={POLYPHEN2_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {polyPhen2content}
                        </a>
                    </span>
                    <Toggle
                        isOpen={this.showDetails}
                        textWhenOpen="Less"
                        textWhenClosed="More"
                        onToggle={this.onToggleDetails}
                    />
                    <Collapse in={this.showDetails}>
                        <div className="pt-2">
                            <PolyPhenValue
                                polyPhenPrediction={
                                    this.props.polyPhenPrediction
                                }
                                polyPhenScore={this.props.polyPhenScore}
                            />
                            <br />
                            <PolyPhenLegend />
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
