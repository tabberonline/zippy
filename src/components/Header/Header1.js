import {React, useState} from 'react';
import './Header.css';
import { Navbar, Nav } from 'react-bootstrap';
import splashlogo from '../../assets/images/logo.png';
import GoogleBtn from '../GoogleBtn';
import Avatar from '@material-ui/core/Avatar';
import { getItem, setItem } from '../../utility/localStorageControl';

function Header1(){
    return (
        <header className="header">
            <Navbar sticky="top" expand="lg" className="flexRow flexAlignCenter navbar">
                <Navbar.Brand href="/home">
                    <img src={splashlogo} width="150" height="30" className="d-inline-block mr-80" alt="logo" />
                </Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav" className="w100 flexRow flexAlignCenter flexBetween">
                    <Nav className="mr-auto">
                        <Nav.Link className="grow2" href="/home#faq">FAQ</Nav.Link>
                        <Nav.Link className="grow2" href="/contact">Contact</Nav.Link>
                        <Nav.Link className="grow2" href="/about">About</Nav.Link>
                    </Nav>
                    {getItem('login') ? (
                        <div className="avatar">
                            <Avatar alt="img" src={getItem('image')} />
                            <p className="avatar-name">Welcome<br/><p className="name">{getItem('name')}</p></p>
                        </div>
                    ) : (
                        <GoogleBtn />
                    )}
                </Navbar.Collapse>
            </Navbar>
        </header>
    );
}

export default Header1;