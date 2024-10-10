import * as React from 'react';
import { observer } from 'mobx-react';
import {
    VariantAnnotation,
    MutationAssessor as MutationAssessorData,
} from 'genome-nexus-ts-api-client';
import MutationAssessor from './functionalPrediction/MutationAssesor';
import Sift from './functionalPrediction/Sift';
import PolyPhen2 from './functionalPrediction/PolyPhen2';
import { SHOW_MUTATION_ASSESSOR } from '../../config/configDefaults';
import Separator from '../Separator';
import { GENOME_BUILD } from '../../util/SearchUtils';

// Most of this component comes from cBioPortal-frontend

interface IFunctionalPredictionProps {
    variantAnnotation?: VariantAnnotation;
    isCanonicalTranscriptSelected: boolean;
    genomeBuild?: string;
}

interface IFunctionalImpactData {
    mutationAssessor: MutationAssessorData | undefined;
    siftScore: number | undefined;
    siftPrediction: string | undefined;
    polyPhenScore: number | undefined;
    polyPhenPrediction: string | undefined;
}

@observer
class FunctionalPrediction extends React.Component<IFunctionalPredictionProps> {
    public getData(
        genomeNexusData: VariantAnnotation | undefined
    ): IFunctionalImpactData {
        const mutationAssessor = genomeNexusData?.mutation_assessor;
        const siftScore =
            genomeNexusData &&
            genomeNexusData.transcript_consequences &&
            genomeNexusData.transcript_consequences[0].sift_score;
        const siftPrediction =
            genomeNexusData &&
            genomeNexusData.transcript_consequences &&
            genomeNexusData.transcript_consequences[0].sift_prediction;
        const polyPhenScore =
            genomeNexusData &&
            genomeNexusData.transcript_consequences &&
            genomeNexusData.transcript_consequences[0].polyphen_score;
        const polyPhenPrediction =
            genomeNexusData &&
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
        // Mutation Assessor only available in grch37
        const shouldShowMutationAssessor =
            SHOW_MUTATION_ASSESSOR &&
            this.props.genomeBuild === GENOME_BUILD.GRCh37;
        return (
            <div>
                <PolyPhen2
                    polyPhenScore={data.polyPhenScore}
                    polyPhenPrediction={data.polyPhenPrediction}
                />
                <Separator />
                {shouldShowMutationAssessor && (
                    <>
                        <MutationAssessor
                            mutationAssessor={data.mutationAssessor}
                            isCanonicalTranscriptSelected={
                                this.props.isCanonicalTranscriptSelected
                            }
                        />
                        <Separator />
                    </>
                )}
                <Sift
                    siftScore={data.siftScore}
                    siftPrediction={data.siftPrediction}
                />
            </div>
        );
    }
}

export default FunctionalPrediction;
