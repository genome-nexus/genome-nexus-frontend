import * as React from 'react';
import { observer } from 'mobx-react';
import {
    VariantAnnotationSummary,
    VariantAnnotation,
    MyVariantInfo,
} from 'cbioportal-frontend-commons';
import PopulationPrevalence from './PopulationPrevalence';
import FunctionalPrediction from './FunctionalPrediction';
import BiologicalFunction from './BiologicalFunction';
import functionalGroupsStyle from './functionalGroups.module.scss';
import { IndicatorQueryResp } from 'cbioportal-frontend-commons/api/generated/OncoKbAPI';
import TherapeuticImplication from './TherapeuticImplication';

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
                <table className={'table'}>
                    <tr>
                        <th>Therapeutic implication:</th>
                        <td>
                            <TherapeuticImplication
                                oncokb={this.props.oncokb}
                            />
                        </td>
                    </tr>

                    <tr>
                        <th>Biological function:</th>
                        <td>
                            <BiologicalFunction oncokb={this.props.oncokb} />
                        </td>
                    </tr>

                    <tr>
                        <th>Functional prediction:</th>
                        <td>
                            <FunctionalPrediction
                                variantAnnotation={this.props.variantAnnotation}
                            />
                        </td>
                    </tr>

                    <tr>
                        <th>Population prevalence:</th>
                        <td>
                            <PopulationPrevalence
                                myVariantInfo={this.props.myVariantInfo}
                                chromosome={
                                    this.props.annotationInternal
                                        ? this.props.annotationInternal
                                              .genomicLocation.chromosome
                                        : null
                                }
                            />
                        </td>
                    </tr>
                </table>

                {/*<div className={functionalGroupsStyle['functional-groups']}>*/}
                {/*    <Row>*/}
                {/*        <Col lg="2" className={functionalGroupsStyle['group-name']}>*/}
                {/*            Therapeutic implication:*/}
                {/*        </Col>*/}
                {/*        <Col className={functionalGroupsStyle['group-content']}>*/}
                {/*            <TherapeuticImplication oncokb={this.props.oncokb} />*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*    <Row>*/}
                {/*        <Col lg="2" className={functionalGroupsStyle['group-name']}>*/}
                {/*            Biological function:*/}
                {/*        </Col>*/}
                {/*        <Col className={functionalGroupsStyle['group-content']}>*/}
                {/*            <BiologicalFunction oncokb={this.props.oncokb} />*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*    <Row>*/}
                {/*        <Col lg="2" className={functionalGroupsStyle['group-name']}>*/}
                {/*            Functional prediction:*/}
                {/*        </Col>*/}
                {/*        <Col className={functionalGroupsStyle['group-content']}>*/}
                {/*            <FunctionalPrediction*/}
                {/*                variantAnnotation={this.props.variantAnnotation}*/}
                {/*            />*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*    <Row>*/}
                {/*        <Col lg="2" className={functionalGroupsStyle['group-name']}>*/}
                {/*            Population prevalence:*/}
                {/*        </Col>*/}
                {/*        <Col className={functionalGroupsStyle['group-content']}>*/}
                {/*            <PopulationPrevalence*/}
                {/*                myVariantInfo={this.props.myVariantInfo}*/}
                {/*                chromosome={*/}
                {/*                    this.props.annotationInternal*/}
                {/*                        ? this.props.annotationInternal*/}
                {/*                              .genomicLocation.chromosome*/}
                {/*                        : null*/}
                {/*                }*/}
                {/*            />*/}
                {/*        </Col>*/}
                {/*    </Row>*/}
                {/*</div>*/}
            </div>
        );
    }
}

export default FunctionalGroups;
