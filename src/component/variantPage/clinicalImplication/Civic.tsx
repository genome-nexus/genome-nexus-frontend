import { observer } from 'mobx-react';
import * as React from 'react';

import { ICivicEvidenceSummary, ICivicVariantSummary } from 'cbioportal-utils';
import { DefaultTooltip } from 'cbioportal-frontend-commons';

import {
    ClinicalSignificance,
    Evidence,
    EvidenceType,
} from '../../../util/EvidenceUtils';
import EvidenceSummary from './EvidenceSummary';
import functionalGroupsStyle from '../functionalGroups.module.scss';

interface ICivicProps {
    civic?: ICivicVariantSummary;
}

const DEFAULT_CIVIC_URL = 'https://civicdb.org/';

function getEvidenceUrl(civic: ICivicVariantSummary, evidenceId: number) {
    return `https://civicdb.org/events/genes/${civic.geneId}/summary/variants/${civic.id}/summary/evidence/${evidenceId}/summary#evidence`;
}

const CivicInfo: React.FunctionComponent<{ url: string }> = (props) => {
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
                        CIViC
                    </a>{' '}
                    is a community-edited forum for discussion and
                    interpretation of peer-reviewed publications pertaining to
                    the clinical relevance of variants (or biomarker
                    alterations) in cancer.
                </div>
            }
        >
            <a href={props.url} target="_blank" rel="noopener noreferrer">
                CIViC <i className="fas fa-external-link-alt" />
            </a>
        </DefaultTooltip>
    );
};

function civicEvidenceToEvidence(
    civicEvidence: ICivicEvidenceSummary
): Evidence {
    return {
        ...civicEvidence,
        clinicalSignificance: civicEvidence.clinicalSignificance.includes(
            ClinicalSignificance.Sensitivity
        )
            ? ClinicalSignificance.Sensitivity
            : civicEvidence.clinicalSignificance,
    } as Evidence;
}

@observer
export default class Civic extends React.Component<ICivicProps> {
    get clinicalEvidences() {
        return (
            this.props.civic?.evidences
                .map(civicEvidenceToEvidence)
                .filter(
                    (e) =>
                        e.type === EvidenceType.Predictive ||
                        e.type === EvidenceType.Prognostic ||
                        e.type === EvidenceType.Diagnostic
                ) || []
        );
    }

    public render() {
        const url = this.props.civic ? this.props.civic.url : DEFAULT_CIVIC_URL;

        return (
            <div className={functionalGroupsStyle['functional-group']}>
                <div className={functionalGroupsStyle['data-source']}>
                    <CivicInfo url={url} />
                </div>
                <EvidenceSummary
                    url={url}
                    evidences={this.clinicalEvidences}
                    getEvidenceUrl={this.getEvidenceUrl}
                />
            </div>
        );
    }

    private getEvidenceUrl = (evidence: ICivicEvidenceSummary) => {
        return this.props.civic
            ? getEvidenceUrl(this.props.civic, evidence.id)
            : DEFAULT_CIVIC_URL;
    };
}
