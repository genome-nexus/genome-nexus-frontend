import { observer } from "mobx-react";
import { VariantAnnotationSummary } from "cbioportal-frontend-commons";
import {
    MutationMapper as ReactMutationMapper,
    MutationMapperProps
} from "react-mutation-mapper";
interface IGenomeNexusMutationMapperProps extends MutationMapperProps
{
    variantData?: VariantAnnotationSummary | undefined;
    onInit?: (mutationMapper: GenomeNexusMutationMapper) => void;
}

@observer
class GenomeNexusMutationMapper extends ReactMutationMapper<IGenomeNexusMutationMapperProps>
{
    protected get mutationTableComponent() {
        return null;
    }

    protected get geneSummary() {
        return null;
    }

}

export default GenomeNexusMutationMapper;