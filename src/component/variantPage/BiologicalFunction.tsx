import * as React from 'react';
import { observer } from 'mobx-react';

import { Clinvar } from 'genome-nexus-ts-api-client';
import { IndicatorQueryResp } from 'oncokb-ts-api-client';

import Separator from '../Separator';
import Oncokb from './biologicalFunction/Oncokb';
import ClinvarInterpretation from './biologicalFunction/ClinvarInterpretation';
import CuriousCase from './biologicalFunction/CuriousCase';
import { CuriousCases } from 'genome-nexus-ts-api-client/dist/generated/GenomeNexusAPIInternal';

interface IBiologicalFunctionProps {
    oncokb: IndicatorQueryResp | undefined;
    isCanonicalTranscriptSelected: boolean;
    clinvar?: Clinvar;
    curiousCases?: CuriousCases;
}

@observer
class BiologicalFunction extends React.Component<IBiologicalFunctionProps> {
    public render() {
        // only show curious case when URL has "curious"
        const showCuriousCase =
            window.location.search.split('curious').length > 1 ? true : false;

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
                {showCuriousCase && (
                    <>
                        <Separator />
                        <CuriousCase curiousCases={this.props.curiousCases} />
                    </>
                )}
            </>
        );
    }
}

export default BiologicalFunction;
