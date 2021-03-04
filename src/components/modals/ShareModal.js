/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useRef, useContext} from 'react';
import '../../styles/HelperStyles.css'
import { Modal, Form } from 'react-bootstrap';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminService from '../../AdminServices/AdminService';
import { ProgrammerContext } from '../../utility/userContext';

export default function ShareModal({id}) {
  const [user, setUser] = useContext(ProgrammerContext);
  const [modalShow, setModalShow] = React.useState(false);
  const url = `http://localhost:3000/d?id=${user.user_id}`;
  const textAreaRef = useRef(null);

  const CopyText = (e) => {
    textAreaRef.current.select();
    document.execCommand('copy');
    toast.success('Link Copied!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setModalShow(false);
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
            <h2 className="modal-head">Share Portfolio</h2>
            <button onClick={props.onHide}>
              <AiOutlineCloseCircle style={{fontSize: 40, color: 'black'}} />
            </button>
          </div>
          <Form>
            <Form.Group controlId="formBasicEmail" className="flexColumn mb-20">
              <Form.Label>Just copy and share this simple link !</Form.Label>
              <input type="text" class="form-control" ref={textAreaRef} defaultValue={url} placeholder="https://tabber.com/123" readOnly />
            </Form.Group>
          </Form>
  
          <div className="share" style={{justifyContent: 'center'}}>
            <a onClick={(e) => CopyText(e)} className="flexAlignCenter modal-button">Copy Link</a>
          </div>
  
        </div>
      </Modal>
    );
  }

  return (
    <>
      <div className="share">
        <button className="flexAlignCenter share-button" style={{outline: 'none'}} onClick={() => {setModalShow(true);}}>
          Share        
        </button>
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
