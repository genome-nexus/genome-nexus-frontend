import * as React from 'react';
import { observer } from 'mobx-react';
import classNames from 'classnames';
import { IndicatorQueryResp } from 'react-mutation-mapper/dist/model/OncoKb';

import BiologicalFunctionStyles from './BiologicalFunction.module.scss';
import './FunctionalGroups';
import { DefaultTooltip } from 'cbioportal-frontend-commons';

interface IBiologicalFunctionProps {
    oncokb: IndicatorQueryResp | undefined;
}

export enum ONCOGENICITY {
    ONCOGENIC = 'Oncogenic',
    LIKELY_ONCOGENIC = 'Likely Oncogenic',
    PREDICTED_ONCOGENIC = 'Predicted Oncogenic',
    NEUTRAL = 'Neutral',
    LIKELY_NEUTRAL = 'Likely Neutral',
    INCONCLUSIVE = 'Inconclusive',
    VUS = 'vus',
    UNKNOWN = 'Unknown',
}

export const ONCOGENICITY_CLASS_NAMES: { [oncogenic: string]: string } = {
    [ONCOGENICITY.ONCOGENIC]: 'oncogenic',
    [ONCOGENICITY.LIKELY_ONCOGENIC]: 'oncogenic',
    [ONCOGENICITY.PREDICTED_ONCOGENIC]: 'oncogenic',
    [ONCOGENICITY.NEUTRAL]: 'neutral',
    [ONCOGENICITY.LIKELY_NEUTRAL]: 'neutral',
    [ONCOGENICITY.INCONCLUSIVE]: 'inconclusive',
    [ONCOGENICITY.VUS]: 'vus',
    [ONCOGENICITY.UNKNOWN]: 'unknown',
};

@observer
class BiologicalFunction extends React.Component<IBiologicalFunctionProps> {
    public oncogenicity(oncokb: IndicatorQueryResp) {
        // TODO do we need to check the ""
        if (oncokb.oncogenic && oncokb.oncogenic !== '') {
            return (
                <span
                    className={classNames(
                        BiologicalFunctionStyles[
                            `${ONCOGENICITY_CLASS_NAMES[oncokb.oncogenic]}`
                        ]
                    )}
                >
                    {oncokb.oncogenic}
                </span>
            );
        } else {
            return <span className="data-content">N/A</span>;
        }
    }
    public oncokbTooltip() {
        return (
            <DefaultTooltip
                placement="top"
                overlay={
                    <span>
                        <a
                            href={'https://www.oncokb.org/'}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            OncoKB
                        </a>{' '}
                        is a precision oncology knowledge base and contains
                        <br />
                        information about the effects and treatment implications
                        <br />
                        of specific cancer gene alterations. <br />
                    </span>
                }
            >
                <span>[OncoKB]</span>
            </DefaultTooltip>
        );
    }

    public mutationEffect(oncokb: IndicatorQueryResp) {
        if (oncokb.mutationEffect && oncokb.mutationEffect.knownEffect !== '') {
            return (
                <span
                    className={classNames(
                        BiologicalFunctionStyles['mutation-effect']
                    )}
                >
                    {oncokb.mutationEffect.knownEffect}
                </span>
            );
        } else {
            return <span className="data-content">N/A</span>;
        }
    }
    public render() {
        if (this.props.oncokb) {
            return (
                <div>
                    <span className="data-scouce">{this.oncokbTooltip()}</span>
                    {this.mutationEffect(this.props.oncokb)}
                    {this.oncogenicity(this.props.oncokb)}
                </div>
            );
        } else {
            return <span className="data-content">N/A</span>;
        }
    }
}

export default BiologicalFunction;
