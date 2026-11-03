import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AlphaGenome, {
    availableTissues,
    defaultTissue,
    DISCLAIMER,
} from './AlphaGenome';

const payload = {
    variant: '7:g.140453136A>T',
    hg38_variant: 'chr7:140753336:A>T',
    scored_interval: 'chr7:140229048-141277624',
    model_version: 'alphagenome-v1',
    canonical_gene_id: 'ENSG00000157764',
    canonical_gene: 'BRAF',
    merged_splicing_score: 0.15,
    scores: [
        {
            output_type: 'RNA_SEQ',
            variant_scorer: 'GeneMaskLFCScorer',
            gene_id: 'ENSG00000157764',
            gene_name: 'BRAF',
            track_name: 'pancreas_rna_seq_plus',
            ontology_curie: 'UBERON:0001264',
            biosample_name: 'pancreas',
            raw_score: 0.612,
            quantile_score: 0.994,
        },
        {
            output_type: 'SPLICE_SITES',
            variant_scorer: 'GeneMaskSplicingScorer',
            gene_id: 'ENSG00000157764',
            gene_name: 'BRAF',
            track_name: 'donor_plus',
            ontology_curie: null,
            biosample_name: null,
            raw_score: 0.08,
            quantile_score: 0.62,
        },
    ],
};

describe('AlphaGenome variant page view', () => {
    it('defaults to the tissue with the strongest effect', () => {
        expect(defaultTissue(payload.scores)).toEqual('UBERON:0001264');
        expect(defaultTissue([])).toBeUndefined();
    });

    it('lists tissues present in the response', () => {
        expect(availableTissues(payload.scores)).toEqual(['UBERON:0001264']);
    });

    it('renders rows and the disclaimer without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AlphaGenome annotation={payload} />, div);
        const text = div.textContent || '';
        expect(text).toContain('BRAF');
        expect(text).toContain('RNA_SEQ');
        expect(text).toContain('SPLICE_SITES');
        expect(text).toContain('0.612');
        expect(text).toContain(DISCLAIMER);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('renders an empty slot without annotation', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AlphaGenome />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
