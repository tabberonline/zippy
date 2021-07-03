/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useContext, useState} from 'react';
import '../../styles/HelperStyles.css'
import { Modal, Form } from 'react-bootstrap';
import {AiOutlinePlusCircle, AiOutlineCloseCircle, AiOutlineLink} from 'react-icons/ai';
import {BsFillEyeFill} from 'react-icons/bs'
import AdminService from '../../AdminServices/AdminService';
import { ProgrammerContext } from '../../utility/userContext';
import { ErrorToast, SuccessToast } from '../../utility/localStorageControl';

export default function AttachResumeModal({open, close}) {
  const [user, setUser] = useContext(ProgrammerContext);
  const [modalShow, setModalShow] = React.useState(false);
  var url = user.portfolio.cloud_resume_link;

  const ResumeAttach = async () => {
    if(url !== user.portfolio.cloud_resume_link){
      setModalShow(false);
      AdminService.AttachResume(url)
        .then(resp => {
          AdminService.getUserData()
          .then(resp => {
            setModalShow(false);
            setUser(prevUser => ({...prevUser,
              portfolio: resp.data.portfolio
            }));
            if(url.length > 0){
              SuccessToast('Resume Added!');
            } else{
              SuccessToast('Resume Removed!')
            }
            
          })
          .catch(err => {
            ErrorToast("Some Error Occured.")
          });
        })
        .catch(err => {
          ErrorToast("Some Error Occured.")
        });
      } else{
          ErrorToast("Same Link.");
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
            <h2 className="modal-head">Attach your Resume</h2>
            <button onClick={props.onHide}>
              <AiOutlineCloseCircle style={{fontSize: 40, color: 'black'}} />
            </button>
          </div>
          <Form>
            <Form.Group controlId="formBasicEmail" className="flexColumn mb-20">
              <Form.Label style={{fontStyle: 'Poppins'}}>Enter your Resume link in the form of PDF below</Form.Label>
              <textarea style={{fontStyle: 'Poppins', borderRadius: 32, margin: '10px 0'}} rows={5} type="text" class="form-control" defaultValue={url ? url : ""} placeholder="Example https://www.gdrive.com/profile/abc,.pdf" onChange={(event) => url = event.target.value} />
            </Form.Group>
          </Form>

          <span className="modal-list">• Enter a proper Gdrive/Dropbox or any cloud link.</span>
          <span className="modal-list">• Upload the file in cloud in pdf format (Recommended).</span>

          <div className="share" style={{justifyContent: 'center'}}>
            <a className="flexAlignCenter modal-button" onClick={() => ResumeAttach()}>Add to profile</a>
          </div>
  
        </div>
      </Modal>
    );
  }

  return (
    <>
      <div className="grow1 attach-resume flexRow flexAlignCenter flexEvenly">
        <p className="resume-head">{url ? 'View attached PDF' : 'Attach your Resume'}</p>
        {url && <div style={{display: 'flex', gap: 20}}>
          <AiOutlineLink onClick={() => setModalShow(true)} className="grow2 attach-resume__icon" />
          <BsFillEyeFill onClick={() => window.open(url)} className="grow2 attach-resume__icon" />
        </div>}
        {!url &&
          <AiOutlinePlusCircle onClick={() => setModalShow(true)} className="grow2 attach-resume__icon"/>
        }
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
