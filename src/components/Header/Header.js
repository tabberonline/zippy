import {React, useState, useContext} from 'react';
import './Header.css';
import { Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import splashlogo from '../../assets/images/logo.png';
import GoogleBtn from '../GoogleBtn';
import {ProgrammerContext} from '../../utility/userContext';
import { setItem } from '../../utility/localStorageControl';
import { toast } from 'react-toastify';
import '../../styles/HelperStyles.css'

function Header({open, close}){
    const [user, setUser] = useContext(ProgrammerContext);
    const SignOut = () => {
        open();
        toast.success('Successfully Logged Out!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        setUser(prevUser => ({...prevUser,
            login: false,
            token: null,
            user_id: null,
            name: '',
            email: '',
            image: '',
            resume_present: false,
            portfolio: [],
            rank_widgets: [],
            contest_widgets: [],
            project_widgets: [],
            resumeLink: '',
        }));
        setItem('user', '');
        setItem('accessToken', '');
        setTimeout(() => {
            close();
            window.open('/home', '_self');
        }, [500])
    }
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
                    {user.login ? (
                        <DropdownButton
                            menuAlign="right"
                            title=""
                            className="menu__dropdown"
                            id="dropdown-menu-align-right"
                            >
                            <Dropdown.Item eventKey="1" onClick={() => SignOut()} >Sign Out</Dropdown.Item>
                        </DropdownButton>
                    ) : null}
                </div>
            </Navbar>
        </header>
    );
}

export default Header;