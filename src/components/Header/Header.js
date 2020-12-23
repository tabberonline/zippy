import {React, useState} from 'react';
import './Header.css';
import { Navbar, Nav } from 'react-bootstrap';
import splashlogo from '../../assets/images/logo.png';
import GoogleBtn from '../GoogleBtn';

function Header(){
    return (
        <header className="header">
            <Navbar sticky="top" expand="lg" className="flexRow flexAlignCenter navbar">
                <Navbar.Brand href="/home">
                    <img src={splashlogo} width="150" height="30" className="d-inline-block mr-80" alt="logo" />
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav" className="w100 flexRow flexAlignCenter flexBetween">
                    <Nav className="ml-auto">
                        <Nav.Link href="/about">About</Nav.Link>
                        <Nav.Link href="/home#faq">FAQ</Nav.Link>
                        <Nav.Link href="/contact">Contact</Nav.Link>
                    </Nav>
                    <GoogleBtn />
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}

export default Header;