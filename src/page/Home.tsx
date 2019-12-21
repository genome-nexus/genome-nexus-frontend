import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Col, Row, Button, Image } from 'react-bootstrap';

import SearchBox from '../component/SearchBox';
import './Home.css';
import QueryExamples from '../component/QueryExamples';
import logo from '../image/logo/home_page_logo_small_size_1752x232.png';
import { isVariantValid } from '../util/variantValidator';
import client from './genomeNexusClientInstance';
import ValidatorNotification, {
    ErrorType,
} from '../component/ValidatorNotification';

@observer
class Home extends React.Component<{ history: any }> {
    @observable
    protected inputText: string | undefined;

    @observable
    protected alert: boolean = false;

    @observable
    protected alertType: ErrorType = ErrorType.INVALID;

    public render() {
        return (
            <div>
                <div className="text-center">
                    <Row>
                        <Col lg="5" xs="8" id="home-logo">
                            <Image src={logo} fluid />
                            Annotation and Interpretation of Genetic Variants in
                            Cancer
                        </Col>
                    </Row>
                    <Row className="d-flex justify-content-center">
                        <Col lg="5" xs="8" id="search-box-container">
                            <SearchBox
                                onChange={this.onTextChange}
                                onSearch={this.onSearch}
                                height={44}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ValidatorNotification
                                showAlert={this.alert}
                                type={this.alertType}
                                onClose={this.onClose}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="5" id="home-function-description">
                            Genome Nexus integrates genetic variant information
                            from a variety of resources. For a comprehensive overview
                            see the{' '}
                            <a href="https://docs.genomenexus.org/annotation-sources">
                                documentation
                            </a>
                            .
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col lg="2">
                            <Button
                                href="/swagger-ui.html"
                                variant="outline-primary"
                            >
                                Try live API
                            </Button>
                        </Col>
                        <Col lg="2">
                            <Button
                                href="#home-example-container"
                                variant="link"
                            >
                                See Examples
                            </Button>
                        </Col>
                    </Row>
                </div>

                <div id="home-example-container">
                    <Row>
                        <Col id="home-query-example-header">
                            API Examples
                        </Col>
                    </Row>
                    <Row>
                        <Col lg="10" id="home-query-example-table">
                            <QueryExamples />
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
            // check if the variant has response
            const response = await client
                .fetchVariantAnnotationGET({ variant: this.inputText! })
                .catch(ex => {
                    this.alertType = ErrorType.NO_RESULT;
                });

            if (response) {
                this.alert = false;
                this.props.history.push(`/variant/${this.inputText}`);
                return;
            }
        } else {
            this.alertType = ErrorType.INVALID;
        }
        this.alert = true;
    }

    @action.bound
    private onClose() {
        this.alert = false;
    }
}
export default Home;
