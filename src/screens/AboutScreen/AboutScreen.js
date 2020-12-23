import React from 'react';
import '../../styles/HelperStyles.css';
import './AboutScreen.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import aboutimg from '../../assets/images/aboutimg.png';
import pc from '../../assets/images/random.png';

function AboutScreen() {
  return (
    <div className="about-screen">
        <Header />
        <div id="intro-section">
          <div className="mw1100 flexColumn">
            <div className="flexColumn flexAlignCenter flexCenter mh-20" style={{backgroundColor: '#00e5d8', height: 300, borderRadius: 8}}>
                <img src={aboutimg} alt="" style={{width: '90%'}} />
            </div>
            <div className="flexColumn about-section">
                <h1 className="about-heading">How it all began</h1>
                <div className="flexRow flexAround flexAlignCenter dividerBottom pb-100">
                    <div className="mw500 flexColumn mv-20">
                        <p className="about-text">
                            Lorem ipsum dolor sit amet,consectetur adipiscing elit.Dignissim sem dolor sit feugiat purus magnis. A nisi, tincidunt id quis et. Velit adipiscing a, scelerisque velit velit ipsum scelerisque augue at. <br />
                            Faucibus sed pretium turpis enim, sed quis ultricies orci. Volutpat, dictumst amet at feugiat dui commodo gravida senectus aenean. Consequat in libero et nullam leo vitae. Suspendisse tincidunt turpis ipsum vel ac rutrum feugiat vulputate. Adipiscing netus ultrices lorem id ornare morbi. Justo tortor velit odio hac sed luctus sodales id ullamcorper. Sed elit quam aliquet nisl molestie quis aliquam pulvinar nulla. Ac sollicitudin augue vel nec imperdiet dui augue. Est viverra nulla porttitor feugiat. Enim magna tortor molestie turpis diam neque pellentesque proin dictum.
                        </p>
                    </div>
                    <img className="about-img" src={pc} alt="about-tabber" />
                </div>
            </div>
          </div>
      </div>
        <Footer />
    </div>
  );
}

export default AboutScreen;
