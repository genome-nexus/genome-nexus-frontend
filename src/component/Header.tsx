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
            <header>
                <Navbar bg="mskcc-header" expand="lg" className="navbar-dark main-navbar">
                    <Container id="navbar-logo">
                        <Navbar.Brand>
                            <Link to="/" className="brand-title-link">
                                <GenomeNexusLogo /> Genome Nexus
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse id="navbar-collapse">
                            <Nav>
                                <LinkContainer exact={true} to="/"><Nav.Link className="navbar-link">Home</Nav.Link></LinkContainer>
                                <LinkContainer exact={true} to="/annotation"><Nav.Link className="navbar-link">MAF Annotation</Nav.Link></LinkContainer>
                                <LinkContainer exact={true} to="/patient"><Nav.Link className="navbar-link">Patient Report</Nav.Link></LinkContainer>
                                <LinkContainer exact={true} to="/api"><Nav.Link className="navbar-link">API Usage</Nav.Link></LinkContainer>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}

export default Header;