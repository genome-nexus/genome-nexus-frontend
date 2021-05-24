import * as React from 'react';
import { observer } from 'mobx-react';

import Oncokb from './biologicalFunction/Oncokb';
import { IndicatorQueryResp } from 'oncokb-ts-api-client';

interface IBiologicalFunctionProps {
    oncokb: IndicatorQueryResp | undefined;
    isCanonicalTranscriptSelected: boolean;
}

@observer
class BiologicalFunction extends React.Component<IBiologicalFunctionProps> {
    public render() {
        return (
            <Oncokb
                oncokb={this.props.oncokb}
                isCanonicalTranscriptSelected={
                    this.props.isCanonicalTranscriptSelected
                }
            />
        );
    }
}

export default BiologicalFunction;
