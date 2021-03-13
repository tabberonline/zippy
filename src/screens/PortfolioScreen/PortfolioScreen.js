import React, { useContext, useState } from 'react';
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
import SentHistoryModal from '../../components/modals/SentHistory';
import { AiOutlineCheck, AiOutlineEdit} from 'react-icons/ai';
import $ from 'jquery';
import Header1 from '../../components/Header/Header1';
import { getItem, setItem, ReversePortalMap } from '../../utility/localStorageControl';
import AdminService from '../../AdminServices/AdminService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {isMobile} from 'react-device-detect';
import AttachResumeModal from '../../components/modals/AttachResume';
import SendViaEmail from '../../components/modals/SendViaEmail';
import Loader from '../../components/Loader/Loader';
import { ProgrammerContext } from '../../utility/userContext';
const API_KEY = 'AFjzy7b0VSvCEJhKDtcQ6z';
const processAPI = 'https://cdn.filestackcontent.com';

function PortfolioScreen() {
  const [user, setUser] = useContext(ProgrammerContext);
  var title = user.portfolio.title;
  var desc = user.portfolio.description;
  const [edit1, setedit] = useState(true);
  const [edit2, setedit2] = useState(true);
  const [loader, setloader] = useState(false);

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
    setloader(true);
    UpdatePortfolio();
  } 
  const Save2 = () => {
    $(".desc").prop("readonly", true);
    setedit2(true);
    setItem('descPortfolio', desc);
    setloader(true);
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
          AdminService.getUserData()
            .then(resp => {
              setloader(false);
              setUser(prevUser => ({...prevUser,
                portfolio: resp.data.portfolio,
              }));
            })
            .catch(err => {
              toast.error("Some Error Occured.", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              })
              setloader(false);
            });
        })
        .catch(err => {
          toast.error('Error, Please retry!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setloader(false);
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
      setloader(false);
    }
  }

  return (
    <div className="#portfolio-screen">    
    {loader ? <Loader /> : null}  
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
      <Header1 open={() => setloader(true)} close={() => setloader(false)} />
      <div className="flexRow mw1100 flexBetween" style={{}}>
        <SendViaEmail />
        <SentHistoryModal />
        <ShareModal id={getItem('user_id')} />
      </div>
      <div className="mw1100">
        <div className="p-40 flexColumn portfolio-section">
          <div className="flexColumn">
            <div className="flexRow flexCenter flexAlignCenter">
              <input type="text" style={{backgroundColor: edit1 ? 'inherit' : 'white', width: '75%'}} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" className="title" defaultValue={title} onChange={(event) => title = event.target.value} placeholder="Portfolio Title" readOnly />
              <div className="flexRow flexCenter flexAlignCenter iconcontainer1" style={{left: -15, top: -15}}>
                {
                  edit1 ? <AiOutlineEdit className="portfolio-icon" onClick={()=>Edit1()} style={{cursor: 'pointer'}} />
                  : <AiOutlineCheck className="portfolio-icon" onClick={()=>Save1()} style={{cursor: 'pointer'}} />
                }
              </div>
            </div>
            <hr style={{color : '#717070', width: '80%', margin: 'auto', marginTop: 10}} />
            <div className="flexColumn info-sec">
              <p className="name mb-20 pl-20">Hello! I am <strong>{user.name}</strong></p>
              <div className="flexRow">
                <textarea style={{backgroundColor: edit2 ? 'inherit' : 'white'}} autocomplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" rows="5" className="desc" defaultValue={desc} onChange={(event) => desc = event.target.value} readOnly placeholder="Enter your College and profile description here" />
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
                { user.rank_widgets !== [''] ?
                    (
                      user.rank_widgets.map(profile => (
                        <CodingCard name={ReversePortalMap.get(profile.website_id.toString()).name} id={profile.website_username} rank={profile.rank} logo={ReversePortalMap.get(profile.website_id.toString()).logo} hide={profile.invisible} />
                      ))
                    ) : null
                }
                {
                  user.rank_widgets.length < 3 ? (
                    <CodingProfileModal />
                  ) : null
                }
              </div>
            </div>
            <div className="coding-profile mv-20">
              <p className="card-heading mb-20">Contests Won</p>
              <div className="flexRow flexWrap">
                { user.contest_widgets !== [''] ?
                    (
                      user.contest_widgets.map(profile => (
                        <ContestCard card_id={profile.id} name={ReversePortalMap.get(profile.website_id.toString()).name} id={profile.website_username} rank={profile.rank} logo={ReversePortalMap.get(profile.website_id.toString()).logo} contest={profile.contest_name} hide={profile.invisible} />
                      ))
                    ) : null
                }
                {
                  user.contest_widgets.length < 3 ? (
                    <ContestProfileModal />
                  ) : null
                }
              </div>
            </div>
            <div className="coding-profile mv-20">
              <p className="card-heading mb-20">Personal Projects</p>
              <div className="flexRow flexWrap">
                { user.project_widgets !== [''] ?
                    (
                      user.project_widgets.map(project => (
                        <ProjectCard name={project.title} url={project.link} img={`${processAPI}/${API_KEY}/urlscreenshot=agent:${isMobile ? 'mobile' : 'desktop'}/${project.link}`} id={project.id} hide={project.invisible} />
                      ))
                    ) : null
                }   
                {
                  user.project_widgets.length < 3 ? ( 
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
