import * as React from 'react';
import { DefaultTooltip } from 'cbioportal-frontend-commons';
import { makeObservable } from 'mobx';
import functionalGroupsStyle from '../functionalGroups.module.scss';

export interface IAlphaMissenseProps {
    amClass?: string;
    amPathogenicityScore?: number;
}

const ALPHAMISSENSE_URL = 'https://www.science.org/doi/10.1126/science.adg7492';

const AlphaMissenseInfo: React.FunctionComponent = () => {
    return (
        <div>
            <a
                href={ALPHAMISSENSE_URL}
                target="_blank"
                rel="noopener noreferrer"
            >
                AlphaMissense
            </a>{' '}
            uses deep learning to assess the pathogenicity of missense variants,
            indicating how they might affect gene function and contribute to
            disease.
            <div>
                <b>Scores:</b>
                <ul>
                    <li>
                        <b>Pathogenic:</b> Score &gt; 0.564 – likely to cause
                        disease.
                    </li>
                    <li>
                        <b>Benign:</b> Score &lt; 0.34 – unlikely to cause
                        disease.
                    </li>
                    <li>
                        <b>Ambiguous:</b> Score between 0.34 and 0.564 – unclear
                        impact; insufficient data.
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default class AlphaMissense extends React.Component<
    IAlphaMissenseProps,
    {}
> {
    constructor(props: IAlphaMissenseProps) {
        super(props);
        makeObservable(this);
    }

    public render() {
        let alphaMissenseContent: JSX.Element;

        const dataSource = (
            <>
                AlphaMissense&nbsp;
                <i className="fas fa-external-link-alt" />
            </>
        );
        if (this.props.amClass) {
            alphaMissenseContent = (
                <p>
                    {this.props.amClass + ' '}({this.props.amPathogenicityScore}
                    )
                </p>
            );
        } else {
            alphaMissenseContent = <span> N/A </span>;
        }

        return (
            <div className={functionalGroupsStyle['functional-group']}>
                <div className={functionalGroupsStyle['data-source']}>
                    <DefaultTooltip
                        placement="top"
                        overlay={
                            <div style={{ maxWidth: 450 }}>
                                <AlphaMissenseInfo />
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
                            {alphaMissenseContent}
                        </a>
                    </span>
                </div>
            </div>
        );
    }
}
