// import { override } from 'mobx';
import { observer } from 'mobx-react';
import { VariantAnnotationSummary } from 'genome-nexus-ts-api-client';
import {
    MutationMapper as ReactMutationMapper,
    MutationMapperProps,
} from 'react-mutation-mapper';
interface IGenomeNexusMutationMapperProps extends MutationMapperProps {
    variantData?: VariantAnnotationSummary | undefined;
    onInit?: (mutationMapper: GenomeNexusMutationMapper) => void;
}

@observer
class GenomeNexusMutationMapper extends ReactMutationMapper<IGenomeNexusMutationMapperProps> {
    protected get mutationTableComponent() {
        return null;
    }

    // @override
    protected get geneWidth() {
        if (this.lollipopPlotGeneX) {
            if (this.windowWrapper.size.width >= 1391) {
                return 1220;
            } else {
                return (
                    this.windowWrapper.size.width * 0.93 -
                    this.lollipopPlotGeneX
                );
            }
        } else {
            return 640;
        }
    }
}

export default GenomeNexusMutationMapper;
