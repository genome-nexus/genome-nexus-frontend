import _ from 'lodash';

export enum ClinicalSignificance {
    Sensitivity = 'Sensitivity',
    Resistance = 'Resistance',
    Positive = 'Positive',
    Negative = 'Negative',
    PoorOutcome = 'Poor Outcome',
    NA = 'N/A',
}

export enum EvidenceType {
    Predictive = 'Predictive',
    Prognostic = 'Prognostic',
    Diagnostic = 'Diagnostic',
    Predisposing = 'Predisposing',
    Oncogenic = 'Oncogenic',
    Functional = 'Functional',
    NA = 'N/A',
}

export type Evidence = {
    clinicalSignificance: ClinicalSignificance;
    type: EvidenceType;
    level: string;
    drugs: string[];
    disease?: string;
};

export function groupEvidencesByType(evidences: Evidence[]): {
    [evidenceType: string]: Evidence[];
} {
    return _.groupBy(evidences, (e) => e.type);
}

export function groupEvidencesBySignificance(evidences: Evidence[]): {
    [clinicalSignificance: string]: Evidence[];
} {
    return _.groupBy(evidences, (e) => e.clinicalSignificance);
}

export function findUniqueDrugs(evidences: Evidence[]): string[] {
    return _.uniq(
        _.flatten(_.sortBy(evidences, (e) => e.level).map((e) => e.drugs))
    );
}
