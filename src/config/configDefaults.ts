export const SHOW_MUTATION_ASSESSOR = true;

export function annotationQueryFields() {
    const fields = DEFAULT_ANNOTATION_QUERY_FIELDS;
    if (SHOW_MUTATION_ASSESSOR) {
        fields.push('mutation_assessor');
    }
    return fields;
}

export const DEFAULT_ANNOTATION_QUERY_FIELDS = [
    'hotspots',
    'annotation_summary',
    'my_variant_info',
    'clinvar',
    'signal',
];

export const SEARCH_QUERY_FIELDS = ['annotation_summary'];
