import React, { useState } from 'react';
import '../../styles/HelperStyles.css';
import './PortfolioScreen.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import StudentA from '../../assets/Datafiles/StudentA';
import {AiOutlinePlusCircle} from 'react-icons/ai';
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

function PortfolioScreen() {
  const [title, settitle] = useState('');
  const[desc, setdesc] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [modalShow3, setModalShow3] = useState(false);
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
      <Header />
      <div className="mw1100 share">
        <button className="flexAlignCenter share-button" style={{outline: 'none'}} onClick={() => setModalShow3(true)}>
          Share        
          <ShareModal show={modalShow3} onHide={() => setModalShow3(false)} />
        </button>
      </div>
      <div className="mw1100">
        <div className="p-40 flexColumn portfolio-section">
          {StudentA.map(student => (
            <div className="flexColumn" key={student.sr}>
              <div className="flexRow flexCenter flexAlignCenter">
                <input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" className="title" defaultValue={student.title} onChange={(text) => settitle(text)} placeholder="Portfolio Title" readOnly />
                <div className="flexRow flexCenter flexAlignCenter iconcontainer">
                  <AiOutlineEdit className="portfolio-icon" size="20" onClick={()=>Edit1()} />
                </div>
              </div>
              <hr style={{color : '#717070', width: '80%', margin: 'auto', marginTop: 10}} />
              <div className="flexAlignCenter flexRow mv-40">
                <div className="flexRow">
                  <img src={student.image} className="profile-pic" alt="profile" />
                  <div className="flexRow flexCenter flexAlignCenter iconcontainer" style={{top: 140, left: '-20%'}}>
                    <BsThreeDotsVertical className="portfolio-icon" size="20" />
                  </div>
                </div>
                <div className="flexColumn ml-40">
                  <p className="name mb-20 pl-20">Hello! I am <strong>{student.name}</strong></p>
                  <div className="flexRow">
                    <textarea autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" rows="5" className="desc" defaultValue={student.desc} onChange={(text) => setdesc(text)} readOnly placeholder="Enter your College and profile description here" />
                    <div className="flexRow flexCenter flexAlignCenter iconcontainer" style={{left: -15, top: -15}}>
                      <AiOutlineEdit className="portfolio-icon" size="20" onClick={()=>Edit2()} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="coding-profile mv-20">
                <p className="card-heading mb-20">Coding Profile</p>
                <div className="flexRow flexWrap">
                  {student.profile.map(profile => (
                    <CodingCard key={profile.sr} name={profile.name} id={profile.id} rank={profile.rank} logo={profile.logo} />
                  ))}
                  <div className="flexColumn flexCenter flexAlignCenter add-card" style={{height: 240}}>
                    <button onClick={() => setModalShow(true)}>
                      <AiOutlinePlusCircle style={{fontSize: 80, color: '#C0C0C0'}} />
                      <CodingProfileModal show={modalShow} onHide={() => setModalShow(false)} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="coding-profile mv-20">
                <p className="card-heading mb-20">Contests Won</p>
                <div className="flexRow flexWrap">
                  {student.achievements.map(achievement => (
                    <ContestCard key={achievement.sr} name={achievement.name} id={achievement.id} rank={achievement.rank} logo={achievement.logo} contest={achievement.contest} />
                  ))}
                  <div className="flexColumn flexCenter flexAlignCenter add-card">
                    <button onClick={() => setModalShow1(true)}>
                      <AiOutlinePlusCircle style={{fontSize: 80, color: '#C0C0C0'}} />
                      <ContestProfileModal show={modalShow1} onHide={() => setModalShow1(false)} />
                    </button>
                  </div>
                </div>
              </div>
              <div className="coding-profile mv-20">
                <p className="card-heading mb-20">Personal Projects</p>
                <div className="flexRow flexWrap">
                  {student.projects.map(project => (
                    <ProjectCard key={project.sr} name={project.name} img={project.img} techstack={project.techstack} />
                  ))}
                  <div className="flexColumn flexCenter flexAlignCenter add-card">
                    <button onClick={() => setModalShow2(true)}>
                      <AiOutlinePlusCircle style={{fontSize: 80, color: '#C0C0C0'}} />
                      <ProjectModal show={modalShow2} onHide={() => setModalShow2(false)} />
                    </button>
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
