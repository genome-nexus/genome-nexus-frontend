import * as React from 'react';
import { observer } from 'mobx-react';
import { DefaultTooltip } from 'cbioportal-frontend-commons';
import { MyVariantInfo, VariantAnnotation } from 'genome-nexus-ts-api-client';

import Separator from '../Separator';
import Gnomad from './populationPrevalence/Gnomad';
import Dbsnp from './populationPrevalence/Dbsnp';
import Signal from './populationPrevalence/Signal';
import { RemoteData } from 'cbioportal-utils';

const DEFAULT_SIGNAL_URL = 'https://www.signaldb.org/';

interface IPopulationPrevalenceProps {
    myVariantInfo: MyVariantInfo | undefined;
    chromosome: string | null;
    variantAnnotation?: VariantAnnotation;
    variant: string;
    indexAnnotationsByGenomicLocationPromise: RemoteData<{ [genomicLocation: string]: VariantAnnotation }>
}

type Vcf = {
    chrom: string;
    ref: string;
    alt: string;
    pos: number;
};

// function getSignalUrl(varaint: string) {
//     return `https://www.signaldb.org/variant/${varaint}`;
// }

const SignalInfo: React.FunctionComponent<{
    url: string;
}> = (props) => {
    return (
        <DefaultTooltip
            placement="top"
            overlay={
                <div style={{ maxWidth: 350 }}>
                    <a
                        href={props.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        SIGNAL
                    </a>{' '}
                    resource integrates germline and somatic alterations identified by clinical sequencing of active cancer patients. Provided here are pathogenic germline variants and their tumor-specific zygosity changes by gene, lineage, and cancer type in 17,152 prospectively sequenced cancer patients.
                </div>
            }
        >
            <a href={props.url} target="_blank" rel="noopener noreferrer">
                SIGNAL
            </a>
        </DefaultTooltip>
    );
};

@observer
class PopulationPrevalence extends React.Component<IPopulationPrevalenceProps> {
    public render() {
        // const signalUrl = this.props.signalAnnotation?.annotation ? getSignalUrl(this.props.variant) : DEFAULT_SIGNAL_URL;

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
    // private getSignalUrl = (variant: string) => {
    //     return this.props.varaintAnnotation?.signalAnnotation?.annotation
    //         ? getSignalUrl(variant)
    //         : DEFAULT_SIGNAL_URL;
    // };
}

export default PopulationPrevalence;
