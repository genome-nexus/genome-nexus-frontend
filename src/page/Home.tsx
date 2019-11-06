import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Col, Row, Button, Image } from 'react-bootstrap';

import SearchBox from '../component/SearchBox';
import './Home.css';
import QueryExamples from '../component/QueryExamples';
import logo from '../image/logo/home_page_logo.png';
import { isVariantValid } from '../util/variantValidator';
import client from './genomeNexusClientInstance';
import ValidatorNotification, {
    ErrorType,
} from '../component/ValidatorNotification';
import { Link } from 'react-router-dom';

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
                    <Row>
                        <Col lg="6" className="m-auto" id="search-box">
                            <SearchBox
                                onChange={this.onTextChange}
                                onSearch={this.onSearch}
                                placeholder="Search variant"
                                height={44}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            lg="6"
                            style={{
                                color: 'grey',
                                fontSize: '1rem',
                                textAlign: 'left',
                            }}
                            className="pt-1 m-auto"
                        >
                            Example:
                            <Link to={'/variant/17:g.41242962_41242963insGA'}>
                                {' '}
                                17:g.41242962_41242963insGA
                            </Link>
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
                        <Col lg="7" id="home-function-description">
                            Genome Nexus will integrate information from a
                            variety of existing resources, including databases
                            that convert DNA changes to protein changes, predict
                            the functional effects of protein mutations, and
                            contain information about mutation frequencies, gene
                            function, variant effects, and clinical
                            actionability.
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col lg="2">
                            <Button
                                href={'http://genomenexus.org/swagger-ui.html'}
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
                                See examples
                            </Button>
                        </Col>
                    </Row>
                </div>

                <div id="home-example-container">
                    <Row>
                        <Col id="home-query-example-header">Query Examples</Col>
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
                .fetchVariantAnnotationSummaryGET({ variant: this.inputText! })
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
