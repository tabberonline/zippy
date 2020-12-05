import React from 'react';
import '../../styles/HelperStyles.css';
import './HomeScreen.css';
import Header from '../../components/Header/Header';
import introimg from '../../assets/images/handshake-colour.png';
import whytabber from '../../assets/images/drawkit-content-man-colour.png'

function HomeScreen() {
  return (
    <div className="#home-screen">
      <Header />
      <div id="intro-section">
          <div className="mw1100 flexRow flexAround flexAlignCenter">
            <img className="intro-img" src={introimg} alt="intro" />
            <div className="mw600 flexColumn">
                <h1 className="intro-text">
                    Improve your chances of getting hired, just Tab it for 
                    <span style={{color: 'rgba(0,229,216,1)'}}> FREE</span>
                </h1>
                <button className="flexAlignCenter intro-button">Get Started</button>
            </div>
          </div>
      </div>
      <div id="why-tabber">
          <div className="mw1100 flexRow flexAround flexAlignCenter">
            <div className="mw600 flexColumn">
                
            </div>
            <img className="intro-img" src={whytabber} alt="why-tabber" />
          </div>
      </div>
    </div>
  );
}

export default HomeScreen;
