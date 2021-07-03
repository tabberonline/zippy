import {React, useState, useContext} from 'react';
import './Header.css';
import { Navbar, Nav } from 'react-bootstrap';
import splashlogo from '../../assets/images/logo.png';
import GoogleBtn from '../GoogleBtn';
import Avatar from '@material-ui/core/Avatar';
import { getItem, setItem, SuccessToast } from '../../utility/localStorageControl';
import {ProgrammerContext} from '../../utility/userContext';

function Header1({open, close}){
    const [user, setUser] = useContext(ProgrammerContext);
    const SignOut = () => {
        open();
        SuccessToast('Successfully Logged Out!')
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
                    {user.login ? (
                        dropdown ? (
                            <button onClick={() => SignOut()} 
                                className="edit-your-portfolio grow1" style={{fontWeight: 500}}
                            >
                                Sign Out
                            </button>
                        ) : (                            
                            <div className="avatar" style={{cursor: 'pointer'}} onClick={() => setdropdown(true)}>
                                <Avatar alt="img" src={user.image} />
                                <p className="avatar-name">Welcome<br/><p className="name">{user.name}</p></p>
                            </div>
                        )
                    ) : (
                        <GoogleBtn open={open} close={close} />
                    )}
                </div>
            </Navbar>
        </header>
    );
}

export default Header1;