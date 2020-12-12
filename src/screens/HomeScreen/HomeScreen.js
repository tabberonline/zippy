import React from 'react';
import '../../styles/HelperStyles.css';
import './HomeScreen.css';
import Header from '../../components/Header/Header';
import introimg from '../../assets/images/handshake-colour.png';
import whytabber from '../../assets/images/drawkit-content-man-colour.png'
import {BiCheckCircle} from 'react-icons/bi';
import FeaturesList from '../../assets/Datafiles/FeaturesList';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import AchievementsList from '../../assets/Datafiles/AchievementsList';
import AchievementCard from '../../components/AchievementCard/AchievementCard';
import QnA from '../../assets/Datafiles/QnA';
import FAQCard from '../../components/FAQCard/FAQCard';
import Footer from '../../components/Footer/Footer';

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
                <a href="/portfolio" className="flexAlignCenter intro-button">Get Started</a>
            </div>
          </div>
      </div>
      <div id="why-tabber">
          <div className="mw1100 flexRow flexAround flexAlignCenter">
            <div className="mw600 flexColumn mv-40">
                <h1 className="whytabber-heading">Why <span style={{color: '#077A73'}}>tabber?</span></h1>
                <p className="whytabber-text">Are you tired of sending <strong>each and every link</strong> to recruiters taking the hassle of mentioning each and every <strong>rank</strong>? Say no more! because Tabber is here to make this a possibility.</p>
                <p className="whytabber-features mt-50 mb-20">The features which are covered in this</p>
                <p className="ml-20 whytabber-point flexAlignCenter"><BiCheckCircle style={{color: '#077A73', marginRight: 10}} />Add all your portfolio profiles.</p>
                <p className="ml-20 whytabber-point flexAlignCenter"><BiCheckCircle style={{color: '#077A73', marginRight: 10}} />Edit your resume live on the go.</p>
                <p className="ml-20 pb-100 whytabber-point flexAlignCenter"><BiCheckCircle style={{color: '#077A73', marginRight: 10}} />Get a single shareable link.</p>
            </div>
            <img className="intro-img" src={whytabber} alt="why-tabber" />
          </div>
      </div>
      <div id="tabberfeatures">
          <div className="mw1100 pl-40 flexColumn">
            <h1 className="tabberfeatures-heading">What we got you</h1>
            <div className="flexRow" style={{flexWrap: 'wrap'}}>
                {FeaturesList.map(feature => (
                    <FeatureCard key={feature.sr} name={feature.name} desc={feature.desc} icon={feature.icon} />
                ))}
            </div>
          </div>
      </div>
      <div id="achievements">
        <div className="mw1100 pl-40 flexColumn">
            <h1 className="achievements-heading">Achievements we have made, so far</h1>
            <div className="flexRow flexCenter" style={{flexWrap: 'wrap'}}>
                {AchievementsList.map(achievement => (
                    <AchievementCard key={achievement.sr} name={achievement.name} desc={achievement.desc} image={achievement.image} />
                ))}
            </div>
        </div>
      </div>
      <div id="faq">
          <div className="mw1100 ph-40 flexColumn">
            <h1 className="tabberfeatures-heading">Frequently Asked Questions</h1>
            {QnA.map(ques => (
                <FAQCard key={ques.sr} ques={ques.ques} ans={ques.ans} />
            ))}
          </div>
       </div>
       <Footer />
    </div>
  );
}

export default HomeScreen;
