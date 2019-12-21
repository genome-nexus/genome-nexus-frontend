import autobind from 'autobind-decorator';
import * as React from 'react';
import { Table } from 'react-bootstrap';

type QueryExample = {
    url: string;
    description: string;
};

const QUERY_EXAMPLES: QueryExample[] = [
    {
        url: '/annotation/17:g.41242962_41242963insGA',
        description: 'Retrieves VEP annotation for the provided variant',
    },
    {
        url: '/annotation/dbsnp/rs116035550',
        description: 'Retrieves VEP annotation for the give dbSNP id',
    },
    {
        url: '/annotation/genomic/7,140453136,140453136,A,T',
        description:
            'Retrieves VEP annotation for the provided genomic location',
    },
    {
        url: '/ptm/experimental?ensemblTranscriptId=ENST00000646891',
        description: 'Retrieves PTM entries by Ensembl Transcript ID',
    },
    {
        url: '/cancer_hotspots/hgvs/7:g.140453136A>T',
        description: 'Retrieves hotspot annotations for a specific variant',
    },
    {
        url: '/cancer_hotspots/transcript/ENST00000288602',
        description:
            'Retrieves hotspot annotations for the provided transcript ID',
    },
    {
        url: '/mutation_assessor/7:g.140453136A>T',
        description:
            'Retrieves mutation assessor information for the provided variant',
    },
    {
        url: '/my_variant_info/variant/7:g.140453136A>T',
        description: 'Retrieves myvariant information for the provided variant',
    },
];

class QueryExamples extends React.Component<{}> {
    public render() {
        const QUERY_EXAMPLE_ELEMENTS = QUERY_EXAMPLES.map(
            (example: QueryExample) => this.queryExampleToElement(example)
        );
        return (
            <Table responsive>
                <thead>
                    <tr>
                        <th>Resource</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>{QUERY_EXAMPLE_ELEMENTS}</tbody>
            </Table>
        );
    }

    @autobind
    private queryExampleToElement(queryExample: QueryExample) {
        return (
            <tr>
                <td
                    style={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        display: 'block',
                    }}
                >
                    <a
                        target="_blank"
                        href={queryExample.url}
                        rel="noopener noreferrer"
                    >{`GET ${queryExample.url}`}</a>
                </td>
                <td>{queryExample.description}</td>
            </tr>
        );
    }
}

export default QueryExamples;
