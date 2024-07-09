import * as React from 'react';
import classNames from 'classnames';
import { DefaultTooltip } from 'cbioportal-frontend-commons';
import { action, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import { Collapse, Table } from 'react-bootstrap';

import functionalImpactColor from './styles/functionalImpactTooltip.module.scss';
import functionalGroupsStyle from '../functionalGroups.module.scss';

// Most of this component comes from cBioPortal-frontend

export interface IAlphamissenseProps {
    amClass?: string;
    amPathogenicityScore?: number;
}

const ALPHAMISSENSE_URL = 'https://www.science.org/doi/10.1126/science.adg7492';

const AlphamissenseInfo: React.FunctionComponent = () => {
    return (
        <div>
            <a href={ALPHAMISSENSE_URL} target="_blank" rel="noopener noreferrer">
                AlphaMissense
            </a>{' '}
            This is AlphaMissense information
        </div>
    );
};

const AlphamissenseLegend: React.FunctionComponent = () => {
    return (
        <div style={{ minWidth: 450 }}>
            <Table table-border-top striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Legend</th>
                        <th>
                            <span
                                style={{ display: 'inline-block' }}
                                title="AlphaMissense"
                            >
                                <img
                                    height={14}
                                    src={require('./styles/siftFunnel.png')}
                                    alt="AlphaMissense"
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
                            <b>deleterious</b>
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
                            <b>deleterious_low_confidence</b>
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
                            <b>tolerated_low_confidence</b>
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
                            <b>tolerated</b>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </div>
    );
};

const AlphamissenseValue: React.FunctionComponent<IAlphamissenseProps> = (props) => {
    return props.amClass ? (
        <div>
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
export default class AlphaMissense extends React.Component<IAlphamissenseProps, {}> {
    @observable showDetails = false;

    constructor(props: IAlphamissenseProps) {
        super(props);
        makeObservable(this);
    }

    public render() {
        let alphamissenseContent: JSX.Element;

        const dataSource = (
            <>
                AlphaMissense&nbsp;
                <i className="fas fa-external-link-alt" />
            </>
        );

        if (this.props.amClass && this.props.amClass.length > 0) {
            alphamissenseContent = <span>
                <p>Pathogenicity:{this.props.amClass} </p> <p>Pathogenicity Score:{this.props.amPathogenicityScore}</p> </span>;
        } else {
            alphamissenseContent = <span> N/A </span>;
        }

        return (
            <div className={functionalGroupsStyle['functional-group']}>
                <div className={functionalGroupsStyle['data-source']}>
                    <DefaultTooltip
                        placement="top"
                        overlay={
                            <div style={{ maxWidth: 450 }}>
                                <AlphamissenseInfo />
                            </div>
                        }
                    >
                        <a
                            href={ALPHAMISSENSE_URL}
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
                            href={ALPHAMISSENSE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {alphamissenseContent}

                        </a>
                    </span>
                    <Collapse in={this.showDetails}>
                        <div className="pt-2">
                            <AlphamissenseValue
                                amClass={this.props.amClass}
                                amPathogenicityScore={this.props.amPathogenicityScore}
                            />
                            <br />
                            <AlphamissenseLegend />
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
