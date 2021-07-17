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
import SentHistoryModal from '../../components/modals/SentHistory';
import { AiOutlineCheck, AiOutlineEdit} from 'react-icons/ai';
import $ from 'jquery';
import Header1 from '../../components/Header/Header1';
import { setItem, ReversePortalMap, SuccessToast, ErrorToast } from '../../utility/localStorageControl';
import AdminService from '../../AdminServices/AdminService';
import { ToastContainer } from 'react-toastify';
import {isMobile} from 'react-device-detect';
import AttachResumeModal from '../../components/modals/AttachResume';
import SendViaEmail from '../../components/modals/SendViaEmail';
import Loader from '../../components/Loader/Loader';
import LinkedInProfileModal from '../../components/modals/LinkedInProfile';
import { useSelector, useDispatch } from 'react-redux';
import { setPortfolio, userContestWidgets, userName, userPortfolio, userProjectWidgets, userRankWidgets } from '../../features/user/userSlice';
const API_KEY = 'AFjzy7b0VSvCEJhKDtcQ6z';
const processAPI = 'https://cdn.filestackcontent.com';

function PortfolioScreen() {
  const portfolio = useSelector(userPortfolio);
  const name = useSelector(userName);
  const rank_widgets = useSelector(userRankWidgets);
  const contest_widgets = useSelector(userContestWidgets);
  const project_widgets = useSelector(userProjectWidgets);
  const dispatch = useDispatch();
  var title = portfolio && portfolio.title;
  var desc = portfolio && portfolio.description;
  var name11 = name;
  const [edit1, setedit] = useState(true);
  const [edit2, setedit2] = useState(true);
  const [edit3, setedit3] = useState(true);
  const [loader, setloader] = useState(false);

  const Edit1 = () => {
    $(".title").prop("readonly", false);
    setedit(false);
  } 
  const Edit2 = () => {
    $(".desc").prop("readonly", false);
    setedit2(false);
  } 
  const Edit3 = () => {
    $(".name").prop("readonly", false);
    setedit3(false);
  } 
  const Save1 = () => {
    $(".title").prop("readonly", true);
    setedit(true);
    setloader(true);
    UpdatePortfolio();
  } 
  const Save2 = () => {
    $(".desc").prop("readonly", true);
    setedit2(true);
    setloader(true);
    UpdatePortfolio();
  } 
  const Save3 = () => {
    $(".name").prop("readonly", true);
    setedit3(true);
    setloader(true);
    UpdateName();
  } 
  const UpdatePortfolio = async () =>{
    if(desc.length > 0 && title.length > 0){
      const UpdatePortfolioData = {
        'title': title,
        'description': desc,
      }
      AdminService.updatePortfolio(UpdatePortfolioData)
        .then(resp => {
          SuccessToast('Details Updated!')
          AdminService.getUserData()
            .then(resp => {
              setloader(false);
              dispatch(setPortfolio(resp.data))
            })
            .catch(err => {
              ErrorToast("Some Error Occured.")
              setloader(false);
            });
        })
        .catch(err => {
          ErrorToast('Error, Please retry!')
          setloader(false);
        });
    } else {
      ErrorToast('Error, Fields cannot be empty!')
      setloader(false);
    }
  }

  const UpdateName = async() => {
    
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
        <SendViaEmail open={() => setloader(true)} close={() => setloader(false)} />
        <SentHistoryModal open={() => setloader(true)} close={() => setloader(false)} />
        <ShareModal open={() => setloader(true)} close={() => setloader(false)} />
      </div>
      <div className="mw1100">
        <div className="p-40 flexColumn portfolio-section">
          <div className="flexColumn">
            <div className="flexRow flexCenter flexAlignCenter">
              <input type="text" style={{backgroundColor: edit1 ? 'inherit' : 'white', width: '75%'}} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" className="title" defaultValue={title} onChange={(event) => title = event.target.value} placeholder="Portfolio Title" readOnly />
              <div className="flexRow flexCenter flexAlignCenter iconcontainer1" style={{left: -15, top: -15}}>
                {
                  edit1? <AiOutlineEdit className="portfolio-icon" onClick={()=>Edit1()} style={{cursor: 'pointer'}} />
                  : <AiOutlineCheck className="portfolio-icon" onClick={()=>Save1()} style={{cursor: 'pointer'}} />
                }
              </div>
            </div>
            <hr style={{color : '#717070', width: '80%', margin: 'auto', marginTop: 10}} />
            <div className="flexColumn info-sec">
              <div className="flexRow  mb-20 pl-20">
                <p className="nameText">Hello! I am</p>
                <input type="text" style={{backgroundColor: edit3 ? 'inherit' : 'white', width: '25%'}} autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" className="name" defaultValue={name11} onChange={(event) => name11 = event.target.value} placeholder="Username" readOnly />
                <div className="flexRow flexCenter flexAlignCenter iconcontainer1" style={{left: -15, top: -15}}>
                  {
                    edit3 ? <AiOutlineEdit className="portfolio-icon" onClick={()=>Edit3()} style={{cursor: 'pointer'}} />
                    : <AiOutlineCheck className="portfolio-icon" onClick={()=>Save3()} style={{cursor: 'pointer'}} />
                  }
                </div>
              </div>
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
            <div className="socialsRow">
              <div className="flexColumn mv-20">
                <p className="card-heading mb-20">Resume</p>
                <AttachResumeModal open={() => setloader(true)} close={() => setloader(false)} />
              </div>
              <div className="flexColumn mv-20">
                <p className="card-heading mb-20">Socials</p>
                <LinkedInProfileModal open={() => setloader(true)} close={() => setloader(false)} />
              </div>
            </div>
            <div className="coding-profile mv-20">
              <p className="card-heading mb-20">Coding Profile</p>
              <div className="flexRow flexWrap">
                { rank_widgets && rank_widgets.map(profile => (
                      <CodingCard url={profile.link} open={() => setloader(true)} close={() => setloader(false)} name={ReversePortalMap.get(profile.website_id.toString()).name} id={profile.website_username} rank={profile.rank} logo={ReversePortalMap.get(profile.website_id.toString()).logo} hide={profile.invisible} />
                    ))
                }
                {
                  rank_widgets.length < 3 &&
                    <CodingProfileModal open={() => setloader(true)} close={() => setloader(false)} />
                }
              </div>
            </div>
            <div className="coding-profile mv-20">
              <p className="card-heading mb-20">Contests Won</p>
              <div className="flexRow flexWrap">
                { contest_widgets && contest_widgets.map(profile => (
                        <ContestCard open={() => setloader(true)} close={() => setloader(false)} card_id={profile.id} name={ReversePortalMap.get(profile.website_id.toString()).name} id={profile.website_username} rank={profile.rank} logo={ReversePortalMap.get(profile.website_id.toString()).logo} contest={profile.contest_name} hide={profile.invisible} />
                      ))
                }
                {
                  contest_widgets.length < 3 &&
                    <ContestProfileModal open={() => setloader(true)} close={() => setloader(false)} />
                }
              </div>
            </div>
            <div className="coding-profile mv-20">
              <p className="card-heading mb-20">Projects</p>
              <div className="flexRow flexWrap">
                { project_widgets && project_widgets.map(project => (
                        <ProjectCard open={() => setloader(true)} close={() => setloader(false)} name={project.title} url={project.link} img={`${processAPI}/${API_KEY}/urlscreenshot=agent:${isMobile ? 'mobile' : 'desktop'}/${project.link}`} id={project.id} hide={project.invisible} techstack={project.tech_stack} desc={project.description} />
                      ))
                }   
                {
                  project_widgets.length < 3 &&
                    <ProjectModal open={() => setloader(true)} close={() => setloader(false)} />
                }             
              </div>
            </div>
          </div>
          <div className="flexRow flexCenter end-section ph-20 flexAlignCenter mv-40">
            <hr style={{width: '35%', color: 'rgba(154,154,154,1)'}} />
            <p className="end-text">That's all folks</p>
            <hr style={{width: '35%', color: 'rgba(154,154,154,1)'}} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PortfolioScreen;
