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
import $ from 'jquery';
import Header1 from '../../components/Header/Header1';
import { getItem, setItem, ReversePortalMap } from '../../utility/localStorageControl';
import AdminService from '../../AdminServices/AdminService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function PortfolioScreen() {
  const [name, setname] = useState(getItem('name'));
  const [title, settitle] = useState(getItem('titlePortfolio'));
  const [desc, setdesc] = useState(getItem('descPortfolio'));
  const [rankWidgets, setrankwidgets] = useState(getItem('rankWidgets'));
  const Edit1 = () => {
    console.log('edittable1')
    $(".title").prop("readonly", false);
  } 
  const Edit2 = () => {
    console.log('edittable2')
    $(".desc").prop("readonly", false);
  } 
  const updateTitle = (event) => {
    settitle(event.target.value);
    setItem('titlePortfolio', title);
    UpdatePortfolio();
  }
  const updateDesc = (event) => {
    setdesc(event.target.value);
    setItem('descPortfolio', desc);
    UpdatePortfolio();
  }
  const UpdatePortfolio = async () =>{
    if(desc.length > 0 && title.length > 0){
      const UpdatePortfolioData = {
        'title': getItem('titlePortfolio'),
        'description': getItem('descPortfolio'),
      }
      console.log(UpdatePortfolioData);
      AdminService.updatePortfolio(UpdatePortfolioData)
        .then(resp => {
          console.log('Response', resp);
          toast.success('Details Updated!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        })
        .catch(err => {
          console.log('Error', err);
          toast.error('Error, Please retry!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } else {
      toast.error('Error, Fields cannot be empty!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  return (
    <div className="#portfolio-screen">      
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
      <Header1 />
      <ShareModal />
      <div className="mw1100">
        <div className="p-40 flexColumn portfolio-section">
          {StudentA.map(student => (
            <div className="flexColumn">
              <div className="flexRow flexCenter flexAlignCenter">
                <input type="text" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" className="title" defaultValue={title} onBlur={(event) => updateTitle(event)} placeholder="Portfolio Title" readOnly />
                <div className="flexRow flexCenter flexAlignCenter iconcontainer1">
                  <AiOutlineEdit className="portfolio-icon" size="20" onClick={()=>Edit1()} />
                </div>
              </div>
              <hr style={{color : '#717070', width: '80%', margin: 'auto', marginTop: 10}} />
              <div className="flexColumn" style={{margin: 40, marginLeft: 0, marginBottom: 0}}>
                <p className="name mb-20 pl-20">Hello! I am <strong>{name}</strong></p>
                <div className="flexRow">
                  <textarea autocomplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" rows="5" className="desc" defaultValue={desc} onBlur={(event) => updateDesc(event)} readOnly placeholder="Enter your College and profile description here" />
                  <div className="flexRow flexCenter flexAlignCenter iconcontainer1" style={{left: -15, top: -15}}>
                    <AiOutlineEdit className="portfolio-icon" size="20" onClick={()=>Edit2()} />
                  </div>
                </div>
              </div>
              <div className="coding-profile mv-20">
                <p className="card-heading mb-20">Coding Profile</p>
                <div className="flexRow flexWrap">
                  { rankWidgets !== [''] ?
                      (
                        rankWidgets.map(profile => (
                          <CodingCard name={ReversePortalMap.get(profile.website_id.toString()).name} id={profile.website_username} rank={profile.rank} logo={ReversePortalMap.get(profile.website_id.toString()).logo} />
                        ))
                      ) : null
                  }
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
