import * as React from 'react';
import { observer } from 'mobx-react';
import { Row } from 'react-bootstrap';
import { VariantAnnotation } from 'cbioportal-frontend-commons';
import { MutationAssessor as MutationAssessorData } from 'cbioportal-frontend-commons/api/generated/GenomeNexusAPI';
import MutationAssessor from './functionalPrediction/MutationAssesor';
import Sift from './functionalPrediction/Sift';
import PolyPhen2 from './functionalPrediction/PolyPhen2';
import functionalGroupsStyle from './functionalGroups.module.scss';
import classNames from 'classnames';

// Most of this component comes from cBioPortal-frontend

interface IFunctionalPredictionProps {
    variantAnnotation?: VariantAnnotation;
}

interface IFunctionalImpactData {
    mutationAssessor: MutationAssessorData;
    siftScore: number;
    siftPrediction: string;
    polyPhenScore: number;
    polyPhenPrediction: string;
}

@observer
class FunctionalPrediction extends React.Component<IFunctionalPredictionProps> {
    public getData(
        genomeNexusData: VariantAnnotation | undefined
    ): IFunctionalImpactData | undefined {
        if (!genomeNexusData) {
            return undefined;
        }
        const mutationAssessor =
            genomeNexusData.mutation_assessor &&
            genomeNexusData.mutation_assessor.annotation;
        const siftScore =
            genomeNexusData.transcript_consequences &&
            genomeNexusData.transcript_consequences[0].sift_score;
        const siftPrediction =
            genomeNexusData.transcript_consequences &&
            genomeNexusData.transcript_consequences[0].sift_prediction;
        const polyPhenScore =
            genomeNexusData.transcript_consequences &&
            genomeNexusData.transcript_consequences[0].polyphen_score;
        const polyPhenPrediction =
            genomeNexusData.transcript_consequences &&
            genomeNexusData.transcript_consequences[0].polyphen_prediction;

        return {
            mutationAssessor,
            siftScore,
            siftPrediction,
            polyPhenScore,
            polyPhenPrediction,
        };
    }
    public render() {
        const data = this.getData(this.props.variantAnnotation);
        return data ? (
            <Row className={functionalGroupsStyle['data-content']}>
                <PolyPhen2
                    polyPhenScore={data.polyPhenScore}
                    polyPhenPrediction={data.polyPhenPrediction}
                />
                <MutationAssessor mutationAssessor={data.mutationAssessor} />
                <Sift
                    siftScore={data.siftScore}
                    siftPrediction={data.siftPrediction}
                />
            </Row>
        ) : (
            <span
                className={classNames(
                    functionalGroupsStyle['data-content'],
                    functionalGroupsStyle['no-data']
                )}
            >
                No data available
            </span>
        );
    }
}

export default FunctionalPrediction;
