import React, {useState} from 'react';
import './Header.css';
import { Navbar, Nav } from 'react-bootstrap';
import splashlogo from '../../assets/images/logo.png';
import GoogleBtn from '../GoogleBtn';
import Avatar from '@material-ui/core/Avatar';
import { SuccessToast } from '../../utility/localStorageControl';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser, userImage, userLogin, userName } from '../../features/user/userSlice';
import { useHistory } from 'react-router-dom';

function Header1({open, close}){
    const dispatch = useDispatch();
    const history = useHistory();
    const isLogin = useSelector(userLogin);
    const image = useSelector(userImage);
    const name = useSelector(userName);

    const SignOut = () => {
        open();
        SuccessToast('Successfully Logged Out!')
        dispatch(logOutUser());
        setTimeout(() => {
            close();
            history.pushState('/home');
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
                    {isLogin ? (
                        dropdown ? (
                            <button onClick={() => SignOut()} 
                                className="edit-your-portfolio grow1" style={{fontWeight: 500}}
                            >
                                Sign Out
                            </button>
                        ) : (                            
                            <div className="avatar" style={{cursor: 'pointer'}} onClick={() => setdropdown(true)}>
                                <Avatar alt="img" src={image} />
                                <p className="avatar-name">Welcome<br/><p className="name">{name}</p></p>
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