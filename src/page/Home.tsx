import {action, observable} from "mobx";
import {observer} from "mobx-react";
import * as React from 'react';
import {
    Col, Row, Button, Image, Alert, Modal
} from 'react-bootstrap';

import SearchBox from "../component/SearchBox";
import "./Home.css";
import QueryExamples from "../component/QueryExamples";
import logoWithText from '../image/logo/genome_nexus_fullname_less_spacing_dark_blue.png';
import { isVariantValid } from "../util/variantValidator";

@observer
class Home extends React.Component<{history: any}>
{
    @observable
    protected inputText: string|undefined;

    @observable
    protected setAlert:boolean = false;

    public render() {
        return (
            <div>
                <div className="text-center">
                    <Row>
                        <Col lg="5" id="home-logo">
                            <Image src={logoWithText} fluid />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="7" id="home-description">
                            A resource for annotation and interpretation of genetic variants
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="7" className="m-auto" id="search-box">
                            <SearchBox
                                onChange={this.onTextChange}
                                onSearch={this.onSearch}
                                placeholder="Search variant"
                                height={50}
                            />
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col>
                            <Modal show={this.setAlert} onHide={this.handleCloseModal} centered>
                                <Modal.Header closeButton>
                                    <Modal.Title>This variant is invalid</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Currently we only support <a href="https://varnomen.hgvs.org/" target="_blank">HGVS</a> format.
                                    <p>For example: 17:g.41242962_41242963insGA</p>
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleCloseModal}>
                                    Close
                                </Button>
                                </Modal.Footer>
                            </Modal>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="7" id="home-function-description">
                            Genome Nexus will integrate information from a variety of existing resources, 
                            including databases that convert DNA changes to protein changes, predict the 
                            functional effects of protein mutations, and contain information about mutation 
                            frequencies, gene function, variant effects, and clinical actionability.
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col lg="2">
                            <Button href={"http://genomenexus.org/swagger-ui.html"} variant="outline-primary">Try live API</Button>
                        </Col>
                        <Col lg="2">
                            <Button href="#home-example-container" variant="link">See examples</Button>
                        </Col>
                    </Row>
                </div>

                <div id="home-example-container">
                    <Row>
                        <Col lg="6" id="home-query-example-header">
                                Query Examples
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="8" id="home-query-example-table">
                            <QueryExamples/>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

    @action.bound
    private onTextChange(input: string) {
        this.inputText = input;
    }

    @action.bound
    onSearch() {
        if (isVariantValid(`${this.inputText}`).isValid === true) {
            const { history } = this.props;
            history.push(`/variant/${this.inputText}`);
            this.setAlert = false;
        }
        else {
            this.setAlert = true;
        }
    }

    @action.bound
    private handleCloseModal() {
        this.setAlert = false;
    }

}

export default Home;
