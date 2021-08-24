import * as React from 'react';
import { observer } from 'mobx-react';
import { MyVariantInfo } from 'genome-nexus-ts-api-client';

import Separator from '../Separator';
import Gnomad from './populationPrevalence/Gnomad';
import Dbsnp from './populationPrevalence/Dbsnp';

interface IPopulationPrevalenceProps {
    myVariantInfo: MyVariantInfo | undefined;
    chromosome: string | null;
}

@observer
class PopulationPrevalence extends React.Component<IPopulationPrevalenceProps> {
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

export default PopulationPrevalence;
