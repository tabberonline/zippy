import React, { useEffect, useState } from 'react';
import '../../styles/HelperStyles.css';
import './PortfolioScreen.css';
import Footer from '../../components/Footer/Footer';
import CodingCard from '../../components/CodingCard/CodingCard';
import ContestCard from '../../components/ContestCard/ContestCard';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import CodingProfileModal from '../../components/modals/CodingProfileModal';
import ContestProfileModal from '../../components/modals/ContestProfileModal';
import ProjectModal from '../../components/modals/ProjectModal';
import ShareModal from '../../components/modals/ShareModal';
import { AiOutlineCheck, AiOutlineEdit, AiOutlinePlusCircle} from 'react-icons/ai';
import $ from 'jquery';
import Header1 from '../../components/Header/Header1';
import { getItem, setItem, ReversePortalMap } from '../../utility/localStorageControl';
import AdminService from '../../AdminServices/AdminService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {isMobile} from 'react-device-detect';
import AttachResumeModal from '../../components/modals/AttachResume';
const API_KEY = 'AFjzy7b0VSvCEJhKDtcQ6z';
const processAPI = 'https://cdn.filestackcontent.com';

function PortfolioScreen() {
  const [name, setname] = useState(getItem('name'));
  var title = getItem('titlePortfolio');
  var desc = getItem('descPortfolio');
  const [edit1, setedit] = useState(true);
  const [edit2, setedit2] = useState(true);
  const [rankWidgets, setrankwidgets] = useState(getItem('rankWidgets'));
  const [contestWidgets, setcontestwidgets] = useState(getItem('contestWidgets'));
  const [projectWidgets, setprojectwidgets] = useState(getItem('projectWidgets'));

  const Edit1 = () => {
    $(".title").prop("readonly", false);
    setedit(false);
  } 
  const Edit2 = () => {
    $(".desc").prop("readonly", false);
    setedit2(false);
  } 
  const Save1 = () => {
    $(".title").prop("readonly", true);
    setedit(true);
    setItem('titlePortfolio', title);
    UpdatePortfolio();
  } 
  const Save2 = () => {
    $(".desc").prop("readonly", true);
    setedit2(true);
    setItem('descPortfolio', desc);
    UpdatePortfolio();
  } 
  const UpdatePortfolio = async () =>{
    if(desc.length > 0 && title.length > 0){
      const UpdatePortfolioData = {
        'title': title,
        'description': desc,
      }
      AdminService.updatePortfolio(UpdatePortfolioData)
        .then(resp => {
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
      <div className="flexRow" style={{gap: 20, marginLeft: 'auto'}}>
        <div className="mw1100 history">
          <button className="flexAlignCenter history-button" style={{outline: 'none'}} >
              View Sent History        
          </button>
        </div>
        <ShareModal id={getItem('user_id')} />
      </div>
      <div className="mw1100">
        <div className="p-40 flexColumn portfolio-section">
          <div className="flexColumn">
            <div className="flexRow flexCenter flexAlignCenter">
              <input type="text" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" className="title" defaultValue={title} onChange={(event) => title = event.target.value} placeholder="Portfolio Title" readOnly />
              <div className="flexRow flexCenter flexAlignCenter iconcontainer1" style={{left: -15, top: -15}}>
                {
                  edit1 ? <AiOutlineEdit className="portfolio-icon" onClick={()=>Edit1()} style={{cursor: 'pointer'}} />
                  : <AiOutlineCheck className="portfolio-icon" onClick={()=>Save1()} style={{cursor: 'pointer'}} />
                }
              </div>
            </div>
            <hr style={{color : '#717070', width: '80%', margin: 'auto', marginTop: 10}} />
            <div className="flexColumn info-sec">
              <p className="name mb-20 pl-20">Hello! I am <strong>{name}</strong></p>
              <div className="flexRow">
                <textarea autocomplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" rows="5" className="desc" defaultValue={desc} onChange={(event) => desc = event.target.value} readOnly placeholder="Enter your College and profile description here" />
                <div className="flexRow flexCenter flexAlignCenter iconcontainer1" style={{left: -15, top: -15}}>
                {
                  edit2 ?<AiOutlineEdit className="portfolio-icon" onClick={()=>Edit2()} style={{cursor: 'pointer'}} />
                  : <AiOutlineCheck className="portfolio-icon" onClick={()=>Save2()} style={{cursor: 'pointer'}} />
                }
                </div>
              </div>
            </div>
            <div className="flexColumn mv-20">
              <p className="card-heading mb-20">Resume</p>
              <AttachResumeModal />
            </div>
            <div className="coding-profile mv-20">
              <p className="card-heading mb-20">Coding Profile</p>
              <div className="flexRow flexWrap">
                { rankWidgets !== [''] ?
                    (
                      rankWidgets.map(profile => (
                        <CodingCard name={ReversePortalMap.get(profile.website_id.toString()).name} id={profile.website_username} rank={profile.rank} logo={ReversePortalMap.get(profile.website_id.toString()).logo} hide={profile.invisible} />
                      ))
                    ) : null
                }
                {
                  rankWidgets.length <= 5 ? (
                    <CodingProfileModal />
                  ) : null
                }
              </div>
            </div>
            <div className="coding-profile mv-20">
              <p className="card-heading mb-20">Contests Won</p>
              <div className="flexRow flexWrap">
                { contestWidgets !== [''] ?
                    (
                      contestWidgets.map(profile => (
                        <ContestCard card_id={profile.id} name={ReversePortalMap.get(profile.website_id.toString()).name} id={profile.website_username} rank={profile.rank} logo={ReversePortalMap.get(profile.website_id.toString()).logo} contest={profile.contest_name} hide={profile.invisible} />
                      ))
                    ) : null
                }
                {
                  contestWidgets.length <= 5 ? (
                    <ContestProfileModal />
                  ) : null
                }
              </div>
            </div>
            <div className="coding-profile mv-20">
              <p className="card-heading mb-20">Personal Projects</p>
              <div className="flexRow flexWrap">
                { projectWidgets !== [''] ?
                    (
                      projectWidgets.map(project => (
                        <ProjectCard name={project.title} url={project.link} img={`${processAPI}/${API_KEY}/urlscreenshot=agent:${isMobile ? 'mobile' : 'desktop'}/${project.link}`} id={project.id} hide={project.invisible} />
                      ))
                    ) : null
                }   
                {
                  projectWidgets.length <= 5 ? ( 
                    <ProjectModal />
                  ) : null
                }             
              </div>
            </div>
          </div>
          <div className="flexRow flexCenter end-section ph-20 flexAlignCenter mv-40">
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
