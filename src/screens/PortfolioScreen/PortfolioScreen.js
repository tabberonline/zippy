import React from 'react';
import '../../styles/HelperStyles.css';
import './PortfolioScreen.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

function PortfolioScreen() {
  return (
    <div className="#portfolio-screen">
      <Header />
      <div className="mw1100 share">
        <a href="/portfolio" className="flexAlignCenter share-button">Share</a>
      </div>
      <div className="mw1100">
        <div className="p-30 flexColumn portfolio-section">

        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PortfolioScreen;
