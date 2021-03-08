/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useContext, useState} from 'react';
import '../../styles/HelperStyles.css'
import { Modal, Form } from 'react-bootstrap';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';
import MailPreview from '../MailPreview/MailPreview';
import { getItem, setItem } from '../../utility/localStorageControl';
import { ToastContainer, toast } from 'react-toastify';
import AdminService from '../../AdminServices/AdminService';
import { ProgrammerContext } from '../../utility/userContext';

export default function SendViaEmail() {
  const [user, setUser] = useContext(ProgrammerContext);
  const [modalShow, setModalShow] = React.useState(false);
     var mails = "";
     var resume = "";
     const resumeData = new FormData();

     const OptionalHeader = {
      'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
     }

     const handleInput = (event) => {
      resume = event.target.files[0]
     }

    const SendMail =  async () => {
      resumeData.append('file', resume)
      AdminService.sendMailwithAttachment(mails, resumeData, OptionalHeader)
        .then(resp => {
          if(resp.data.status === "success"){
            toast.success('Email Succesfully Sent!', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            setModalShow(false);
          } else{
            toast.error(resp.data.message, {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        })
        .catch(err => toast.error(
          "Some Error occured.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }));
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
              <h2 className="modal-head">Send via Email</h2>
              <button onClick={props.onHide}>
                <AiOutlineCloseCircle style={{fontSize: 40, color: 'black'}} />
              </button>
            </div>
            <Form>
              <Form.Group controlId="formBasic1" className="mb-20">
                <Form.Label>Enter the mail ID you would like to send the mail to<span style={{color: 'red'}}>*</span> </Form.Label>
                <Form.Control type="text" defaultValue={mails} onChange={(event) => mails = (event.target.value)} placeholder="example: anything@gmail.com" />
              </Form.Group>    
              <Form.Group controlId="formBasic12" className="mb-20">
                <Form.Label>Upload Resume (Optional)</Form.Label>
                <Form.Control type="file" defaultValue={resume} onChange={(event) => handleInput(event)} placeholder="Click on Upload to attach resume" />
              </Form.Group>   
            </Form>

            <div className="flexRow flexBetween">
                <div className="flexColumn">
                    <span className="modal-list">• File size should not more than 10 MB.</span>
                    <span className="modal-list">• File should be in PDF format.</span>
                </div>
            </div>
    
            <div className="share" style={{justifyContent: 'center'}}>
              <a onClick={SendMail} className="flexAlignCenter modal-button">Send Mail</a>
            </div>

            <div className="flexRow flexCenter end-section ph-20 flexAlignCenter mv-40">
                <hr style={{width: '35%', color: 'rgba(154,154,154,1)'}} />
                <p className="end-text" style={{fontSize: 16}}>Mail Preview</p>
                <hr style={{width: '35%', color: 'rgba(154,154,154,1)'}} />
            </div>

            <MailPreview />
        </div>
      </Modal>
    );
  }

  return (
    <>
      <div className="share" style={{justifyContent: 'center'}}>
        <a className="flexAlignCenter modal-button" style={{cursor: 'pointer'}} onClick={() => setModalShow(true)}>Send Email with Profile</a>
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
