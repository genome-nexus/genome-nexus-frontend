import * as React from 'react';
import { observer } from 'mobx-react';
import { DefaultTooltip } from 'cbioportal-frontend-commons';
import { VariantAnnotation } from 'genome-nexus-ts-api-client';
import { getSingleSignalValue, SignalTable } from 'react-mutation-mapper';
import functionalGroupsStyle from '../functionalGroups.module.scss';
import { variantToMutation } from '../../../util/variantUtils';
import { Mutation, Pathogenicity, RemoteData } from 'cbioportal-utils';
import Toggle from '../../Toggle';
import { action, makeObservable, observable } from 'mobx';
import { Collapse } from 'react-bootstrap';
import _ from 'lodash';

const DEFAULT_SIGNAL_URL = 'https://www.signaldb.org/';

interface ISignalProps {
    variantAnnotation?: VariantAnnotation;
    indexAnnotationsByGenomicLocationPromise: RemoteData<{
        [genomicLocation: string]: VariantAnnotation;
    }>;
}

function getSignalUrl(variantAnnotation: VariantAnnotation | undefined) {
    return variantAnnotation?.variant
        ? `https://www.signaldb.org/variant/${variantAnnotation.variant}`
        : DEFAULT_SIGNAL_URL;
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
                    resource integrates germline and somatic alterations
                    identified by clinical sequencing of active cancer patients.
                    Provided here are pathogenic germline variants and their
                    tumor-specific zygosity changes by gene, lineage, and cancer
                    type in 17,152 prospectively sequenced cancer patients.
                </div>
            }
        >
            <a href={props.url} target="_blank" rel="noopener noreferrer">
                {`SIGNAL `}
                <i className="fas fa-external-link-alt" />
            </a>
        </DefaultTooltip>
    );
};

const FrequencyRow: React.FunctionComponent<{
    mutationType: Pathogenicity;
    frequency: number;
    signalUrl: string;
    mutation: Mutation;
    isSignalTableOpen: boolean;
    onToggleSignalTable: () => void;
    indexAnnotationsByGenomicLocationPromise: RemoteData<{
        [genomicLocation: string]: VariantAnnotation;
    }>;
}> = (props) => {
    return (
        <div>
            <span className={functionalGroupsStyle['data-with-link']}>
                <a
                    href={props.signalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {`${_.upperFirst(props.mutationType)}: `}
                    {props.frequency}
                </a>
            </span>
            <Toggle
                isOpen={props.isSignalTableOpen}
                textWhenOpen="Close table"
                textWhenClosed="Frequency breakdown"
                onToggle={props.onToggleSignalTable}
            />
            <Collapse in={props.isSignalTableOpen}>
                <div className={functionalGroupsStyle['frequency-table']}>
                    <SignalTable
                        mutation={props.mutation}
                        indexedVariantAnnotations={
                            props.indexAnnotationsByGenomicLocationPromise
                        }
                        mutationType={props.mutationType}
                    />
                </div>
            </Collapse>
        </div>
    );
};

@observer
class Signal extends React.Component<ISignalProps> {
    @observable showSignalGermlineTable = false;
    @observable showSignalSomaticTable = false;

    constructor(props: ISignalProps) {
        super(props);
        makeObservable(this);
    }

    public render() {
        const signalUrl = getSignalUrl(this.props.variantAnnotation);
        const mutation = variantToMutation(
            this.props.variantAnnotation?.annotation_summary
        );
        const signalGermlineValue = getSingleSignalValue(
            mutation[0],
            Pathogenicity.GERMLINE,
            this.props.indexAnnotationsByGenomicLocationPromise
        );

        const signalSomaticValue = getSingleSignalValue(
            mutation[0],
            Pathogenicity.SOMATIC,
            this.props.indexAnnotationsByGenomicLocationPromise
        );
        if (
            this.props.indexAnnotationsByGenomicLocationPromise.result &&
            (signalGermlineValue || signalSomaticValue)
        ) {
            const commonProps = {
                signalUrl: signalUrl,
                mutation: mutation[0],
                indexAnnotationsByGenomicLocationPromise:
                    this.props.indexAnnotationsByGenomicLocationPromise,
            };
            return (
                <div className={functionalGroupsStyle['functional-group']}>
                    <div className={functionalGroupsStyle['data-source']}>
                        <SignalInfo url={signalUrl} />
                    </div>
                    <div>
                        {signalGermlineValue && (
                            <FrequencyRow
                                mutationType={Pathogenicity.GERMLINE}
                                frequency={signalGermlineValue}
                                isSignalTableOpen={this.showSignalGermlineTable}
                                onToggleSignalTable={
                                    this.onToggleSignalGermlineTable
                                }
                                {...commonProps}
                            />
                        )}
                        {signalSomaticValue && (
                            <FrequencyRow
                                mutationType={Pathogenicity.SOMATIC}
                                frequency={signalSomaticValue}
                                isSignalTableOpen={this.showSignalSomaticTable}
                                onToggleSignalTable={
                                    this.onToggleSignalSomaticTable
                                }
                                {...commonProps}
                            />
                        )}
                    </div>
                </div>
            );
        } else {
            return (
                <div className={functionalGroupsStyle['functional-group']}>
                    <div className={functionalGroupsStyle['data-source']}>
                        <SignalInfo url={signalUrl} />
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
            );
        }
    }

    @action
    onToggleSignalGermlineTable = () => {
        this.showSignalGermlineTable = !this.showSignalGermlineTable;
    };

    @action
    onToggleSignalSomaticTable = () => {
        this.showSignalSomaticTable = !this.showSignalSomaticTable;
    };
}

export default Signal;
