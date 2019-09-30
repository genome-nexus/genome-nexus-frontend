import { observer } from "mobx-react";
import { VariantAnnotationSummary } from "cbioportal-frontend-commons";
import {
    MutationMapper as ReactMutationMapper,
    MutationMapperProps
} from "react-mutation-mapper";
import { computed } from "mobx";
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

    @computed
    protected get geneWidth()
    {
        if (this.lollipopPlotGeneX) {
            return this.windowWrapper.size.width * 0.9 - this.lollipopPlotGeneX;
        }
        else {
            return 640;
        }
    }
}

export default GenomeNexusMutationMapper;