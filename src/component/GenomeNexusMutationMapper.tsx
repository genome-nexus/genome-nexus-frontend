import { observer } from "mobx-react";
import _ from "lodash";
import { VariantAnnotationSummary } from "cbioportal-frontend-commons";
import {
    MutationMapper as ReactMutationMapper,
    MutationMapperProps,
    Mutation
} from "react-mutation-mapper";
interface IGenomeNexusMutationMapperProps extends MutationMapperProps
{
    variantData?: VariantAnnotationSummary | undefined;
    onInit?: (mutationMapper: GenomeNexusMutationMapper) => void;
}

@observer
class GenomeNexusMutationMapper extends ReactMutationMapper<IGenomeNexusMutationMapperProps>
{
    protected get mutationTableComponent()
    {
        return null;
    }

    protected get geneSummary() {
        return null;
    }

    protected lollipopPlotGeneX = 1;

}

export default GenomeNexusMutationMapper;