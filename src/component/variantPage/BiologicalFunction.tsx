import * as React from 'react';
import { observer } from 'mobx-react';

import functionalGroupsStyle from './functionalGroups.module.scss';
import { Row } from 'react-bootstrap';
import Oncokb from './biologicalFunction/Oncokb';
import { IndicatorQueryResp } from 'cbioportal-frontend-commons/api/generated/OncoKbAPI';
import classNames from 'classnames';

interface IBiologicalFunctionProps {
    oncokb: IndicatorQueryResp | undefined;
}

@observer
class BiologicalFunction extends React.Component<IBiologicalFunctionProps> {
    public render() {
        if (this.props.oncokb) {
            return (
                <Row className={functionalGroupsStyle['data-content']}>
                    <Oncokb oncokb={this.props.oncokb}></Oncokb>
                </Row>
            );
        } else {
            return (
                <span
                    className={classNames(
                        functionalGroupsStyle['data-content'],
                        functionalGroupsStyle['no-data']
                    )}
                >
                    No data available.
                </span>
            );
        }
    }
}

export default BiologicalFunction;
