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

export interface ISiftProps {
    siftPrediction?: string; // deleterious, deleterious_low_confidence, tolerated, tolerated_low_confidence
    siftScore?: number;
}

const SIFT_URL = 'http://sift.bii.a-star.edu.sg/';

const SiftInfo: React.FunctionComponent = () => {
    return (
        <div>
            <a href={SIFT_URL} target="_blank" rel="noopener noreferrer">
                SIFT
            </a>{' '}
            predicts whether an amino acid substitution affects protein function
            based on sequence homology and the physical properties of amino
            acids. SIFT can be applied to naturally occurring nonsynonymous
            polymorphisms and laboratory-induced missense mutations.
        </div>
    );
};

const SiftLegend: React.FunctionComponent = () => {
    return (
        <div style={{ minWidth: 450 }}>
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

const SiftValue: React.FunctionComponent<ISiftProps> = (props) => {
    return props.siftPrediction ? (
        <div>
            {(props.siftScore || props.siftScore === 0) && (
                <div>
                    <span className="mr-2">Score</span>
                    <strong>{props.siftScore.toFixed(2)}</strong>
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
export default class Sift extends React.Component<ISiftProps, {}> {
    @observable showDetails = false;

    constructor(props: ISiftProps) {
        super(props);
        makeObservable(this);
    }

    public render() {
        let siftContent: JSX.Element;

        const dataSource = (
            <>
                SIFT&nbsp;
                <i className="fas fa-external-link-alt" />
            </>
        );

        if (this.props.siftPrediction && this.props.siftPrediction.length > 0) {
            siftContent = <span>{this.props.siftPrediction}</span>;
        } else {
            siftContent = <span>N/A</span>;
        }

        return (
            <div className={functionalGroupsStyle['functional-group']}>
                <div className={functionalGroupsStyle['data-source']}>
                    <DefaultTooltip
                        placement="top"
                        overlay={
                            <div style={{ maxWidth: 450 }}>
                                <SiftInfo />
                            </div>
                        }
                    >
                        <a
                            href={SIFT_URL}
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
                            href={SIFT_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {siftContent}
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
                            <SiftValue
                                siftPrediction={this.props.siftPrediction}
                                siftScore={this.props.siftScore}
                            />
                            <br />
                            <SiftLegend />
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
