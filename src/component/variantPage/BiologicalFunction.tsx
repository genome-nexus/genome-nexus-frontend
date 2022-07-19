import * as React from 'react';
import { observer } from 'mobx-react';

import { Clinvar } from 'genome-nexus-ts-api-client';
import { IndicatorQueryResp } from 'oncokb-ts-api-client';

import Separator from '../Separator';
import Oncokb from './biologicalFunction/Oncokb';
import ClinvarInterpretation from './biologicalFunction/ClinvarInterpretation';
import CuriousCase, { VUE } from './biologicalFunction/CuriousCase';

interface IBiologicalFunctionProps {
    oncokb: IndicatorQueryResp | undefined;
    isCanonicalTranscriptSelected: boolean;
    clinvar?: Clinvar;
    curiousCases?: VUE;
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
                <Separator />
                <ClinvarInterpretation
                    clinvar={this.props.clinvar}
                    isCanonicalTranscriptSelected={
                        this.props.isCanonicalTranscriptSelected
                    }
                />
                <Separator />
                <CuriousCase curiousCases={this.props.curiousCases} />
            </>
        );
    }
}

export default BiologicalFunction;
