import React, {useEffect, useState} from 'react';
import '../../styles/HelperStyles.css';
import './DisplayScreen.css';
import Footer from '../../components/Footer/Footer';
import {ErrorToast, ReversePortalMap} from '../../utility/localStorageControl';
import CodingCardDisplay from '../../components/CodingCard/CodingCardDisplay';
import ContestCardDisplay from '../../components/ContestCard/ContestCardDisplay';
import ProjectCardDisplay from '../../components/ProjectCard/ProjectCardDisplay';
import {isMobile} from 'react-device-detect';
import Axios from 'axios';
import {API_ENDPOINT} from '../../AdminServices/baseUrl';
import Header1 from '../../components/Header/Header1';
import Loader from '../../components/Loader/Loader';
import { BsFillEyeFill } from 'react-icons/bs';
import { AiOutlineLinkedin } from 'react-icons/ai';
import { useHistory } from 'react-router-dom';
const API_KEY = 'AFjzy7b0VSvCEJhKDtcQ6z';
const processAPI = 'https://cdn.filestackcontent.com';


function DisplayScreen() {
  const [userData, setData] = useState([]);
  const [loader, setloader] = useState(false);
  const [RankWidgets, setRank] = useState([]);
  const [ContestWidgets, setContests] = useState([]);
  const [ProjectWidgets, setProjects] = useState([]);

  useEffect(() => {
    const getIDFromURL = () => {
      setloader(true);
      return window.location.href.split('?')[1].split('=')[1];
    };
    const user_id = getIDFromURL();

    Axios.get(`${API_ENDPOINT}/user/guest/resume?id=${user_id}`)
      .then(resp => resp.data)
        .then(data => {
          setData([data]);
          setloader(false);
          adjustData(data);
        })
      .catch(error => {
        ErrorToast("Some Error Occured.")
        setloader(false);
      })
  }, [])

  const adjustData = (data) => {
    var abc = data && data.rank_widgets && data.rank_widgets.filter(profile => profile.invisible === false);
    setRank(abc);
    abc = data && data.contest_widgets && data.contest_widgets.filter(profile => profile.invisible === false);
    setContests(abc);
    abc = data && data.personal_projects && data.personal_projects.filter(profile => profile.invisible === false);
    setProjects(abc)
  }

  return (
    <div className="#display-screen">
    {loader ? <Loader /> : null}
      <Header1 open={() => setloader(true)} close={() => setloader(false)} />
      <div className="mw1100">
        <div className="p-40 flexColumn display-section">
          {userData.map(user => (
            <div className="flexColumn" key={user.user_id}>
              <p className="title">{user.portfolio.title}</p>
              <hr style={{color : '#717070', width: '80%', margin: 'auto', marginTop: 10}} />
              <div className="flexColumn info-sec">
                <p className="name mb-20 pl-20">Hello! I am <strong>{user.name}</strong>, a student of  <strong>{user.portfolio.college.split(',')[0]}</strong>.</p>
                <p className="desc">{user.portfolio.description}</p>
              </div>
              <div className="socialsRow">
                {user.portfolio.cloud_resume_link !== '' ? (
                  <div className="flexColumn mv-20">
                    <p className="card-heading mb-20">Resume</p>
                    <div className="grow1 attach-resume flexRow flexAlignCenter flexEvenly">
                      <p className="resume-head">View Attached PDF</p>
                      <BsFillEyeFill onClick={() => window.open(user.portfolio.cloud_resume_link)} className="grow2 attach-resume__icon" />
                    </div>
                  </div>
                ) : null} 
                {user.portfolio.social_profiles[0] && user.portfolio.social_profiles[0].link !== '' ? (
                  <div className="flexColumn mv-20">
                    <p className="card-heading mb-20">LinkedIn Profile</p>
                    <div className="grow1 attach-resume flexRow flexAlignCenter flexEvenly">
                      <p className="resume-head">View LinkedIn Profile</p>
                      <AiOutlineLinkedin onClick={() => window.open(user.portfolio.social_profiles[0].link)} className="grow2 attach-resume__icon" />
                    </div>
                  </div>
                ) : null}  
              </div>                            
              {
                RankWidgets.length > 0 ? (
                  <div className="coding-profile mv-20">
                    <p className="card-heading mb-20">Coding Profile</p>
                    <div className="flexRow flexWrap">
                      { 
                        RankWidgets.map(profile => (
                            <CodingCardDisplay url={profile.link} name={ReversePortalMap.get(profile.website_id.toString()).name} id={profile.website_username} rank={profile.rank} logo={ReversePortalMap.get(profile.website_id.toString()).logo} />
                        ))
                      }
                    </div>
                  </div>
                ) : null
              }
              {
                ContestWidgets.length > 0 ? (
                  <div className="coding-profile mv-20">
                    <p className="card-heading mb-20">Coding Contests</p>
                    <div className="flexRow flexWrap">
                      { 
                        ContestWidgets.map(profile => (
                            <ContestCardDisplay card_id={profile.id} name={ReversePortalMap.get(profile.website_id.toString()).name} id={profile.website_username} rank={profile.rank} logo={ReversePortalMap.get(profile.website_id.toString()).logo} contest={profile.contest_name} />
                        ))
                      }
                    </div>
                  </div>
                ) : null
              }
              {
                ProjectWidgets.length > 0 ? (
                  <div className="coding-profile mv-20">
                    <p className="card-heading mb-20">Projects</p>
                    <div className="flexRow flexWrap">
                      { 
                        ProjectWidgets.map(project => (
                            <ProjectCardDisplay name={project.title} img={`${processAPI}/${API_KEY}/urlscreenshot=agent:${isMobile ? 'mobile' : 'desktop'}/${project.link}`} url={project.link} id={project.id} hide={project.invisible} techstack={project.tech_stack} desc={project.description} />
                        ))
                      }
                    </div>
                  </div>
                ) : null
              }
            </div>
          ))}
          <div className="flexRow end-section flexCenter ph-20 flexAlignCenter mv-40">
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
