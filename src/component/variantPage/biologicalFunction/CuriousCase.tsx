import { DefaultTooltip } from 'cbioportal-frontend-commons';
import { CuriousCases } from 'genome-nexus-ts-api-client/dist/generated/GenomeNexusAPIInternal';
import { observer } from 'mobx-react';
import * as React from 'react';
import functionalGroupsStyle from '../functionalGroups.module.scss';

interface ICuriousCaseProps {
    curiousCases?: CuriousCases;
}

const TooltipLinks: React.FunctionComponent<{ pubmedIds: number[] }> = (
    props
) => {
    let tooltipLinks: JSX.Element[] = [];
    props.pubmedIds.forEach((id) => {
        tooltipLinks.push(
            <a
                href={`https://pubmed.ncbi.nlm.nih.gov/${id}/`}
                target="_blank"
                rel="noopener noreferrer"
            >
                {id}
                {`;  `}
            </a>
        );
    });
    return <>{tooltipLinks}</>;
};

// API pull
// const CuriousCaseContent: React.FunctionComponent<{
//     curiousCases?: CuriousCases;
// }> = (props) => {
//     return props.curiousCases ? (
//         <span>
//             {props.curiousCases.comment} {`. Pubmed ids: `}
//             {props.curiousCases.pubmedIds ? (
//                 <TooltipLinks pubmedIds={props.curiousCases.pubmedIds} />
//             ) : (
//                 'NA'
//             )}
//         </span>
//     ) : (
//         <span>NA</span>
//     );
// };

// Hardcode version
const CuriousCaseContent: React.FunctionComponent<{
    curiousCases?: CuriousCases;
}> = (props) => {
    return props.curiousCases ? (
        <span>
            {props.curiousCases.comment} <br />
            {`Pubmed ids: `}
            {props.curiousCases.pubmedIds ? (
                <TooltipLinks pubmedIds={props.curiousCases.pubmedIds} />
            ) : (
                'NA'
            )}
        </span>
    ) : (
        <span>NA</span>
    );
};

//Version to hardcode entire json
// const CuriousCaseContent: React.FunctionComponent<{
//     curiousCases?: CuriousCases;
// }> = (props) => {
//     return props.curiousCases ? (
//         <span>
//             {props.curiousCases.comment} {`. Pubmed ids: `}
//             {props.curiousCases.pubmedIds ? (
//                 <TooltipLinks pubmedIds={props.curiousCases.pubmedIds} />
//             ) : (
//                 'NA'
//             )}
//         </span>
//     ) : (
//         <span>NA</span>
//     );
// };

@observer
export default class CuriousCase extends React.Component<ICuriousCaseProps> {
    public render() {
        return (
            <div className={functionalGroupsStyle['functional-group']}>
                <div className={functionalGroupsStyle['data-source']}>
                    <DefaultTooltip
                        placement="top"
                        overlay={<div>Curated list of splice variants.</div>}
                    >
                        <span
                            className={functionalGroupsStyle['without-linkout']}
                        >
                            Curious Case
                        </span>
                    </DefaultTooltip>
                </div>
                <CuriousCaseContent curiousCases={this.props.curiousCases} />
            </div>
        );
    }
}
