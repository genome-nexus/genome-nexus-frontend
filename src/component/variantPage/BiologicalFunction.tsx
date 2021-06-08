import * as React from 'react';
import { observer } from 'mobx-react';

import Oncokb from './biologicalFunction/Oncokb';
import { IndicatorQueryResp } from 'oncokb-ts-api-client';
import ClinvarInterpretation from './biologicalFunction/ClinvarInterpretation';
import { Clinvar } from 'genome-nexus-ts-api-client';

interface IBiologicalFunctionProps {
    oncokb: IndicatorQueryResp | undefined;
    isCanonicalTranscriptSelected: boolean;
    clinvar?: Clinvar;
}

@observer
class BiologicalFunction extends React.Component<IBiologicalFunctionProps> {
    public render() {
        return (
            <>
                <Oncokb
                    oncokb={this.props.oncokb}
                    isCanonicalTranscriptSelected={
                        this.props.isCanonicalTranscriptSelected
                    }
                />
                <ClinvarInterpretation clinvar={this.props.clinvar} />
            </>
        );
    }
}

export default BiologicalFunction;
