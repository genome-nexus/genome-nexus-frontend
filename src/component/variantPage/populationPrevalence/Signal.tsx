import * as React from 'react';
import { observer } from 'mobx-react';
import { DefaultTooltip } from 'cbioportal-frontend-commons';
import { VariantAnnotation } from 'genome-nexus-ts-api-client';
import { SignalTable } from 'react-mutation-mapper';
import functionalGroupsStyle from '../functionalGroups.module.scss';
import { variantToMutation } from '../../../util/variantUtils';
import { RemoteData } from 'cbioportal-utils';
import { getSignalValue } from 'react-mutation-mapper';
import Toggle from '../../Toggle';
import { action, makeObservable, observable } from 'mobx';
import { Collapse } from 'react-bootstrap';

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
    @observable showSignalTable = false;

    constructor(props: ISignalProps) {
        super(props);
        makeObservable(this);
    }

    public render() {
        const signalUrl = this.props.variantAnnotation?.signalAnnotation?.annotation ? getSignalUrl(this.props.variant) : DEFAULT_SIGNAL_URL;
        const mutation = variantToMutation(this.props.variantAnnotation?.annotation_summary);
        const signalValue = getSignalValue(mutation[0], this.props.indexAnnotationsByGenomicLocationPromise);
        if (this.props.indexAnnotationsByGenomicLocationPromise.result && signalValue !== null) {
                return (
                    <div className={functionalGroupsStyle['functional-group']}>
                        <div className={functionalGroupsStyle['data-source']}>
                            <SignalInfo
                                url={signalUrl}
                            />
                        </div>
                        <div>
                            <span
                                className={functionalGroupsStyle['data-with-link']}
                            >
                                <a
                                    href={signalUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {signalValue}
                                </a>
                            </span>
                            <Toggle
                                isOpen={this.showSignalTable}
                                textWhenOpen="Close table"
                                textWhenClosed="Expand Frequency Table"
                                onToggle={this.onToggleSignalTable}
                            />
                            <Collapse in={this.showSignalTable}>
                                <div
                                    className={
                                        functionalGroupsStyle['frequency-table']
                                    }
                                >
                                    <SignalTable
                                        mutation={mutation[0]}
                                        indexedVariantAnnotations={this.props.indexAnnotationsByGenomicLocationPromise}
                                    />
                                </div>
                            </Collapse>
                        </div>
                    </div>
                );
        } else {
            return (
                <div className={functionalGroupsStyle['functional-group']}>
                    <div className={functionalGroupsStyle['data-source']}>
                        <SignalInfo
                                url={signalUrl}
                            />
                    </div>
                    <div className={functionalGroupsStyle['data-with-link']}>
                        <a
                            href={signalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            N/A
                        </a>
                    </div>
                </div>
            )
        }
    }

    @action
    onToggleSignalTable = () => {
        this.showSignalTable = !this.showSignalTable;
    };
}

export default Signal;
