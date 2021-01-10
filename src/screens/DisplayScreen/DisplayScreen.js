import React, {useEffect, useState} from 'react';
import '../../styles/HelperStyles.css';
import './DisplayScreen.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import {ReversePortalMap} from '../../utility/localStorageControl';
import CodingCardDisplay from '../../components/CodingCard/CodingCardDisplay';
import ContestCardDisplay from '../../components/ContestCard/ContestCardDisplay';
import ProjectCardDisplay from '../../components/ProjectCard/ProjectCardDisplay';
import AdminService from '../../AdminServices/AdminService';

function DisplayScreen() {

  const [userData, setData] = useState([]);

  useEffect(() => {
    const getIDFromURL = () => {
      return window.location.href.split('?')[1].split('=')[1];
    };
    const user_id = getIDFromURL();

    AdminService.getUserDataById(user_id)
      .then(resp => resp.data)
        .then(data => {
          setData([data]);
        })
      .catch(error => console.log(error))
  }, [])

  console.log('bbbbbbbb', userData);

  return (
    <div className="#display-screen">
      <Header />
      <div className="mw1100">
        <div className="p-40 flexColumn display-section">
          {userData.map(user => (
            <div className="flexColumn" key={user.user_id}>
              <p className="title">{user.portfolio.title}</p>
              <hr style={{color : '#717070', width: '80%', margin: 'auto', marginTop: 10}} />
              <div className="flexColumn" style={{margin: 40, marginLeft: -20, marginBottom: 0}}>
                <p className="name mb-20 pl-20">Hello! I am <strong>{user.name}</strong></p>
                <p className="desc">{user.portfolio.description}</p>
              </div>
              {
                user.rank_widgets.length > 0 ? (
                  <div className="coding-profile mv-20">
                    <p className="card-heading mb-20">Coding Profile</p>
                    <div className="flexRow flexWrap">
                      { 
                        user.rank_widgets.map(profile => (
                          profile.invisible ? null :
                            <CodingCardDisplay name={ReversePortalMap.get(profile.website_id.toString()).name} id={profile.website_username} rank={profile.rank} logo={ReversePortalMap.get(profile.website_id.toString()).logo} />
                        ))
                      }
                    </div>
                  </div>
                ) : null
              }
              {
                user.contest_widgets.length > 0 ? (
                  <div className="coding-profile mv-20">
                    <p className="card-heading mb-20">Contests Won</p>
                    <div className="flexRow flexWrap">
                      { 
                        user.contest_widgets.map(profile => (
                          profile.invisible ? null :
                            <ContestCardDisplay card_id={profile.id} name={ReversePortalMap.get(profile.website_id.toString()).name} id={profile.website_username} rank={profile.rank} logo={ReversePortalMap.get(profile.website_id.toString()).logo} contest={profile.contest_name} />
                        ))
                      }
                    </div>
                  </div>
                ) : null
              }
              {
                user.personal_projects.length > 0 ? (
                  <div className="coding-profile mv-20">
                    <p className="card-heading mb-20">Personal Projects</p>
                    <div className="flexRow flexWrap">
                      { 
                        user.personal_projects.map(project => (
                          project.invisible ? null :
                            <ProjectCardDisplay name={project.title} img="" url={project.link} id={project.id} hide={project.invisible} />
                        ))
                      }
                    </div>
                  </div>
                ) : null
              }
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
