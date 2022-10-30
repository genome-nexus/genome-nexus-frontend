import { DefaultTooltip } from 'cbioportal-frontend-commons';
import { observer } from 'mobx-react';
import * as React from 'react';
import functionalGroupsStyle from '../functionalGroups.module.scss';

export declare type RevisedProteinEffectRecord = {
    revisedProteinEffect: string;
    variantClassification: string;
    variant: string;
};

export declare type VUE = {
    comment: string;
    context: string;
    referenceText: string;
    pubmedIds: Array<number>;
    revisedProteinEffects: Array<RevisedProteinEffectRecord>;
};

interface IReVUEProps {
    vue?: VUE;
}

const ReVUEContent: React.FunctionComponent<{
    vue?: VUE;
}> = (props) => {
    return props.vue ? (
        <span>
            {props.vue.comment}{' '}
            <a
                href={`https://pubmed.ncbi.nlm.nih.gov/${props.vue.pubmedIds[0]}/`}
                rel="noopener noreferrer"
                target="_blank"
            >
                ({props.vue.referenceText})
            </a>
        </span>
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
