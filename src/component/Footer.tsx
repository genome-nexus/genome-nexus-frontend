import * as React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Footer.css';

class Footer extends React.Component<{}> {
    public get externalLinkIcon() {
        return <i className="fa fa-external-link" />;
    }

    public get externalLinks() {
        return (
            <div>
                <a
                    href="https://www.mskcc.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    MSK {this.externalLinkIcon}
                </a>
                <a
                    href="https://www.mskcc.org/research-areas/programs-centers/molecular-oncology"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    CMO {this.externalLinkIcon}
                </a>
                <a
                    href="https://www.cbioportal.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    cBioPortal {this.externalLinkIcon}
                </a>
            </div>
        );
    }

    public get internalLinks() {
        return (
            <div>
                <Link to="/swagger-ui.html">API</Link>
                <a href="https://docs.genomenexus.org" target="_top">
                    Documentation
                </a>
                <a href="mailto:info@genomenexus.org" target="_top">
                    Contact
                </a>
            </div>
        );
    }

    public render() {
        return (
            <footer className="mskcc-footer bg-mskcc-footer d-none d-md-block">
                <Container>
                    <Row className="text-center">
                        <Col md={true} className="m-auto">
                            {this.internalLinks}
                        </Col>
                    </Row>
                </Container>
            </footer>
        );
    }
}

export default Footer;
