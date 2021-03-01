import {React, useState} from 'react';
import './Header.css';
import { Navbar, Nav } from 'react-bootstrap';
import splashlogo from '../../assets/images/logo.png';
import GoogleBtn from '../GoogleBtn';
import Avatar from '@material-ui/core/Avatar';
import { getItem, setItem } from '../../utility/localStorageControl';
import { toast } from 'react-toastify';

const SignOut = () => {
    setItem('login', false);
    toast.success('Successfully Logged Out!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    setItem('access_token', '');
    setItem('name', '');
    setItem('image', '');
    setItem('portfolio', false);
    setItem('projects', []);
    setItem('rank', []);
    setItem('contest', []);
    setItem('resumeLink', '');
    setTimeout(() => {
        window.open('/home', '_self');
    }, [500])
}

function Header1(){
    const [dropdown, setdropdown] = useState(false);
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
                    {getItem('login') ? (
                        dropdown ? (
                            <button onClick={() => SignOut()} 
                                className="edit-your-portfolio grow1" style={{fontWeight: 500}}
                            >
                                Sign Out
                            </button>
                        ) : (                            
                            <div className="avatar" style={{cursor: 'pointer'}} onClick={() => setdropdown(true)}>
                                <Avatar alt="img" src={getItem('image')} />
                                <p className="avatar-name">Welcome<br/><p className="name">{getItem('name')}</p></p>
                            </div>
                        )
                    ) : (
                        <GoogleBtn />
                    )}
                </div>
            </Navbar>
        </header>
    );
}

export default Header1;