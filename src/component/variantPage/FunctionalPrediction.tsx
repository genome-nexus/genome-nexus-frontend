import * as React from 'react';
import { observer } from 'mobx-react';
import {
    VariantAnnotation,
    MutationAssessor as MutationAssessorData,
} from 'genome-nexus-ts-api-client';
import MutationAssessor from './functionalPrediction/MutationAssesor';
import Sift from './functionalPrediction/Sift';
import PolyPhen2 from './functionalPrediction/PolyPhen2';
import AlphaMissense from './functionalPrediction/AlphaMissense';
import {
    SHOW_ALPHAMISSENSE,
    SHOW_MUTATION_ASSESSOR,
} from '../../config/configDefaults';
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
    amClass: string | undefined;
    amPathogenicityScore: number | undefined;
}

@observer
class FunctionalPrediction extends React.Component<IFunctionalPredictionProps> {
    public getData(
        genomeNexusData: VariantAnnotation | undefined
    ): IFunctionalImpactData {
        const mutationAssessor =
            genomeNexusData &&
            genomeNexusData.mutation_assessor &&
            genomeNexusData.mutation_assessor.annotation;
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
        const amClass =
            genomeNexusData?.annotation_summary?.transcriptConsequenceSummary
                ?.alphaMissense?.pathogenicity || undefined;
        const amPathogenicityScore =
            genomeNexusData?.annotation_summary?.transcriptConsequenceSummary
                ?.alphaMissense?.score || undefined;
        return {
            amClass,
            amPathogenicityScore,
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
                <Separator />
                {SHOW_ALPHAMISSENSE && (
                    <AlphaMissense
                        amClass={data.amClass}
                        amPathogenicityScore={data.amPathogenicityScore}
                    />
                )}
            </div>
        );
    }
}

export default FunctionalPrediction;
