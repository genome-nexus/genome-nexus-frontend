import {action, observable} from "mobx";
import {observer} from "mobx-react";
import * as React from 'react';
import {
    Col, Row, Button, Table
} from 'react-bootstrap';

import SearchBox from "../component/SearchBox";
import GenomeNexusLogo from "../component/GenomeNexusLogo";
import "./Home.css";

@observer
class Home extends React.Component<{}>
{
    @observable
    protected inputText: string|undefined;

    public render() {
        return (
            <div>
                <div className="text-center">
                    <Row>
                        <Col lg="8" className="home-logo">
                            <GenomeNexusLogo imageHeight={130}/> 
                                GenomeNexus
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="8" className="home-description">
                            A resource for annotation and interpretation of genetic variants
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="6" className="m-auto">
                            <SearchBox
                                onChange={this.onSearch}
                                placeholder="Search variants"
                                searchIconClassName="fa fa-search"
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="8" className="home-function-description">
                            Genome Nexus will integrate information from a variety of existing resources, 
                            including databases that convert DNA changes to protein changes, predict the 
                            functional effects of protein mutations, and contain information about mutation 
                            frequencies, gene function, variant effects, and clinical actionability.
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col lg="2">
                            <Button variant="outline-primary">Try live API</Button>
                        </Col>
                        <Col lg="2">
                            <Button onClick={this.linkToExamples} variant="link">See examples</Button>
                        </Col>
                    </Row>
                </div>

                <div id="home-example-container" className="home-example-container">
                    <Row>
                        <Col lg="8" className="home-query-example-header">
                                Query Examples
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="9" className="home-query-example-table">
                            <Table responsive>
                                <thead>
                                    <tr>
                                    <th>Resource</th>
                                    <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>
                                        <a target="_blank" href="http://genomenexus.org/annotation/17%3Ag.41242962_41242963insGA">
                                            GET http://genomenexus.org/annotation/17%3Ag.41242962_41242963insGA
                                        </a>
                                    </td>
                                    <td>Retrieves VEP annotation for the provided variant</td>
                                    </tr>
                                    <tr>
                                    <td>
                                        <a target="_blank" href="http://genomenexus.org/annotation/dbsnp/rs116035550">
                                            GET http://genomenexus.org/annotation/dbsnp/rs116035550
                                        </a>
                                    </td>
                                    <td>Retrieves VEP annotation for the give dbSNP id</td>
                                    </tr>
                                    <tr>
                                    <td>
                                        <a target="_blank" href="http://genomenexus.org/annotation/genomic/7%2C140453136%2C140453136%2CA%2CT">
                                            GET http://genomenexus.org/annotation/genomic/7%2C140453136%2C140453136%2CA%2CT
                                        </a>
                                    </td>
                                    <td>Retrieves VEP annotation for the provided genomic location</td>
                                    </tr>
                                    <tr>
                                    <td>
                                        <a target="_blank" href="http://genomenexus.org/ptm/experimental?ensemblTranscriptId=ENST00000646891">
                                            GET http://genomenexus.org/ptm/experimental?ensemblTranscriptId=ENST00000646891
                                        </a>
                                    </td>
                                    <td>Retrieves PTM entries by Ensembl Transcript ID</td>
                                    </tr>
                                    <tr>
                                    <td>
                                        <a target="_blank" href="http://genomenexus.org/cancer_hotspots/hgvs/7%3Ag.140453136A%3ET">
                                            GET http://genomenexus.org/cancer_hotspots/hgvs/7%3Ag.140453136A%3ET
                                        </a>
                                    </td>
                                    <td>Retrieves hotspot annotations for a specific variant</td>
                                    </tr>
                                    <tr>
                                    <td>
                                        <a target="_blank" href="http://genomenexus.org/cancer_hotspots/transcript/ENST00000288602">
                                            GET http://genomenexus.org/cancer_hotspots/transcript/ENST00000288602
                                        </a>
                                    </td>
                                    <td>Retrieves hotspot annotations for the provided transcript ID</td>
                                    </tr>
                                    <tr>
                                    <td>
                                        <a target="_blank" href="http://genomenexus.org/mutation_assessor/7%3Ag.140453136A%3ET">
                                            GET http://genomenexus.org/mutation_assessor/7%3Ag.140453136A%3ET
                                        </a>
                                    </td>
                                    <td>Retrieves mutation assessor information for the provided variant</td>
                                    </tr>
                                    <tr>
                                    <td>
                                        <a target="_blank" href="http://genomenexus.org/my_variant_info/variant/7%3Ag.140453136A%3ET">
                                        GET http://genomenexus.org/my_variant_info/variant/7%3Ag.140453136A%3ET
                                        </a>
                                    </td>
                                    <td>Retrieves myvariant information for the provided variant</td>
                                    </tr>

                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

    @action.bound
    private onSearch(input: string) {
        this.inputText = input;
    }

    private linkToExamples() {
        document.getElementById('home-example-container')!.scrollIntoView(); 
    }

}

export default Home;
