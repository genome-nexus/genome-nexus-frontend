import * as React from 'react';
import { observer } from 'mobx-react';

import { IndicatorQueryResp } from 'react-mutation-mapper/dist/model/OncoKb';
import functionalGroupsStyle from './functionalGroups.module.scss';
import { Row } from 'react-bootstrap';
import Oncokb from './biologicalFunction/Oncokb';

interface IBiologicalFunctionProps {
    oncokb: IndicatorQueryResp | undefined;
}

@observer
class BiologicalFunction extends React.Component<IBiologicalFunctionProps> {

    public render() {
        if (this.props.oncokb) {
            return (
                <Row>
                    <Oncokb oncokb={this.props.oncokb}></Oncokb>
                </Row>
            );
        } else {
            return (
                <Row className={functionalGroupsStyle['data-content']}>
                    No data available.
                </Row>
            );
        }
    }
}

export default BiologicalFunction;
