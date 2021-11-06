import React, { useState } from "react";
import "../../styles/HelperStyles.css";
import "./PortfolioScreen.css";
import Footer from "../../components/Footer/Footer";
import CodingCard from "../../components/CodingCard/CodingCard";
import ContestCard from "../../components/ContestCard/ContestCard";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import CodingProfileModal from "../../components/modals/CodingProfileModal";
import ContestProfileModal from "../../components/modals/ContestProfileModal";
import ProjectModal from "../../components/modals/ProjectModal";
import ShareModal from "../../components/modals/ShareModal";
import SentHistoryModal from "../../components/modals/SentHistory";
import Header1 from "../../components/Header/Header1";
import {AiOutlineDown, AiOutlineUp} from 'react-icons/ai';
import { ReversePortalMap } from "../../utility/localStorageControl";
import { ToastContainer } from "react-toastify";
import { isMobile } from "react-device-detect";
import AttachResumeModal from "../../components/modals/AttachResume";
import SendViaEmail from "../../components/modals/SendViaEmail";
import Loader from "../../components/Loader/Loader";
import LinkedInProfileModal from "../../components/modals/LinkedInProfile";
import { useSelector } from "react-redux";
import {
  userContestWidgets,
  userCoursesTaken,
  userName,
  userPortfolio,
  userProjectWidgets,
  userRankWidgets,
} from "../../features/user/userSlice";
import UpdatePortfolioModal from "../../components/UpdateModals/UpdatePortfolioModal";
import AddCourseModal from "../../components/modals/AddCourseModal";
import { CourseCard } from "../../components/CourseCard/CourseCard";
const API_KEY = "AJYGpQcugTouk4olbrEfWz";
const processAPI = "https://cdn.filestackcontent.com";

function PortfolioScreen() {
  const portfolio = useSelector(userPortfolio);
  const name = useSelector(userName);
  const rank_widgets = useSelector(userRankWidgets);
  const contest_widgets = useSelector(userContestWidgets);
  const project_widgets = useSelector(userProjectWidgets);
  const course_widgets = useSelector(userCoursesTaken);

  let title = portfolio && portfolio.title;
  let desc = portfolio && portfolio.description;
  let college = portfolio && portfolio.college;
  let educationLevel = portfolio && portfolio.education_level;

  const [courses, showCourses] = useState(false);

  let text = "";
  educationLevel === "postgraduate"
    ? (text = "a postgraduate passout from ")
    : educationLevel === "undergraduate"
    ? (text = "an undergraduate passout from ")
    : educationLevel === "pursuing postgraduation"
    ? (text = "a postgraduate student of ")
    : educationLevel === "pursuing undergraduation"
    ? (text = "an undergraduate student of ")
    : (text = "a student of ");

  const [loader, setloader] = useState(false);

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
        <SendViaEmail
          open={() => setloader(true)}
          close={() => setloader(false)}
        />
        <SentHistoryModal />
        <UpdatePortfolioModal
          open={() => setloader(true)}
          close={() => setloader(false)}
        />
        <ShareModal
          open={() => setloader(true)}
          close={() => setloader(false)}
        />
      </div>
      <div className="mw1100">
        <div className="p-40 flexColumn portfolio-section">
          <div className="flexColumn">
            <div className="flexRow flexCenter flexAlignCenter">
              <p
                style={{ backgroundColor: "inherit", width: "75%" }}
                className="title"
              >
                {title}
              </p>
            </div>
            <hr
              style={{
                color: "#717070",
                width: "80%",
                margin: "auto",
                marginTop: 10,
              }}
            />
            <div className="flexColumn info-sec">
              <div className="flexRow  mb-20 pl-20">
                <p className="nameText">
                  Hello! I am <strong>{name}</strong>, {text}{" "}
                  <strong>{college && college.split(",")[0]}</strong>
                </p>
              </div>
              <div className="flexRow">
                <p style={{ backgroundColor: "inherit" }} className="desc">
                  {desc}
                </p>
              </div>
            </div>
            <div className="socialsRow">
              <div className="flexColumn mv-20">
                <p className="card-heading mb-20">Resume</p>
                <AttachResumeModal
                  open={() => setloader(true)}
                  close={() => setloader(false)}
                />
              </div>
              <div className="flexColumn mv-20">
                <p className="card-heading mb-20">Socials</p>
                <LinkedInProfileModal
                  open={() => setloader(true)}
                  close={() => setloader(false)}
                />
              </div>
            </div>
            <div className="courses mv-20">
              <div className="flexRow flexBetween flexAlignCenter mb-20">
                <p className="card-heading">Courses Taken</p>
                <AddCourseModal
                  open={() => setloader(true)}
                  close={() => setloader(false)}
                />
              </div>
              {course_widgets.length > 0 ? (
                <div className="flexColumn courseList grow5">
                  {!courses && course_widgets.slice(0,2).map((course) => (
                    <CourseCard
                      name={course.course_name}
                      link={course.certificate_link}
                      issuer={course.issuer}
                      open={() => setloader(true)}
                      close={() => setloader(false)}
                      id={course.id}
                      hide={course.invisible}
                    />
                  ))}
                  {courses && course_widgets.map((course) => (
                    <CourseCard
                      name={course.course_name}
                      link={course.certificate_link}
                      issuer={course.issuer}
                      id={course.id}
                      open={() => setloader(true)}
                      close={() => setloader(false)}
                      hide={course.invisible}
                    />
                  ))}
                  {
                    courses && <div className="viewCourses flexRow flexCenter" onClick={() => showCourses(false)}>
                      <div className="flexRow flexAlignCenter viewCourses__containter pointer">
                        <p className="viewCourses__text">View Less</p>
                        <AiOutlineUp />
                      </div>
                    </div>
                  }
                  {
                    !courses && course_widgets.length > 2 && <div className="viewCourses flexRow flexCenter" onClick={() => showCourses(true)}>
                      <div className="flexRow flexAlignCenter viewCourses__containter pointer">
                        <p className="viewCourses__text">View All</p>
                        <AiOutlineDown />
                      </div>
                    </div>
                  }
                </div>
              ) : (
                <div className="flexRow flexCenter flexAlignCenter courseList grow5">
                  You have not added any course yet.
                </div>
              )}  
            </div>
            <div className="coding-profile mv-20">
              <p className="card-heading mb-20">Coding Profile</p>
              <div className="flexRow flexWrap">
                {rank_widgets &&
                  rank_widgets.map((profile) => (
                    <CodingCard
                      url={profile.link}
                      open={() => setloader(true)}
                      close={() => setloader(false)}
                      name={
                        ReversePortalMap.get(profile.website_id.toString()).name
                      }
                      id={profile.website_username}
                      rank={profile.rank}
                      logo={
                        ReversePortalMap.get(profile.website_id.toString()).logo
                      }
                      hide={profile.invisible}
                    />
                  ))}
                {rank_widgets.length < 3 && (
                  <CodingProfileModal
                    open={() => setloader(true)}
                    close={() => setloader(false)}
                  />
                )}
              </div>
            </div>
            <div className="coding-profile mv-20">
              <p className="card-heading mb-20">Contests Won</p>
              <div className="flexRow flexWrap">
                {contest_widgets &&
                  contest_widgets.map((profile) => (
                    <ContestCard
                      open={() => setloader(true)}
                      close={() => setloader(false)}
                      card_id={profile.id}
                      name={
                        ReversePortalMap.get(profile.website_id.toString()).name
                      }
                      id={profile.website_username}
                      rank={profile.rank}
                      logo={
                        ReversePortalMap.get(profile.website_id.toString()).logo
                      }
                      contest={profile.contest_name}
                      hide={profile.invisible}
                    />
                  ))}
                {contest_widgets.length < 3 && (
                  <ContestProfileModal
                    open={() => setloader(true)}
                    close={() => setloader(false)}
                  />
                )}
              </div>
            </div>
            <div className="coding-profile mv-20">
              <p className="card-heading mb-20">Projects</p>
              <div className="flexRow flexWrap">
                {project_widgets &&
                  project_widgets.map((project) => (
                    <ProjectCard
                      open={() => setloader(true)}
                      close={() => setloader(false)}
                      name={project.title}
                      url={project.link}
                      img={`${processAPI}/${API_KEY}/urlscreenshot=agent:${
                        isMobile ? "mobile" : "desktop"
                      }/${project.link}`}
                      id={project.id}
                      hide={project.invisible}
                      techstack={project.tech_stack}
                      desc={project.description}
                    />
                  ))}
                {project_widgets.length < 3 && (
                  <ProjectModal
                    open={() => setloader(true)}
                    close={() => setloader(false)}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flexRow flexCenter end-section ph-20 flexAlignCenter mv-40">
            <hr style={{ width: "35%", color: "rgba(154,154,154,1)" }} />
            <p className="end-text">That's all folks</p>
            <hr style={{ width: "35%", color: "rgba(154,154,154,1)" }} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PortfolioScreen;
