import React, {useEffect, useState} from 'react';
import '../../styles/HelperStyles.css';
import './DisplayScreen.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import StudentA from '../../assets/Datafiles/StudentA';
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
        .then(data => setData(data))
      .catch(error => console.log(error))
  }, [])

  return (
    <div className="#display-screen">
      <Header />
      <div className="mw1100">
        <div className="p-40 flexColumn display-section">
          {StudentA.map(student => (
            <div className="flexColumn" key={student.sr}>
              <p className="title">{student.title}</p>
              <hr style={{color : '#717070', width: '80%', margin: 'auto', marginTop: 10}} />
              <div className="flexColumn" style={{margin: 40, marginLeft: -20, marginBottom: 0}}>
                <p className="name mb-20 pl-20">Hello! I am <strong>{student.name}</strong></p>
                <p className="desc">{student.desc}</p>
              </div>
              <div className="coding-profile mv-20">
                <p className="card-heading mb-20">Coding Profile</p>
                <div className="flexRow flexWrap">
                  {student.profile.map(profile => (
                    <CodingCardDisplay key={profile.sr} name={profile.name} id={profile.id} rank={profile.rank} logo={profile.logo} />
                  ))}
                </div>
              </div>
              <div className="coding-profile mv-20">
                <p className="card-heading mb-20">Contests Won</p>
                <div className="flexRow flexWrap">
                  {student.achievements.map(achievement => (
                    <ContestCardDisplay key={achievement.sr} name={achievement.name} id={achievement.id} rank={achievement.rank} logo={achievement.logo} contest={achievement.contest} />
                  ))}
                </div>
              </div>
              <div className="coding-profile mv-20">
                <p className="card-heading mb-20">Personal Projects</p>
                <div className="flexRow flexWrap">
                  {student.projects.map(project => (
                    <ProjectCardDisplay key={project.sr} name={project.name} img={project.img} techstack={project.techstack} />
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
