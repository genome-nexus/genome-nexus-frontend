import _ from 'lodash';
import * as React from 'react';
import { observer } from 'mobx-react';

import { IndicatorQueryResp } from 'oncokb-ts-api-client';
import { ICivicVariantIndex, ICivicVariantSummary } from 'cbioportal-utils';

import OncoKb from './therapeuticImplication/OncoKb';
import Civic from './therapeuticImplication/Civic';

interface ITherapeuticImplicationProps {
    oncokb: IndicatorQueryResp | undefined;
    civic?: ICivicVariantIndex;
    isCanonicalTranscriptSelected: boolean;
}

@observer
class TherapeuticImplication extends React.Component<
    ITherapeuticImplicationProps
> {
    get civicVariant(): ICivicVariantSummary | undefined {
        if (this.props.civic) {
            // assuming the index only contains one variant
            return _.values(_.values(this.props.civic)[0])[0];
        } else {
            return undefined;
        }
    }

    public render() {
        return (
            <>
                <OncoKb
                    oncokb={this.props.oncokb}
                    isCanonicalTranscriptSelected={
                        this.props.isCanonicalTranscriptSelected
                    }
                />
                <Civic civic={this.civicVariant} />
            </>
        );
    }
}

export default TherapeuticImplication;
