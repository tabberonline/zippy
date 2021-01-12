import {React} from 'react';
import './Footer.css';

function Footer(){
    return (
        <footer className="footer">
            <div className="mw1100 ph-20 flexRow flexBetween flexAlignCenter">
                <h1 className="footer-logo"><a href="/home">Tabber</a></h1>
                <div className="flexRow flexBetween ">
                    <a href="/about" className="grow2 footer-links">About</a>
                    <a href="/contact" className="grow2 footer-links mh-40">Contact</a>
                    <a href="/" className="grow2 footer-links">Privacy Policy</a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;