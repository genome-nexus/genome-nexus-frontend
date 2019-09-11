import * as React from 'react';
// import "./TranscriptSummaryTable.css";
import { observer } from "mobx-react";
import _ from "lodash";
import { VariantAnnotationSummary } from "cbioportal-frontend-commons";
import {
    MutationMapper as ReactMutationMapper,
    MutationMapperProps,
    Mutation
} from "react-mutation-mapper";
interface ILollipopPlotProps extends MutationMapperProps
{
    variantData?: VariantAnnotationSummary | undefined;
    onInit?: (mutationMapper: LollipopPlot) => void;
}

@observer
class LollipopPlot extends ReactMutationMapper<ILollipopPlotProps>
{
    private variantToMutation(data: VariantAnnotationSummary | undefined) {
        let mutations = [];
        let mutation: Mutation;
        if(data !== undefined) {
            mutation = {
                "gene": {
                    "hugoGeneSymbol": data.transcriptConsequenceSummary.hugoGeneSymbol,
                    "entrezGeneId": parseInt(data.transcriptConsequenceSummary.entrezGeneId)
                },
                "chromosome": data.genomicLocation.chromosome,
                "startPosition": data.genomicLocation.start,
                "endPosition": data.genomicLocation.end,
                "referenceAllele": data.genomicLocation.referenceAllele,
                "variantAllele": data.genomicLocation.referenceAllele,
                "proteinChange": data.transcriptConsequenceSummary.hgvspShort,
                "variantType": data.transcriptConsequenceSummary.variantClassification,
                "proteinPosEnd": data.transcriptConsequenceSummary.proteinPosition.end,
                "proteinPosStart": data.transcriptConsequenceSummary.proteinPosition.start
                
            }
            mutations.push(mutation);
        }
        return mutations;
    }

    // public render()
    // {
    //     return (
    //         <div>
    //             {/* <ReactMutationMapper data={this.variantToMutation(this.props.variantData!)}/> */}
    //         </div>
    //     );
    // }

}

export default LollipopPlot;