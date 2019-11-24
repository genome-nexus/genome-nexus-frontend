import * as React from 'react';
import { observer } from 'mobx-react';
import { Row, Col } from 'react-bootstrap';
import {
    VariantAnnotationSummary,
    VariantAnnotation,
    MyVariantInfo,
} from 'cbioportal-frontend-commons';
import PopulationPrevalence from './PopulationPrevalence';
import FunctionalPrediction from './FunctionalPrediction';
import BiologicalFunction from './BiologicalFunction';
import { IndicatorQueryResp } from 'react-mutation-mapper/dist/model/OncoKb';
import functionalGroupsStyle from './functionalGroups.module.scss';

interface IFunctionalGroupsProps {
    annotationInternal?: VariantAnnotationSummary;
    myVariantInfo?: MyVariantInfo;
    variantAnnotation?: VariantAnnotation;
    oncokb?: IndicatorQueryResp;
}

@observer
class FunctionalGroups extends React.Component<IFunctionalGroupsProps> {
    public render() {
        return (
            <div className={functionalGroupsStyle['functional-groups']}>
                <Row>
                    <Col lg="2" className={functionalGroupsStyle['group-name']}>
                        Therapeutic implication:
                    </Col>
                </Row>
                <Row>
                    <Col lg="2" className={functionalGroupsStyle['group-name']}>
                        Biological function:
                    </Col>
                    <Col className={functionalGroupsStyle['group-content']}>
                        <BiologicalFunction oncokb={this.props.oncokb} />
                    </Col>
                </Row>
                <Row>
                    <Col lg="2" className={functionalGroupsStyle['group-name']}>
                        Functional prediction:
                    </Col>
                    <Col className={functionalGroupsStyle['group-content']}>
                        <FunctionalPrediction
                            variantAnnotation={this.props.variantAnnotation}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col lg="2" className={functionalGroupsStyle['group-name']}>
                        Population prevalence:
                    </Col>
                    <Col className={functionalGroupsStyle['group-content']}>
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
