import {React, useState} from 'react';
import './Header.css';
import { Navbar, Nav } from 'react-bootstrap';
import splashlogo from '../../assets/images/logo.png';
import GoogleBtn from '../GoogleBtn';
import Hello from '../../screens/HomeScreen/Hello';

function Header({open, close}){
    return (
        <header className="header">
            <Navbar sticky="top" expand="lg" className="flexRow flexAlignCenter navbar">
                <Navbar.Brand className="flexColumn flexAlignCenter" href="/home">
                    <img src={splashlogo} width="150" height="30" className="d-inline-block mr-80" alt="logo" />
                </Navbar.Brand>
                <div className="w100 flexRow flexAlignCenter flexBetween">
                    <Nav className="mr-auto flexRow">
                        <Nav.Link className="grow2" href="/about">About</Nav.Link>
                        <Nav.Link className="grow2" href="/home#faq">FAQ</Nav.Link>
                        <Nav.Link className="grow2" href="/contact">Contact</Nav.Link>
                    </Nav>
                    <GoogleBtn open={open} close={close} />
                </div>
            </Navbar>
        </header>
    );
}

export default Header;