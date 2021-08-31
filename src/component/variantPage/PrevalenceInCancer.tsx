import * as React from 'react';
import { observer } from 'mobx-react';
import { VariantAnnotation } from 'genome-nexus-ts-api-client';
import Signal from './prevalenceInCancer/Signal';
import { RemoteData } from 'cbioportal-utils';

interface IPrevalenceInCancerProps {
    variantAnnotation?: VariantAnnotation;
    indexAnnotationsByGenomicLocationPromise: RemoteData<{
        [genomicLocation: string]: VariantAnnotation;
    }>;
}

@observer
class PrevalenceInCancer extends React.Component<IPrevalenceInCancerProps> {
    public render() {
        return (
            <Signal
                variantAnnotation={this.props.variantAnnotation}
                indexAnnotationsByGenomicLocationPromise={
                    this.props.indexAnnotationsByGenomicLocationPromise
                }
            />
        );
    }
}

export default PrevalenceInCancer;
