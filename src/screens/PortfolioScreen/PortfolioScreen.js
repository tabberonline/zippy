import React from 'react';
import '../../styles/HelperStyles.css';
import './PortfolioScreen.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import StudentA from '../../assets/Datafiles/StudentA';
import {AiOutlinePlusCircle} from 'react-icons/ai';

function PortfolioScreen() {
  return (
    <div className="#portfolio-screen">
      <Header />
      <div className="mw1100 share">
        <a href="/portfolio" className="flexAlignCenter share-button">Share</a>
      </div>
      <div className="mw1100">
        <div className="p-40 flexColumn portfolio-section">
          {StudentA.map(student => (
            <div className="flexColumn" key={student.sr}>
              <input autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" className="title" value={student.title} placeholder="Portfolio Title" />
              <div className="flexAlignCenter flexRow mv-40">
                <img src={student.image} className="profile-pic" alt="profile" />
                <div className="flexColumn ml-40">
                  <p className="name mb-20 pl-20">Hello! I am <strong>{student.name}</strong></p>
                  <textarea autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" rows="5" className="desc" value={student.desc} placeholder="Enter your College and profile description here" />
                </div>
              </div>
              <div className="coding-profile mv-20">
                <p className="card-heading mb-20">Coding Profile</p>
                <div className="flexRow flexWrap">
                  {student.profile.map(profile => (
                    <div key={profile.sr} className="flexColumn profile-card">
                      <img className="logo" src={profile.logo} alt="logo" />
                      <p className="profile-name pl-20 mb-10">{profile.name}</p>
                      <p className="profile-name pl-20 mb-10"><span className="profile-heading">ID:</span> {profile.id}</p>
                      <p className="profile-name pl-20 mb-10"><span className="profile-heading">Rank:</span> {profile.rank}</p>
                    </div>
                  ))}
                  <div className="flexColumn flexCenter flexAlignCenter profile-card">
                    <AiOutlinePlusCircle style={{fontSize: 80, color: '#C0C0C0'}} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PortfolioScreen;
