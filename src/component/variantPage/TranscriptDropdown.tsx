import * as React from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import classNames from 'classnames';
import Select from 'react-select';

import { VariantAnnotationSummary, TranscriptConsequenceSummary } from 'cbioportal-frontend-commons';
import { EnsemblTranscript } from 'react-mutation-mapper/dist/model/EnsemblTranscript';
import { VariantStore } from '../../page/VariantStore';

interface ITranscriptDropdownProps {
    annotation: VariantAnnotationSummary;
    canonicalTranscript: TranscriptConsequenceSummary;
    otherTranscript: TranscriptConsequenceSummary[];
    onTranscriptSelection: (option: {value: string, label: string}) => any;
    activeTranscript?: string;
    transcriptsByTranscriptId?: {[transcriptId: string]: EnsemblTranscript};
    store?: VariantStore;
}

export type Transcript = {
    transcript: string | undefined;
    hugoGeneSymbol: string | undefined;
    hgvsShort: string | undefined;
    refSeq: string | undefined;
    variantClassification: string | undefined;
    hgvsc: string | undefined;
    consequenceTerms: string | undefined;
    exon: string | undefined;
};

@observer
export default class TranscriptDropdown extends React.Component<
    ITranscriptDropdownProps
> {
    public render() {

        const canonicalTranscriptId = this.props.canonicalTranscript && this.props.canonicalTranscript.transcriptId;
        let otherTranscriptIds = this.props.otherTranscript && this.props.otherTranscript.map(transcript => transcript.transcriptId); // TODO remove the canonical id
        
        otherTranscriptIds = _.filter(otherTranscriptIds, (id) => id !== canonicalTranscriptId);
        let otherOptions = otherTranscriptIds.map(
            (transcriptId) => {
                const value = transcriptId;
                const label = transcriptId;
                return {label:label,value:value};
            }
        )
        const options = [
            {
                label: 'Canonical Transcript',
                options: [{value: canonicalTranscriptId, label: canonicalTranscriptId}]
            },
            {
                label: 'Other Transcripts',
                options: otherOptions,                
            }
        ]

        const formatGroupLabel = (data:any) => (
            <div>
              <span>{data.label}</span>
            </div>
        );

        return (
            <span className={classNames("small")}>
                <Select
                    options={options}
                    defaultValue={{ label: canonicalTranscriptId, value: canonicalTranscriptId }}
                    onChange={(option: {value: string, label: string}) => this.props.onTranscriptSelection(option)}
                    formatGroupLabel={formatGroupLabel}
                />
            </span>
        );
    }
}
