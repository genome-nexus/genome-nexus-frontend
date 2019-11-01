import * as React from 'react';
import { observer } from 'mobx-react';
import { Row, Col } from 'react-bootstrap';
import { VariantAnnotationSummary } from 'cbioportal-frontend-commons';
import { MyVariantInfo } from 'cbioportal-frontend-commons/api/generated/GenomeNexusAPIInternal';
import PopulationPrevalence from './PopulationPrevalence';
import './FunctionalGroups.css';

interface IFunctionalGroupsProps {
    annotationInternal?: VariantAnnotationSummary | undefined;
    myVariantInfo?: MyVariantInfo;
}

@observer
class FunctionalGroups extends React.Component<IFunctionalGroupsProps> {
    public render() {
        return (
            <div style={{ paddingTop: '10px', marginLeft: '2%' }}>
                <Row>
                    <Col lg="2" className="group-name">
                        Therapeutic implication:
                    </Col>
                </Row>
                <Row>
                    <Col lg="2" className="group-name">
                        Biological function:
                    </Col>
                </Row>
                <Row>
                    <Col lg="2" className="group-name">
                        Functional prediction:
                    </Col>
                </Row>
                <Row>
                    <Col lg="2" className="group-name">
                        Population prevalence:
                    </Col>
                    <Col className="data-content">
                        <PopulationPrevalence
                            myVariantInfo={this.props.myVariantInfo}
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default FunctionalGroups;
