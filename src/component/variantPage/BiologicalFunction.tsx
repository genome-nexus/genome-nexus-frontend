import * as React from 'react';
import { observer } from 'mobx-react';

import Oncokb from './biologicalFunction/Oncokb';
import { IndicatorQueryResp } from 'cbioportal-frontend-commons/api/generated/OncoKbAPI';

interface IBiologicalFunctionProps {
    oncokb: IndicatorQueryResp | undefined;
}

@observer
class BiologicalFunction extends React.Component<IBiologicalFunctionProps> {
    public render() {
        if (this.props.oncokb) {
            return <Oncokb oncokb={this.props.oncokb}></Oncokb>;
        } else {
            return (
                <span>
                    No data available.
                </span>
            );
        }
    }
}

export default BiologicalFunction;
