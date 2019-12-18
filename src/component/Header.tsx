import * as React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import GenomeNexusLogo from './GenomeNexusLogo';

import './Header.css';

class Header extends React.Component<{}> {
    public render() {
        return (
            <header>
                <Navbar
                    bg="mskcc-header"
                    expand="lg"
                    className="navbar-dark main-navbar"
                >
                    <Container fluid={true}>
                        <Navbar.Brand className="pt-0">
                            <Link to="/" className="brand-title-link">
                                <GenomeNexusLogo />
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
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}

export default Header;
