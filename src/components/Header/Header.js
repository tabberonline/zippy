import React from 'react';
import './Header.css';
import { Navbar, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import splashlogo from '../../assets/images/logo.png';
import GoogleBtn from '../GoogleBtn';
import { SuccessToast } from '../../utility/localStorageControl';
import '../../styles/HelperStyles.css'
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser, userLogin } from '../../features/user/userSlice';
import { useHistory } from 'react-router-dom';

function Header({open, close}){
    const dispatch = useDispatch();
    const history = useHistory();
    const isLogin = useSelector(userLogin);

    const SignOut = () => {
        open();
        SuccessToast('Successfully Logged Out!')
        dispatch(logOutUser());
        setTimeout(() => {
            close();
            history.push('/home');
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
                    {isLogin && <DropdownButton
                            menuAlign="right"
                            title=""
                            className="menu__dropdown"
                            id="dropdown-menu-align-right"
                        >
                            <Dropdown.Item eventKey="1" onClick={() => SignOut()} >Sign Out</Dropdown.Item>
                        </DropdownButton>
                    }
                </div>
            </Navbar>
        </header>
    );
}

export default Header;