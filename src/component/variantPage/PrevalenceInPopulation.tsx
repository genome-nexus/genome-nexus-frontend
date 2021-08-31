import * as React from 'react';
import { observer } from 'mobx-react';
import { MyVariantInfo } from 'genome-nexus-ts-api-client';

import Separator from '../Separator';
import Gnomad from './prevalenceInPopulation/Gnomad';
import Dbsnp from './prevalenceInPopulation/Dbsnp';

interface IPrevalenceInPopulationProps {
    myVariantInfo: MyVariantInfo | undefined;
    chromosome: string | null;
}

@observer
class PrevalenceInPopulation extends React.Component<IPrevalenceInPopulationProps> {
    public render() {
        return (
            <div>
                <Gnomad
                    myVariantInfo={this.props.myVariantInfo}
                    chromosome={this.props.chromosome}
                />
                <Separator />
                <Dbsnp myVariantInfo={this.props.myVariantInfo} />
            </div>
        );
    }
}

export default PrevalenceInPopulation;
