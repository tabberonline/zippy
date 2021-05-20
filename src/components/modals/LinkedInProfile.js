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
  let profiles= user.social_profiles;
  let status = false;
  if(profiles[0].link){
    status = true;
  }

  const LinkedInAttach = async () => {
    open();
    if(profiles){
        AdminService.SocialProfiles(profiles[0])
            .then(res => {
                toast.success('Details Entered!', {
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
                    setModalShow(false);
                    setUser(prevUser => ({...prevUser,
                      social_profiles: resp.data.portfolio.social_profiles,
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
                    status = true;
                    close();
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
                    close();
                  });
            })
            .catch(error => {
              toast.error('Error, Enter correct details!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              close();
            })
    }
  }

  const UpdateLinkedIn = async () => {
    open();
    if(profiles){
        AdminService.UpdateSocialProfiles(profiles[0])
        .then(res => {
          toast.success('Details Entered!', {
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
              setModalShow(false);
              setUser(prevUser => ({...prevUser,
                social_profiles: resp.data.portfolio.social_profiles,
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
              close();
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
              close();
            });
      })
      .catch(error => {
        toast.error('Error, Enter correct details!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        close();
      })
    }
  }

  const addProfile = (e) => {
    if(profiles[0]){
        profiles[0].link = e.target.value;
    } else{
        profiles.push({
            website_name : 'LinkedIn',
            link: e.target.value
        })
    }    
  }

  console.log(status)

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
              <input style={{fontStyle: 'Poppins', borderRadius: 32, margin: '10px 0'}} type="text" class="form-control" defaultValue={profiles[0].link} placeholder="Example https://www.linkedin.com/in/123/" onChange={(event) => addProfile(event)} />
            </Form.Group>
          </Form>

          <div className="share" style={{justifyContent: 'center'}}>
            <a className="flexAlignCenter modal-button" onClick={() => status ? UpdateLinkedIn() : LinkedInAttach()}>Add to profile</a>
          </div>
  
        </div>
      </Modal>
    );
  }

  return (
    <>
      <div className="grow1 attach-resume flexRow flexAlignCenter flexEvenly">
        <p className="resume-head">{profiles[0].website_name === 'LinkedIn' ? 'LinkedIn Profile' : 'Add your LinkedIn Profile link'}</p>
        {profiles[0] ?
        (<div style={{display: 'flex', gap: 20}}>
          <AiOutlineLink onClick={() => setModalShow(true)} className="grow2 attach-resume__icon" />
          <AiOutlineLinkedin onClick={() => window.open(profiles[0].link)} className="grow2 attach-resume__icon" />
        </div>) :
        (
          <AiOutlinePlusCircle onClick={() => setModalShow(true)} className="grow2 attach-resume__icon"/>
        )}
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        status={status}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
