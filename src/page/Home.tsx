import {action, observable} from "mobx";
import {observer} from "mobx-react";
import * as React from 'react';
import {
    Col, Row, Button, Image
} from 'react-bootstrap';

import SearchBox from "../component/SearchBox";
import "./Home.css";
import QueryExamples from "../component/QueryExamples";
import logoWithText from '../image/logo/genome_nexus_fullname_less_spacing_dark_blue.png';
import { isVariantValid } from "../util/variantValidator";
import client from "./genomeNexusClientInstance";
import ValidatorNotification, { ErrorType } from "../component/ValidatorNotification";

@observer
class Home extends React.Component<{history: any}>
{
    @observable
    protected inputText: string|undefined;

    @observable
    protected setAlert: boolean = false;

    @observable
    protected alertType: ErrorType = ErrorType.INVALID;

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
                            <ValidatorNotification showAlert={this.setAlert} type={this.alertType} onClose={this.onClose}/>
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
    async onSearch() {
        if (isVariantValid(`${this.inputText}`).isValid) {
            let hasResult = false;
            // check if the variant has response
            await client.fetchVariantAnnotationSummaryGET({variant: this.inputText!}).then(function(response){
                // fulfillment
                hasResult = true;
                }, reason => {
                // rejection
                hasResult = false;
                this.alertType = ErrorType.NO_RESULT;
            })
            if (hasResult) {
                this.setAlert = false;
                this.props.history.push(`/variant/${this.inputText}`);
                return;
            }
        }
        else {
            this.alertType = ErrorType.INVALID;
        }
        this.setAlert = true;
    }

    @action.bound
    private onClose() {
        this.setAlert = false;
    }

}
export default Home;
