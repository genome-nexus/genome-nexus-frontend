import * as React from 'react';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import squareLogo from '../image/logo/logo_square_white_background_with_padding.png';

import './Header.css';

class Header extends React.Component<{}> {
    public render() {
        return (
            <header>
                <Navbar bg="mskcc-header" expand="lg" variant="dark">
                    <Container fluid={true}>
                        <Navbar.Brand className="pt-0">
                            <Link to="/" className="brand-title-link">
                                <Image src={squareLogo} />
                                &nbsp;Genome Nexus
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse>
                            <Nav>
                                <Nav.Link
                                    href="/swagger-ui.html"
                                    className="ml-5"
                                >
                                    API
                                </Nav.Link>
                                <Nav.Link
                                    href="https://docs.genomenexus.org"
                                    className="ml-5"
                                >
                                    Documentation
                                </Nav.Link>
                                <Nav.Link
                                    href="https://docs.genomenexus.org/tools"
                                    className="ml-5"
                                >
                                    Tools
                                </Nav.Link>
                                <Nav.Link
                                    href="https://github.com/genome-nexus"
                                    className="ml-5"
                                >
                                    GitHub
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}

export default Header;
