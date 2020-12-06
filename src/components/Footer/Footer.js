import {React} from 'react';
import './Footer.css';

function Footer(){
    return (
        <footer className="footer">
            <div className="mw1100 ph-40 flexRow flexBetween flexAlignCenter">
                <h1 className="footer-logo">Tabber</h1>
                <div className="flexRow flexBetween ">
                    <p className="footer-links">About</p>
                    <p className="footer-links mh-40">Contact</p>
                    <p className="footer-links">Privacy Policy</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;