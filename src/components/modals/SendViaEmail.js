/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useRef} from 'react';
import '../../styles/HelperStyles.css'
import { Modal, Form } from 'react-bootstrap';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MailPreview from '../MailPreview/MailPreview';

export default function SendViaEmail() {
  const [modalShow, setModalShow] = React.useState(false);
     var mails = "";
     var resume = "";

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
                <Form.Control type="text" defaultValue={mails} onChange={(e) => mails = (e.target.value)} placeholder="example: anything@gmail.com" />
              </Form.Group>    
              <Form.Group controlId="formBasic12" className="mb-20">
                <Form.Label>Upload Resume (Optional)</Form.Label>
                <Form.Control type="text" defaultValue={resume} onChange={(e) => resume = (e.target.value)} placeholder="Click on Upload to attach resume" />
              </Form.Group>   
            </Form>

            <div className="flexRow flexBetween">
                <div className="flexColumn">
                    <span className="modal-list">• File size should not more than 10 MB.</span>
                    <span className="modal-list">• File should be in PDF format.</span>
                </div>
                <div className="grow5 share">
                    <a className="flexAlignCenter upload-button" onClick={props.onHide}>Upload</a>
                </div>
            </div>
    
            <div className="share" style={{justifyContent: 'center'}}>
              <a onClick className="flexAlignCenter modal-button">Send Mail</a>
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
        <a className="flexAlignCenter modal-button" onClick={() => setModalShow(true)}>Add to profile</a>
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
