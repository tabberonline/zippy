/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useContext, useState} from 'react';
import '../../styles/HelperStyles.css'
import { Modal, Form } from 'react-bootstrap';
import {AiOutlinePlusCircle, AiOutlineCloseCircle, AiOutlineLink, AiOutlineLinkedin} from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminService from '../../AdminServices/AdminService';
import { ProgrammerContext } from '../../utility/userContext';

export default function LinkedInProfileModal({open, close}) {
  const [user, setUser] = useContext(ProgrammerContext);
  const [modalShow, setModalShow] = React.useState(false);
  let profile_link = '';
  if(user.portfolio && user.portfolio.social_profiles){
    profile_link = user.portfolio.social_profiles[0].link;
  }
  const LinkedInAttach = async () => {
    if(!user.portfolio.social_profiles){
      AdminService.SocialProfiles({
        website_name: 'LinkedIn',
        link: profile_link
      })
        .then(res => {
            AdminService.getUserData()
              .then(resp => {
                setModalShow(false);
                setUser(prevUser => ({...prevUser,
                  portfolio: resp.data.portfolio
                }));
                toast.success('Details Added!', {
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
                toast.error("Some Error Occured.", {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                })
              });
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
          });
    } else{
      AdminService.UpdateSocialProfiles({
        website_name: 'LinkedIn',
        link: profile_link
      })
        .then(res => {     
            AdminService.getUserData()
              .then(resp => {
                setModalShow(false);
                setUser(prevUser => ({...prevUser,
                  portfolio: resp.data.portfolio
                }));
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
                toast.error("Some Error Occured.", {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                })
              });
          })
          .catch(err => {
            toast.error("User Profile doesn't exist.", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          })
    }    
  }

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="flexColumn">
          <div className="flexRow flexBetween flexAlignCenter mb-40">
            <div style={{width: 20}}></div>
            <h2 className="modal-head">LinkedIn Profile</h2>
            <button onClick={props.onHide}>
              <AiOutlineCloseCircle style={{fontSize: 40, color: 'black'}} />
            </button>
          </div>
          <Form>
            <Form.Group controlId="formBasicEmail" className="flexColumn mb-20">
              <Form.Label style={{fontStyle: 'Poppins'}}>Enter your LinkedIn Profile link here</Form.Label>
              <input style={{fontStyle: 'Poppins', borderRadius: 32, margin: '10px 0'}} type="text" class="form-control" defaultValue={profile_link ? profile_link : ""} placeholder="Example https://www.linkedin.com/in/123/" onChange={(event) => profile_link = (event.target.value)} />
            </Form.Group>
          </Form>

          <div className="share" style={{justifyContent: 'center'}}>
            <a className="flexAlignCenter modal-button" onClick={() => LinkedInAttach()}>Add to profile</a>
          </div>
  
        </div>
      </Modal>
    );
  }

  return (
    <>
      <div className="grow1 attach-resume flexRow flexAlignCenter flexEvenly">
        <p className="resume-head">{profile_link ? 'LinkedIn Profile' : 'Add your LinkedIn Profile link'}</p>
        {profile_link ?
          (<div style={{display: 'flex', gap: 20}}>
            <AiOutlineLink onClick={() => setModalShow(true)} className="grow2 attach-resume__icon" />
            <AiOutlineLinkedin onClick={() => window.open(profile_link)} className="grow2 attach-resume__icon" />
          </div>) :
          (
            <AiOutlinePlusCircle onClick={() => setModalShow(true)} className="grow2 attach-resume__icon"/>
          )
        }
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
