import { DefaultTooltip } from 'cbioportal-frontend-commons';
import { observer } from 'mobx-react';
import * as React from 'react';
import functionalGroupsStyle from '../functionalGroups.module.scss';

export declare type VUE = {
    'comment': string;
    'context': string;
    'referenceText': string;
    'pubmedIds': Array<number>;
    'revisedProteinEffects': Array<{
        'revisedProteinEffect': string;  
        'variantClassification': string;
        'variant': string;
    }>
};

interface ICuriousCaseProps {
    curiousCases?: VUE;
}

const CuriousCaseContent: React.FunctionComponent<{
    curiousCases?: VUE;
}> = (props) => {
    return props.curiousCases ? (
        <span>
            {props.curiousCases.comment}{' '}
            <a href={`https://pubmed.ncbi.nlm.nih.gov/${props.curiousCases.pubmedIds[0]}/`} rel="noopener noreferrer" target="_blank">({props.curiousCases.referenceText})</a>
        </span>
    ) : (
        <span>NA</span>
    );
};

@observer
export default class CuriousCase extends React.Component<ICuriousCaseProps> {
    public render() {
        return (
            <div className={functionalGroupsStyle['functional-group']}>
                <div className={functionalGroupsStyle['data-source']}>
                    <DefaultTooltip
                        placement="top"
                        overlay={<div>Repository of Variants with Unexpected Effects</div>}
                    >
                        <a href={'https://www.cancerrevue.org/'}>reVUE <i className="fa fa-external-link" /></a>
                    </DefaultTooltip>
                </div>
                <CuriousCaseContent curiousCases={this.props.curiousCases} />
            </div>
        );
    }
}
