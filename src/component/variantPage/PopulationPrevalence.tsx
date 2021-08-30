import * as React from 'react';
import { observer } from 'mobx-react';
import { MyVariantInfo, VariantAnnotation } from 'genome-nexus-ts-api-client';

import Separator from '../Separator';
import Gnomad from './populationPrevalence/Gnomad';
import Dbsnp from './populationPrevalence/Dbsnp';
import Signal from './populationPrevalence/Signal';
import { RemoteData } from 'cbioportal-utils';

interface IPopulationPrevalenceProps {
    myVariantInfo: MyVariantInfo | undefined;
    chromosome: string | null;
    variantAnnotation?: VariantAnnotation;
    variant: string;
    indexAnnotationsByGenomicLocationPromise: RemoteData<{ [genomicLocation: string]: VariantAnnotation }>
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
                <Separator />
                <Signal
                    variantAnnotation={this.props.variantAnnotation}
                    variant={this.props.variant}
                    indexAnnotationsByGenomicLocationPromise={this.props.indexAnnotationsByGenomicLocationPromise}
                />
            </div>
        );
    }
}

export default PopulationPrevalence;
