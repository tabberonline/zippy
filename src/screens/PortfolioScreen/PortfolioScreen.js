import React from 'react';
import '../../styles/HelperStyles.css';
import './PortfolioScreen.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import StudentA from '../../assets/Datafiles/StudentA';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import CodingCard from '../../components/CodingCard/CodingCard';
import ContestCard from '../../components/ContestCard/ContestCard';
import ProjectCard from '../../components/ProjectCard/ProjectCard';

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
                    <CodingCard name={profile.name} id={profile.id} rank={profile.rank} logo={profile.logo} />
                  ))}
                  <div className="flexColumn flexCenter flexAlignCenter add-card">
                    <AiOutlinePlusCircle style={{fontSize: 80, color: '#C0C0C0'}} />
                  </div>
                </div>
              </div>
              <div className="coding-profile mv-20">
                <p className="card-heading mb-20">Contests Won</p>
                <div className="flexRow flexWrap">
                  {student.achievements.map(achievement => (
                    <ContestCard name={achievement.name} id={achievement.id} rank={achievement.rank} logo={achievement.logo} contest={achievement.contest} />
                  ))}
                  <div className="flexColumn flexCenter flexAlignCenter add-card">
                    <AiOutlinePlusCircle style={{fontSize: 80, color: '#C0C0C0'}} />
                  </div>
                </div>
              </div>
              <div className="coding-profile mv-20">
                <p className="card-heading mb-20">Personal Projects</p>
                <div className="flexRow flexWrap">
                  {student.projects.map(project => (
                    <ProjectCard name={project.name} img={project.img} techstack={project.techstack} />
                  ))}
                  <div className="flexColumn flexCenter flexAlignCenter add-card">
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
