import * as React from 'react';
import {
    Container, Nav, Navbar
} from 'react-bootstrap';
import {
    LinkContainer
} from "react-router-bootstrap";
import {
    Link
} from "react-router-dom";

import MskccLogo from "./MskccLogo";
import GenomeNexusLogo from "./GenomeNexusLogo";

import "./Header.css";

class Header extends React.Component<{}>
{
    public render()
    {
        return (
            <header className="sticky-top">
                <Navbar bg="mskcc-header" expand="lg" className="navbar-dark main-navbar">
                    <Container>
                        <Navbar.Brand>
                            <Link to="/" className="brand-title-link">
                                <GenomeNexusLogo /> Genome Nexus
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse>
                            <Nav>
                                <LinkContainer exact={true} to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
                                <LinkContainer exact={true} to="/annotation"><Nav.Link>MAF Annotation</Nav.Link></LinkContainer>
                                <LinkContainer exact={true} to="/patient"><Nav.Link>Patient Report</Nav.Link></LinkContainer>
                                <LinkContainer exact={true} to="/api"><Nav.Link>API Usage</Nav.Link></LinkContainer>
                            </Nav>
                        </Navbar.Collapse>
                        <MskccLogo imageHeight={50} className="d-none d-lg-block ml-auto" />
                    </Container>
                </Navbar>
                <Navbar bg="mskcc-subheader" expand="lg" className="navbar-dark sub-navbar">
                    <Container>
                        A resource for annotation and interpretation of genetic variants
                    </Container>
                </Navbar>
            </header>
        );
    }
}

export default Header;