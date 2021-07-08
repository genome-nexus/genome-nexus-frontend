import { ClinicalSignificance, EvidenceType } from './EvidenceUtils';

export const SENSITIVE_LEVELS = [
    'LEVEL_1',
    'LEVEL_2',
    'LEVEL_3',
    'LEVEL_3A',
    'LEVEL_3B',
    'LEVEL_4',
];

export const RESISTANT_LEVELS = ['LEVEL_R1', 'LEVEL_R2'];

export const PROGNOSTIC_LEVELS = ['LEVEL_Px1', 'LEVEL_Px2', 'LEVEL_Px3'];

export const DIAGNOSTIC_LEVELS = ['LEVEL_Dx1', 'LEVEL_Dx2', 'LEVEL_Dx3'];

export const LEVEL_TO_CLINICAL_SIGNIFICANCE: {
    [level: string]: ClinicalSignificance;
} = buildLevelToClinicalSignificance();

export const LEVEL_TO_EVIDENCE_TYPE: { [level: string]: EvidenceType } =
    buildLevelToTypeMap();

function buildLevelToTypeMap() {
    const map: { [level: string]: EvidenceType } = {};

    SENSITIVE_LEVELS.forEach((level) => (map[level] = EvidenceType.Predictive));
    RESISTANT_LEVELS.forEach((level) => (map[level] = EvidenceType.Predictive));
    PROGNOSTIC_LEVELS.forEach(
        (level) => (map[level] = EvidenceType.Prognostic)
    );
    DIAGNOSTIC_LEVELS.forEach(
        (level) => (map[level] = EvidenceType.Diagnostic)
    );

    return map;
}

function buildLevelToClinicalSignificance() {
    const map: { [level: string]: ClinicalSignificance } = {};

    SENSITIVE_LEVELS.forEach(
        (level) => (map[level] = ClinicalSignificance.Sensitivity)
    );
    RESISTANT_LEVELS.forEach(
        (level) => (map[level] = ClinicalSignificance.Resistance)
    );
    // TODO diagnostic & prognostic significance
    // PROGNOSTIC_LEVELS.forEach(level => map[level] = ClinicalSignificance.Prognostic);
    // DIAGNOSTIC_LEVELS.forEach(level => map[level] = ClinicalSignificance.Diagnostic);

    return map;
}
