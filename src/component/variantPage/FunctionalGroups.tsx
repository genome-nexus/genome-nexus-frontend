import * as React from 'react';
import { observer } from 'mobx-react';
import { Row, Col } from 'react-bootstrap';
import {
    VariantAnnotationSummary,
    VariantAnnotation,
} from 'cbioportal-frontend-commons';
import { MyVariantInfo } from 'cbioportal-frontend-commons/api/generated/GenomeNexusAPIInternal';
import PopulationPrevalence from './PopulationPrevalence';
import './FunctionalGroups.css';
import FunctionalPrediction from './FunctionalPrediction';

interface IFunctionalGroupsProps {
    annotationInternal?: VariantAnnotationSummary;
    myVariantInfo?: MyVariantInfo;
    variantAnnotation?: VariantAnnotation;
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
                    <Col>
                        <FunctionalPrediction
                            variantAnnotation={this.props.variantAnnotation}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col lg="2" className="group-name">
                        Population prevalence:
                    </Col>
                    <Col>
                        <PopulationPrevalence
                            myVariantInfo={this.props.myVariantInfo}
                            chromosome={
                                this.props.annotationInternal
                                    ? this.props.annotationInternal
                                          .genomicLocation.chromosome
                                    : null
                            }
                        />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default FunctionalGroups;
