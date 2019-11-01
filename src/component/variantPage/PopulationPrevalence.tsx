import * as React from 'react';
import './FunctionalGroups';
import { observer } from 'mobx-react';
import { Row, Col } from 'react-bootstrap';
import { MyVariantInfo } from 'cbioportal-frontend-commons';

import { GnomadFrequency } from 'react-mutation-mapper';

interface IPopulationPrevalenceProps {
    myVariantInfo: MyVariantInfo | undefined;
}

@observer
class PopulationPrevalence extends React.Component<IPopulationPrevalenceProps> {
    private gnomadData() {
        if (this.props.myVariantInfo) {
            return <GnomadFrequency myVariantInfo={this.props.myVariantInfo} />;
        } else {
            return 'N/A';
        }
    }

    public render() {
        return (
            <Row>
                <Col lg="2">
                    <span className="gnomad">{this.gnomadData()}</span>
                    <span className="data-scouce">&nbsp;[gnomAD]</span>
                </Col>
            </Row>
        );
    }
}

export default PopulationPrevalence;
