import _ from 'lodash';
import * as React from 'react';
import { observer } from 'mobx-react';

import { IndicatorQueryResp } from 'oncokb-ts-api-client';
import { ICivicVariantIndex, ICivicVariantSummary } from 'cbioportal-utils';

import OncoKb from './clinicalImplication/OncoKb';
import Civic from './clinicalImplication/Civic';
import Separator from '../Separator';

interface IClinicalImplicationProps {
    oncokb: IndicatorQueryResp | undefined;
    civic?: ICivicVariantIndex;
    isCanonicalTranscriptSelected: boolean;
}

@observer
class ClinicalImplication extends React.Component<IClinicalImplicationProps> {
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
                <Separator />
                <Civic
                    civic={this.civicVariant}
                    isCanonicalTranscriptSelected={
                        this.props.isCanonicalTranscriptSelected
                    }
                />
            </>
        );
    }
}

export default ClinicalImplication;
