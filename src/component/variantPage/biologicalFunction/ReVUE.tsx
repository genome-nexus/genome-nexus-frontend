import { DefaultTooltip } from 'cbioportal-frontend-commons';
import { Vues } from 'genome-nexus-ts-api-client';
import { observer } from 'mobx-react';
import * as React from 'react';
import functionalGroupsStyle from '../functionalGroups.module.scss';

interface IReVUEProps {
    vue?: Vues;
}

export const ReVUEContent: React.FunctionComponent<IReVUEProps> = (props) => {
    return props.vue ? (
        <div>
            <div>
                Predicted Effect by{' '}
                <a
                    href="https://useast.ensembl.org/info/docs/tools/vep/index.html"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    VEP
                </a>
                : <strong>{props.vue.defaultEffect}</strong>
            </div>
            <div>
                Revised Protein Effect by{' '}
                <a
                    href="https://cancerrevue.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    reVUE
                </a>{' '}
                (
                {props.vue.references.map((reference, index) => (
                    <React.Fragment key={reference.pubmedId}>
                        {index > 0 && ', '}
                        <a
                            href={`https://pubmed.ncbi.nlm.nih.gov/${reference.pubmedId}/`}
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            {reference.referenceText}
                        </a>
                    </React.Fragment>
                ))}
                ):{' '}
                <strong>
                    {props.vue.revisedVariantClassificationStandard}
                </strong>
            </div>
        </div>
    ) : (
        <span>NA</span>
    );
};

@observer
export default class ReVUE extends React.Component<IReVUEProps> {
    public render() {
        return (
            <div className={functionalGroupsStyle['functional-group']}>
                <div className={functionalGroupsStyle['data-source']}>
                    <DefaultTooltip
                        placement="top"
                        overlay={
                            <div>
                                Repository for Variants with Unexpected Effects
                            </div>
                        }
                    >
                        <a
                            href={'https://www.cancerrevue.org/'}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            reVUE <i className="fa fa-external-link" />
                        </a>
                    </DefaultTooltip>
                </div>
                <ReVUEContent vue={this.props.vue} />
            </div>
        );
    }
}
