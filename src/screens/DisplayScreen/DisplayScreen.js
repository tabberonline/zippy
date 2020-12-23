import React from 'react';
import '../../styles/HelperStyles.css';
import './DisplayScreen.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import StudentA from '../../assets/Datafiles/StudentA';
import CodingCard from '../../components/CodingCard/CodingCard';
import ContestCard from '../../components/ContestCard/ContestCard';
import ProjectCard from '../../components/ProjectCard/ProjectCard';

function DisplayScreen() {
  return (
    <div className="#display-screen">
      <Header />
      <div className="mw1100">
        <div className="p-40 flexColumn display-section">
          {StudentA.map(student => (
            <div className="flexColumn" key={student.sr}>
              <p className="title">{student.title}</p>
              <hr style={{color : '#717070', width: '80%', margin: 'auto', marginTop: 10}} />
              <div className="flexAlignCenter flexRow mv-40">
                <img src={student.image} className="profile-pic" alt="profile" />
                <div className="flexColumn" style={{marginLeft: 40, marginTop: 40}}>
                  <p className="name mb-20 pl-20">Hello! I am <strong>{student.name}</strong></p>
                  <p className="desc">{student.desc}</p>
                </div>
              </div>
              <div className="coding-profile mv-20">
                <p className="card-heading mb-20">Coding Profile</p>
                <div className="flexRow flexWrap">
                  {student.profile.map(profile => (
                    <CodingCard key={profile.sr} name={profile.name} id={profile.id} rank={profile.rank} logo={profile.logo} />
                  ))}
                </div>
              </div>
              <div className="coding-profile mv-20">
                <p className="card-heading mb-20">Contests Won</p>
                <div className="flexRow flexWrap">
                  {student.achievements.map(achievement => (
                    <ContestCard key={achievement.sr} name={achievement.name} id={achievement.id} rank={achievement.rank} logo={achievement.logo} contest={achievement.contest} />
                  ))}
                </div>
              </div>
              <div className="coding-profile mv-20">
                <p className="card-heading mb-20">Personal Projects</p>
                <div className="flexRow flexWrap">
                  {student.projects.map(project => (
                    <ProjectCard key={project.sr} name={project.name} img={project.img} techstack={project.techstack} />
                  ))}
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

export default DisplayScreen;
