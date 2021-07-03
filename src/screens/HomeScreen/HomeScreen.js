/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import '../../styles/HelperStyles.css';
import './HomeScreen.css';
import Header from '../../components/Header/Header';
import introimg from '../../assets/images/handshake-colour.png';
import whytabber from '../../assets/images/drawkit-content-man-colour.png'
import {BiCheckCircle} from 'react-icons/bi';
import FeatureCard from '../../components/FeatureCard/FeatureCard';
import AchievementCard from '../../components/AchievementCard/AchievementCard';
import FAQCard from '../../components/FAQCard/FAQCard';
import Footer from '../../components/Footer/Footer';
import PortfolioModal from '../../components/modals/PortfolioModal';
import { Animated } from 'react-animated-css';
import Axios from 'axios';
import users from '../../assets/images/users.png';
import links from '../../assets/images/links.png';
import review from '../../assets/images/Review.png';
import onpoint from '../../assets/images/OnPoint.png';
import modify from '../../assets/images/Modifiable.png';
import nolimit from '../../assets/images/NoLimit.png';
import projects from '../../assets/images/Projects.png';
import achievements from '../../assets/images/Achievements.png';
import {API_ENDPOINT} from '../../AdminServices/baseUrl';
import Loader from '../../components/Loader/Loader';
import { ErrorToast } from '../../utility/localStorageControl';
import {ToastContainer} from 'react-toastify';

function HomeScreen() {
  const [QnA, setQnA] = useState([]);
  const [Achievements, setAments] = useState([]);
  const [Features, setFeatures] = useState([]);
  const [loader, setloader] = useState(false);

  const getData = async () =>{
    setloader(true);
    Axios.get(`${API_ENDPOINT}/fe/get?page_type=Home&key=QnA`)
      .then(resp => {
        setQnA(resp.data.value);
      })
    .catch(err => ErrorToast("Some Error Occured."));
    Axios.get(`${API_ENDPOINT}/fe/get?page_type=Home&key=Achievements`)
      .then(resp => {
        setAments(resp.data.value)
      })
      .catch(err => ErrorToast("Some Error Occured."));
    Axios.get(`${API_ENDPOINT}/fe/get?page_type=Home&key=Features`)
      .then(resp => {
        setFeatures(resp.data.value);
        setloader(false);
      })
      .catch(err => {ErrorToast("Some Error Occured.")
        setloader(false);
      })
  }

  window.onload = () => {
    getData();
  }
  
  return (
    <div className="#home-screen">
      {loader ? <Loader /> : null}
      <Header open={() => setloader(true)} close={() => setloader(false)} />
      <Animated animationIn="slideInUp" isVisible={true}>
        <div id="intro-section">
          <div className="mw1100 mobile-column flexRow flexAround flexAlignCenter">
            {/* <img className="intro-img" src={introimg} alt="intro" /> */}
            <div className="embed-responsive embed-responsive-16by9">
              <iframe title="Tabber Advertisement Video" frameborder="0" className="embed-responsive-item" src="https://www.youtube.com/embed/_2S0x-YV3XQ?rel=0" allowFullScreen />
            </div>
            <div className="mw600 mobile-center flexColumn">
                <h1 className="intro-text">
                    Improve your chances of getting hired, just Tab it for 
                    <span style={{color: 'rgba(0,229,216,1)'}}> FREE</span>
                </h1>
                <PortfolioModal open={() => setloader(true)} close={() => setloader(false)} home={true} />
            </div>
          </div>
        </div>
      </Animated>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Animated animationIn="slideInUp" isVisible={true}>
      <div id="why-tabber">
        <div className="mw1100 flexRow mobile-column flexAround flexAlignCenter">
          <div className="mw600 flexColumn mv-40">
              <h1 className="whytabber-heading">Why <span style={{color: '#077A73'}}>tabber?</span></h1>
              <p className="whytabber-text">Are you tired of sending <strong>each and every link</strong> to recruiters taking the hassle of mentioning each and every <strong>rank</strong>? Say no more! because Tabber is here to make this a possibility.</p>
              <p className="whytabber-features mt-50 mb-20">The features which are covered in this</p>
              <p className="ml-19 whytabber-point flexAlignCenter"><BiCheckCircle style={{color: '#077A73', marginRight: 10}} />Add all your portfolio profiles.</p>
              <p className="ml-19 whytabber-point flexAlignCenter"><BiCheckCircle style={{color: '#077A73', marginRight: 10}} />Edit your resume live on the go.</p>
              <p className="ml-19 whytabber-point flexAlignCenter"><BiCheckCircle style={{color: '#077A73', marginRight: 10}} />Send and keep track of emails to recruiters within Tabby.</p>
              <p className="ml-19 whytabber-point flexAlignCenter"><BiCheckCircle style={{color: '#077A73', marginRight: 10}} />Tabby avoids spamming, thus increasing the chances of you getting noticed! </p>
              <p className="ml-19 pb-100 whytabber-point flexAlignCenter"><BiCheckCircle style={{color: '#077A73', marginRight: 10}} />Get a single shareable link.</p>
          </div>
          <img className="intro-img" src={whytabber} alt="why-tabber" />
        </div>
      </div>
      </Animated>
      <Animated animationIn="slideInUp" isVisible={true}>
      <div id="tabberfeatures">
        <div className="mw1100 pl-40 flexColumn">
          <h1 className="tabberfeatures-heading">What we got you</h1>
          <div className="flexRow flexBetween" style={{flexWrap: 'wrap'}}>
              {Features.map(feature => (
                  <FeatureCard key={feature.sr} name={feature.name} desc={feature.desc} 
                    img={feature.sr === 1 ? review :
                      feature.sr === 2 ? onpoint : 
                      feature.sr === 3 ? modify : 
                      feature.sr === 4 ? nolimit :
                      feature.sr === 5 ? projects : achievements} 
                  />
              ))}
          </div>
        </div>
      </div>
      </Animated>
      <Animated animationIn="slideInUp" isVisible={true}>
      <div id="achievements">
        <div className="mw1100 pl-40 flexColumn">
          <h1 className="achievements-heading">Achievements we have made, so far</h1>
          <div className="flexRow flexCenter" style={{flexWrap: 'wrap'}}>
              {Achievements.map(achievement => (
                  <AchievementCard key={achievement.sr} name={achievement.name} desc={achievement.desc} image={achievement.sr === 1 ? users : links} />
              ))}
          </div>
        </div>
      </div>
      </Animated>
      <Animated animationIn="slideInUp" isVisible={true}>
      <div id="faq">
        <div className="mw1100 ph-40 flexColumn">
          <h1 className="tabberfeatures-heading">Frequently Asked Questions</h1>
          {QnA.map(ques => (
              <FAQCard key={ques.sr} ques={ques.ques} ans={ques.ans} />
          ))}
        </div>
       </div>
      </Animated>
      <Animated animationIn="slideInUp" isVisible={true}>
        <Footer />
      </Animated>
    </div>
  );
}

export default HomeScreen;
