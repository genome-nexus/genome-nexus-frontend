import * as React from 'react';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import { ICivicVariantIndex } from 'cbioportal-utils';
import {
    VariantAnnotationSummary,
    VariantAnnotation,
    MyVariantInfo,
} from 'genome-nexus-ts-api-client';
import { IndicatorQueryResp } from 'oncokb-ts-api-client';

import PrevalenceInPopulation from './PrevalenceInPopulation';
import FunctionalPrediction from './FunctionalPrediction';
import BiologicalFunction from './BiologicalFunction';
import functionalGroupsStyle from './functionalGroups.module.scss';
import ClinicalImplication from './ClinicalImplication';
import { RemoteData } from 'cbioportal-utils';
import PrevalenceInCancer from './PrevalenceInCancer';
import { CuriousCases } from 'genome-nexus-ts-api-client/dist/generated/GenomeNexusAPIInternal';

interface IFunctionalGroupsProps {
    annotationInternal?: VariantAnnotationSummary;
    myVariantInfo?: MyVariantInfo;
    variantAnnotation?: VariantAnnotation;
    oncokb?: IndicatorQueryResp;
    civic?: ICivicVariantIndex;
    isCanonicalTranscriptSelected: boolean;
    indexAnnotationsByGenomicLocationPromise: RemoteData<{
        [genomicLocation: string]: VariantAnnotation;
    }>;
    curiousCases?: CuriousCases;
}

@observer
class FunctionalGroups extends React.Component<IFunctionalGroupsProps> {
    @computed get clinvar() {
        return this.props.variantAnnotation &&
            this.props.variantAnnotation.clinvar
            ? this.props.variantAnnotation.clinvar.annotation
            : undefined;
    }

    public render() {
        return (
            <div className={functionalGroupsStyle['functional-groups']}>
                <table className={'table'}>
                    <tr>
                        <th>Clinical implication:</th>
                        <td>
                            <ClinicalImplication
                                oncokb={this.props.oncokb}
                                civic={this.props.civic}
                                isCanonicalTranscriptSelected={
                                    this.props.isCanonicalTranscriptSelected
                                }
                            />
                        </td>
                    </tr>

                    <tr>
                        <th>Biological function:</th>
                        <td>
                            <BiologicalFunction
                                oncokb={this.props.oncokb}
                                isCanonicalTranscriptSelected={
                                    this.props.isCanonicalTranscriptSelected
                                }
                                clinvar={this.clinvar}
                                curiousCases={this.props.curiousCases}
                            />
                        </td>
                    </tr>

                    <tr>
                        <th>Functional prediction:</th>
                        <td>
                            <FunctionalPrediction
                                variantAnnotation={this.props.variantAnnotation}
                                isCanonicalTranscriptSelected={
                                    this.props.isCanonicalTranscriptSelected
                                }
                            />
                        </td>
                    </tr>

                    <tr>
                        <th>Prevalence in population:</th>
                        <td>
                            <PrevalenceInPopulation
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
                    <tr>
                        <th>Prevalence in cancer:</th>
                        <td>
                            <PrevalenceInCancer
                                variantAnnotation={this.props.variantAnnotation}
                                indexAnnotationsByGenomicLocationPromise={
                                    this.props
                                        .indexAnnotationsByGenomicLocationPromise
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
