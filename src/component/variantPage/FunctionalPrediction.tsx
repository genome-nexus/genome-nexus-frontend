import * as React from 'react';
import './FunctionalGroups.css';
import { observer } from 'mobx-react';
import { Row } from 'react-bootstrap';
import { VariantAnnotation } from 'cbioportal-frontend-commons';
import { MutationAssessor as MutationAssessorData } from '../../model/GenomeNexusModel';
import MutationAssessor from './functionalPrediction/MutationAssesor';
import Sift from './functionalPrediction/Sift';
import PolyPhen2 from './functionalPrediction/PolyPhen2';

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
        const siftScore = genomeNexusData.transcript_consequences[0].sift_score;
        const siftPrediction =
            genomeNexusData.transcript_consequences[0].sift_prediction;
        const polyPhenScore =
            genomeNexusData.transcript_consequences[0].polyphen_score;
        const polyPhenPrediction =
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
        return (
            data && (
                <Row className="data-content">
                    <PolyPhen2
                        polyPhenScore={data.polyPhenScore}
                        polyPhenPrediction={data.polyPhenPrediction}
                    />
                    <MutationAssessor
                        mutationAssessor={data.mutationAssessor}
                    />

                    <Sift
                        siftScore={data.siftScore}
                        siftPrediction={data.siftPrediction}
                    />
                </Row>
            )
        );
    }
}

export default FunctionalPrediction;
