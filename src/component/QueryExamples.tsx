import autobind from "autobind-decorator";
import * as React from 'react';
import { Table } from "react-bootstrap";

type QueryExample =
{
    url: string
    description: string;
}

const queryExamples: QueryExample[] = [
    {
        "url": "http://genomenexus.org/annotation/17%3Ag.41242962_41242963insGA",
        "description": "Retrieves VEP annotation for the provided variant"
    },
    {
        "url": "http://genomenexus.org/annotation/dbsnp/rs116035550",
        "description": "Retrieves VEP annotation for the give dbSNP id"
    },
    {
        "url": "http://genomenexus.org/annotation/genomic/7%2C140453136%2C140453136%2CA%2CT",
        "description": "Retrieves VEP annotation for the provided genomic location"
    },
    {
        "url": "http://genomenexus.org/ptm/experimental?ensemblTranscriptId=ENST00000646891",
        "description": "Retrieves PTM entries by Ensembl Transcript ID"
    },
    {
        "url": "http://genomenexus.org/cancer_hotspots/hgvs/7%3Ag.140453136A%3ET",
        "description": "Retrieves hotspot annotations for a specific variant"
    },
    {
        "url": "http://genomenexus.org/cancer_hotspots/transcript/ENST00000288602",
        "description": "Retrieves hotspot annotations for the provided transcript ID"
    },
    {
        "url": "http://genomenexus.org/mutation_assessor/7%3Ag.140453136A%3ET",
        "description": "Retrieves mutation assessor information for the provided variant"
    },
    {
        "url": "http://genomenexus.org/my_variant_info/variant/7%3Ag.140453136A%3ET",
        "description": "Retrieves myvariant information for the provided variant"
    }
];

class QueryExamples extends React.Component<{}>
{
    public render()
    {
        const queryExampleElements = queryExamples.map((example: QueryExample) => this.queryExampleToElement(example))
        return (
            <Table responsive>
                <thead>
                    <tr className="d-flex">
                        <th className="col-6">Resource</th>
                        <th className="col-4">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {queryExampleElements}
                </tbody>
            </Table>
        );
    }

    @autobind
    private queryExampleToElement(queryExample: QueryExample) {
        return (
            <tr className="d-flex">
                <td className="col-6" style={{textOverflow: "ellipsis", overflow: "hidden", display: "block"}}>
                    <a target="_blank" href={queryExample.url}>{`GET ${queryExample.url}`}</a>
                </td>
                <td className="col-4">
                    {queryExample.description}
                </td>
            </tr>
        );
    }
}

export default QueryExamples;