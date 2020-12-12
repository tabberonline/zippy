import React from 'react';
import '../../styles/HelperStyles.css';
import './PortfolioScreen.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import StudentA from '../../assets/Datafiles/StudentA';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import project1 from '../../assets/images/StudentA/Rectangle 25.png';

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
              <div className="coding-profile mv-20">
                <p className="card-heading mb-20">Contests Won</p>
                <div className="flexRow flexWrap">
                  {student.achievements.map(achievement => (
                    <div key={achievement.sr} className="flexColumn achievement-card">
                      <img className="logo" src={achievement.logo} alt="logo" />
                      <p className="profile-name pl-20 mb-10">{achievement.name}</p>
                      <div className="flexRow flexBetween"> 
                        <p className="profile-name ph-20 mb-10"><span className="profile-heading">ID:</span> {achievement.id}</p>
                        <p className="profile-name ph-20 mb-10"><span className="profile-heading">Rank:</span> {achievement.rank}</p>
                      </div>
                      <p className="profile-name ph-20 mb-10"><span className="profile-heading">Contest Name:</span> {achievement.contest}</p>
                    </div>
                  ))}
                  <div className="flexColumn flexCenter flexAlignCenter achievement-card">
                    <AiOutlinePlusCircle style={{fontSize: 80, color: '#C0C0C0'}} />
                  </div>
                </div>
              </div>
              <div className="coding-profile mv-20">
                <p className="card-heading mb-20">Personal Projects</p>
                <div className="flexRow flexWrap">
                  {student.projects.map(project => (
                    <div key={project.sr} className="flexColumn project-card" >
                      <img src={project.img} alt="project" className="project-img" />
                      {/* <div className="flexColumn flexCenter flexAlignCenter project-textbox">
                        <p className="project-name">{project.name}</p>
                      </div> */}
                    </div>
                  ))}
                  <div className="flexColumn flexCenter flexAlignCenter project-card">
                    <AiOutlinePlusCircle style={{fontSize: 80, color: '#C0C0C0'}} />
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="flexRow flexCenter ph-20 flexAlignCenter mv-40">
            <hr style={{width: '35%', color: 'rgba(154,154,154,1)'}} />
            <p className="end-text">Thats all folks</p>
            <hr style={{width: '35%', color: 'rgba(154,154,154,1)'}} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PortfolioScreen;
