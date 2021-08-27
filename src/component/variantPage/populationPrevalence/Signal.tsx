import * as React from 'react';
import { observer } from 'mobx-react';
import { DefaultTooltip } from 'cbioportal-frontend-commons';
import { VariantAnnotation } from 'genome-nexus-ts-api-client';
import {Signal as SignalData} from 'react-mutation-mapper';
import functionalGroupsStyle from '../functionalGroups.module.scss';
import { variantToMutation } from '../../../util/variantUtils';
import { indexAnnotationsByGenomicLocation, RemoteData } from 'cbioportal-utils';
import { getSignalValue } from 'react-mutation-mapper';

const DEFAULT_SIGNAL_URL = 'https://www.signaldb.org/';

interface ISignalProps {
    variantAnnotation?: VariantAnnotation;
    variant: string;
    indexAnnotationsByGenomicLocationPromise: RemoteData<{ [genomicLocation: string]: VariantAnnotation }>
}

function getSignalUrl(varaint: string) {
    return `https://www.signaldb.org/variant/${varaint}`;
}

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
class Signal extends React.Component<ISignalProps> {
    public render() {
        if (this.props.indexAnnotationsByGenomicLocationPromise.result) {
            const signalUrl = this.props.variantAnnotation?.signalAnnotation?.annotation ? getSignalUrl(this.props.variant) : DEFAULT_SIGNAL_URL;
            const mutation = variantToMutation(this.props.variantAnnotation?.annotation_summary);
             // todo: need to add if to check this.props.variantAnnotation
            // let index = indexAnnotationsByGenomicLocation([this.props.variantAnnotation!]);
            // this.props.variantAnnotation?.originalVariantQuery
            console.log(mutation[0]);
            console.log(this.props.indexAnnotationsByGenomicLocationPromise);
            
            console.log(getSignalValue(mutation[0], this.props.indexAnnotationsByGenomicLocationPromise));
            
            return (
                <div className={functionalGroupsStyle['functional-group']}>
                    <div className={functionalGroupsStyle['data-source']}>
                        <SignalInfo
                            url={signalUrl}
                        />
                    </div>
                    {/* <MutationTumorTypeFrequencyTable></MutationTumorTypeFrequencyTable> */}
                    {getSignalValue(mutation[0], this.props.indexAnnotationsByGenomicLocationPromise)}
                    {/* <SignalData mutation={mutation[0]} indexedVariantAnnotations={this.props.indexAnnotationsByGenomicLocationPromise}/> */}
                </div>
            );
        } else {
            return null;
        }
    }
    private getSignalUrl = (variant: string) => {
        return this.props.variantAnnotation?.signalAnnotation?.annotation
            ? getSignalUrl(variant)
            : DEFAULT_SIGNAL_URL;
    };
}

export default Signal;
