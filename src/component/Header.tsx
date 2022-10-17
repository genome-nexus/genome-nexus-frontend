import * as React from 'react';
import { Container, Image, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import squareLogo from '../image/logo/logo_square_white_background_with_padding.png';

import './Header.css';

class Header extends React.Component<{}> {
    public render() {
        return (
            <header className="sticky-top">
                <Navbar
                    bg="mskcc-header"
                    expand="lg"
                    variant="dark"
                    className="navbar-dark main-navbar"
                >
                    <Container fluid={true}>
                        <Navbar.Brand>
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
                                <Nav.Link
                                    href="https://docs.genomenexus.org/about"
                                    className="ml-5"
                                >
                                    About
                                </Nav.Link>
                                <Nav.Link href="/news" className="ml-5">
                                    News
                                </Nav.Link>
                                <Nav.Link href="/Revue" className="ml-5">
                                    Revue
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
