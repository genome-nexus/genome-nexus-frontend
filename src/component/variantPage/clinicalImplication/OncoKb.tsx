import * as React from 'react';
import { observer } from 'mobx-react';
// TODO remove the IndicatorQueryTreatment import after exposed in cbioportal-frontend-commons
import {
    Implication,
    IndicatorQueryResp,
    IndicatorQueryTreatment,
} from 'oncokb-ts-api-client';
import { DefaultTooltip } from 'cbioportal-frontend-commons';
import { getTumorTypeNameWithExclusionInfo } from 'oncokb-frontend-commons';

import {
    ClinicalSignificance,
    Evidence,
    EvidenceType,
} from '../../../util/EvidenceUtils';
import {
    LEVEL_TO_CLINICAL_SIGNIFICANCE,
    LEVEL_TO_EVIDENCE_TYPE,
} from '../../../util/OncoKbUtils';
import { generateOncokbLink, ONCOKB_URL } from '../biologicalFunction/Oncokb';
import EvidenceSummary from './EvidenceSummary';

import functionalGroupsStyle from '../functionalGroups.module.scss';

interface IOncoKbProps {
    oncokb: IndicatorQueryResp | undefined;
    isCanonicalTranscriptSelected: boolean;
}

function treatmentToEvidence(treatment: IndicatorQueryTreatment) {
    return {
        level: treatment.level.replace('LEVEL_', ''),
        type: LEVEL_TO_EVIDENCE_TYPE[treatment.level] || EvidenceType.NA,
        clinicalSignificance:
            LEVEL_TO_CLINICAL_SIGNIFICANCE[treatment.level] ||
            ClinicalSignificance.NA,
        drugs: treatment.drugs.map((d) => d.drugName),
        disease: getTumorTypeNameWithExclusionInfo(
            treatment.levelAssociatedCancerType,
            treatment.levelExcludedCancerTypes
        ),
    };
}

function implicationToEvidence(implication: Implication) {
    return {
        level: implication.levelOfEvidence.replace('LEVEL_', ''),
        type:
            LEVEL_TO_EVIDENCE_TYPE[implication.levelOfEvidence] ||
            EvidenceType.NA,
        clinicalSignificance:
            LEVEL_TO_CLINICAL_SIGNIFICANCE[implication.levelOfEvidence] ||
            ClinicalSignificance.NA,
        drugs: [],
        disease:
            implication.tumorType?.name ||
            implication.tumorType?.mainType?.name,
    };
}

@observer
class OncoKb extends React.Component<IOncoKbProps> {
    get clinicalEvidences() {
        const treatmentEvidences =
            this.props.oncokb?.treatments.map(treatmentToEvidence) || [];
        const implicationEvidences = (
            this.props.oncokb?.prognosticImplications || []
        )
            .concat(this.props.oncokb?.diagnosticImplications || [])
            .map(implicationToEvidence);

        return treatmentEvidences.concat(implicationEvidences);
    }

    public oncokbTooltip(oncokbUrl: string) {
        return (
            <DefaultTooltip
                placement="top"
                overlay={
                    <div style={{ maxWidth: 350 }}>
                        <a
                            href={oncokbUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            OncoKB™
                        </a>{' '}
                        is a precision oncology knowledge base and contains
                        information about the effects and treatment implications
                        of specific cancer gene alterations.
                    </div>
                }
            >
                <a href={oncokbUrl} target="_blank" rel="noopener noreferrer">
                    OncoKB™&nbsp;
                    <i className="fas fa-external-link-alt" />
                    {!this.props.isCanonicalTranscriptSelected && (
                        <span> *</span>
                    )}
                </a>
            </DefaultTooltip>
        );
    }

    public render() {
        const oncokbUrl = generateOncokbLink(ONCOKB_URL, this.props.oncokb);

        return (
            <div className={functionalGroupsStyle['functional-group']}>
                <div className={functionalGroupsStyle['data-source']}>
                    {this.oncokbTooltip(oncokbUrl)}
                </div>
                <EvidenceSummary
                    url={oncokbUrl}
                    evidences={this.clinicalEvidences}
                    getEvidenceUrl={this.getEvidenceUrl}
                />
            </div>
        );
    }

    private getEvidenceUrl = (evidence: Evidence) => {
        const oncokbUrl = generateOncokbLink(ONCOKB_URL, this.props.oncokb);
        return evidence.disease
            ? `${oncokbUrl}/${evidence.disease}`
            : oncokbUrl;
    };
}

export default OncoKb;
