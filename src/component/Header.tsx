import * as React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
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
                                <LinkContainer exact={true} to="/swagger-ui.html">
                                    <Nav.Link className="ml-5">
                                        API
                                    </Nav.Link>
                                </LinkContainer>
                                <LinkContainer exact={true} to="https://docs.genomenexus.org">
                                    <Nav.Link className="ml-5">
                                        Documentation
                                    </Nav.Link>
                                </LinkContainer>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}

export default Header;
