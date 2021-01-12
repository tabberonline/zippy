import React, { useState } from 'react';
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
import {AiOutlineEdit} from 'react-icons/ai';
import $ from 'jquery';
import Header1 from '../../components/Header/Header1';
import { getItem, setItem, ReversePortalMap } from '../../utility/localStorageControl';
import AdminService from '../../AdminServices/AdminService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {isMobile} from 'react-device-detect';
import { useStateValue } from '../../utility/StateProvider';
const API_KEY = 'AFjzy7b0VSvCEJhKDtcQ6z';
const processAPI = 'https://cdn.filestackcontent.com';

function PortfolioScreen() {
  const[{ name, rankWidgets, contestWidgets, projects, user_id }, dispatch] = useStateValue();
  const [title, settitle] = useState(getItem('titlePortfolio'));
  const [desc, setdesc] = useState(getItem('descPortfolio'));
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
      <ShareModal id={user_id} />
      <div className="mw1100">
        <div className="p-40 flexColumn portfolio-section">
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
                { projects !== [''] ?
                    (
                      projects.map(project => (
                        <ProjectCard name={project.title} url={project.link} img={`${processAPI}/${API_KEY}/urlscreenshot=agent:${isMobile ? 'mobile' : 'desktop'}/${project.link}`} id={project.id} hide={project.invisible} />
                      ))
                    ) : null
                }   
                {
                  projects.length <= 5 ? ( 
                    <ProjectModal />
                  ) : null
                }             
              </div>
            </div>
          </div>
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
