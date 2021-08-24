import _ from 'lodash';
import { action, makeObservable, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Collapse } from 'react-bootstrap';
import pluralize from 'pluralize';

import {
    ClinicalSignificance,
    Evidence,
    EvidenceType,
    findUniqueDrugs,
    groupEvidencesBySignificance,
    groupEvidencesByType,
} from '../../../util/EvidenceUtils';
import Toggle from '../../Toggle';
import EvidenceTable from '../EvidenceTable';

import functionalGroupsStyle from '../functionalGroups.module.scss';
import styles from './EvidenceSummary.module.scss';

export interface IEvidenceSummaryProps {
    evidences?: Evidence[];
    url: string;
    getEvidenceUrl?: (column: any) => string;
}

function drugSummaryText(
    drugs: string[],
    info: string,
    maxNumberOfDrugsToList: number = 3
) {
    let summary: string | undefined;

    if (drugs.length > 0) {
        summary = `${info} ${drugs
            .slice(0, maxNumberOfDrugsToList)
            .join(', ')}`;

        if (drugs.length > maxNumberOfDrugsToList) {
            summary = `${summary}, and ${
                drugs.length - maxNumberOfDrugsToList
            } more`;
        }
    }

    return summary;
}

const ClinicalSummary: React.FunctionComponent<{ evidences: Evidence[] }> = (
    props
) => {
    const totalEvidenceCount = props.evidences.length;
    const evidenceInfo = pluralize(
        'clinical implication',
        totalEvidenceCount,
        true
    );

    const evidencesByType = groupEvidencesByType(props.evidences);
    const therapeuticEvidences = evidencesByType[EvidenceType.Predictive] || [];
    const therapeuticEvidencesBySignificance =
        groupEvidencesBySignificance(therapeuticEvidences);
    const sensitiveEvidences =
        therapeuticEvidencesBySignificance[ClinicalSignificance.Sensitivity];
    const resistantEvidences =
        therapeuticEvidencesBySignificance[ClinicalSignificance.Resistance];
    const sensitiveDrugs = findUniqueDrugs(sensitiveEvidences);
    const resistantDrugs = findUniqueDrugs(resistantEvidences);
    const diagnosticEvidences = evidencesByType[EvidenceType.Diagnostic] || [];
    const prognosticEvidences = evidencesByType[EvidenceType.Prognostic] || [];
    const drugs = _.compact([
        drugSummaryText(sensitiveDrugs, 'sensitive to'),
        drugSummaryText(resistantDrugs, 'resistant to'),
    ]);
    const drugBreakdown = drugs.length > 0 ? ` (${drugs.join('; ')})` : '';
    const therapeuticEvidenceInfo =
        therapeuticEvidences.length > 0
            ? `${therapeuticEvidences.length} therapeutic${drugBreakdown}`
            : undefined;
    const diagnosticEvidenceInfo =
        diagnosticEvidences.length > 0
            ? `${diagnosticEvidences.length} diagnostic`
            : undefined;
    const prognosticEvidencesInfo =
        prognosticEvidences.length > 0
            ? `${prognosticEvidences.length} prognostic`
            : undefined;

    const implications = _.compact([
        therapeuticEvidenceInfo,
        diagnosticEvidenceInfo,
        prognosticEvidencesInfo,
    ]);
    const implicationBreakdown =
        implications.length > 0 ? `: ${implications.join(', ')}` : '';

    return (
        <span>
            {evidenceInfo}
            {implicationBreakdown}
        </span>
    );
};

const TableControls: React.FunctionComponent<{
    evidences: Evidence[];
    showTable: boolean;
    onToggle: () => void;
    className?: string;
}> = (props) => {
    return (
        <div className={props.className}>
            <ClinicalSummary evidences={props.evidences} />
            <Toggle
                isOpen={props.showTable}
                textWhenOpen="Close table"
                textWhenClosed="All evidences"
                onToggle={props.onToggle}
            />
        </div>
    );
};

@observer
export default class EvidenceSummary extends React.Component<IEvidenceSummaryProps> {
    @observable showEvidenceTable = false;

    constructor(props: IEvidenceSummaryProps) {
        super(props);
        makeObservable(this);
    }

    render() {
        return this.props.evidences?.length ? (
            <div>
                <div>
                    {!this.showEvidenceTable && (
                        <TableControls
                            evidences={this.props.evidences}
                            showTable={this.showEvidenceTable}
                            onToggle={this.onToggleEvidenceTable}
                        />
                    )}
                </div>

                <Collapse in={this.showEvidenceTable}>
                    <div className={functionalGroupsStyle['data-table']}>
                        <EvidenceTable
                            url={this.props.url}
                            evidences={this.props.evidences}
                            getEvidenceUrl={this.props.getEvidenceUrl}
                            info={
                                this.showEvidenceTable ? (
                                    <TableControls
                                        evidences={this.props.evidences}
                                        showTable={this.showEvidenceTable}
                                        onToggle={this.onToggleEvidenceTable}
                                        className={
                                            styles[
                                                'evidence-table-info-content'
                                            ]
                                        }
                                    />
                                ) : undefined
                            }
                        />
                    </div>
                </Collapse>
            </div>
        ) : (
            <div className={functionalGroupsStyle['data-with-link']}>
                <a
                    href={this.props.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    N/A
                </a>
            </div>
        );
    }

    @action
    onToggleEvidenceTable = () => {
        this.showEvidenceTable = !this.showEvidenceTable;
    };
}
