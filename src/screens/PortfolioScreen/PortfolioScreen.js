import React, { useState } from 'react';
import '../../styles/HelperStyles.css';
import './PortfolioScreen.css';
import Footer from '../../components/Footer/Footer';
import StudentA from '../../assets/Datafiles/StudentA';
import CodingCard from '../../components/CodingCard/CodingCard';
import ContestCard from '../../components/ContestCard/ContestCard';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import CodingProfileModal from '../../components/modals/CodingProfileModal';
import ContestProfileModal from '../../components/modals/ContestProfileModal';
import ProjectModal from '../../components/modals/ProjectModal';
import ShareModal from '../../components/modals/ShareModal';
import {AiOutlineEdit} from 'react-icons/ai';
import {BsThreeDotsVertical} from 'react-icons/bs';
import $ from 'jquery';
import Header1 from '../../components/Header/Header1';

function PortfolioScreen() {
  const [name, setname] = useState('');
  const [image, setimage] = useState('');
  const [title, settitle] = useState('');
  const [desc, setdesc] = useState('');
  const Edit1 = () => {
    console.log('edittable1')
    $(".title").prop("readonly", false);
  } 
  const Edit2 = () => {
    console.log('edittable2')
    $(".desc").prop("readonly", false);
  } 
  return (
    <div className="#portfolio-screen">
      <Header1 />
      <ShareModal />
      <div className="mw1100">
        <div className="p-40 flexColumn portfolio-section">
          {StudentA.map(student => (
            <div className="flexColumn" key={student.sr}>
              <div className="flexRow flexCenter flexAlignCenter">
                <input type="text" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" className="title" defaultValue={student.title} onChange={(text) => settitle(text)} placeholder="Portfolio Title" readOnly />
                <div className="flexRow flexCenter flexAlignCenter iconcontainer1">
                  <AiOutlineEdit className="portfolio-icon" size="20" onClick={()=>Edit1()} />
                </div>
              </div>
              <hr style={{color : '#717070', width: '80%', margin: 'auto', marginTop: 10}} />
              <div className="flexColumn" style={{margin: 40, marginLeft: 0, marginBottom: 0}}>
                <p className="name mb-20 pl-20">Hello! I am <strong>{student.name}</strong></p>
                <div className="flexRow">
                  <textarea autocomplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" rows="5" className="desc" defaultValue={student.desc} onChange={(text) => setdesc(text)} readOnly placeholder="Enter your College and profile description here" />
                  <div className="flexRow flexCenter flexAlignCenter iconcontainer1" style={{left: -15, top: -15}}>
                    <AiOutlineEdit className="portfolio-icon" size="20" onClick={()=>Edit2()} />
                  </div>
                </div>
              </div>
              <div className="coding-profile mv-20">
                <p className="card-heading mb-20">Coding Profile</p>
                <div className="flexRow flexWrap">
                  {student.profile.map(profile => (
                    <CodingCard key={profile.sr} class1={profile.sr} name={profile.name} id={profile.id} rank={profile.rank} logo={profile.logo} />
                  ))}
                  <CodingProfileModal />
                </div>
              </div>
              <div className="coding-profile mv-20">
                <p className="card-heading mb-20">Contests Won</p>
                <div className="flexRow flexWrap">
                  {student.achievements.map(achievement => (
                    <ContestCard key={achievement.sr} name={achievement.name} id={achievement.id} rank={achievement.rank} logo={achievement.logo} contest={achievement.contest} />
                  ))}
                  <ContestProfileModal />
                </div>
              </div>
              <div className="coding-profile mv-20">
                <p className="card-heading mb-20">Personal Projects</p>
                <div className="flexRow flexWrap">
                  {student.projects.map(project => (
                    <ProjectCard key={project.sr} name={project.name} img={project.img} techstack={project.techstack} />
                  ))}                  
                  <ProjectModal />
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
