/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import '../../styles/HelperStyles.css'
import { Modal, Form } from 'react-bootstrap';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import AdminService from '../../AdminServices/AdminService';

export default function ShareModal({id}) {
  const [modalShow, setModalShow] = React.useState(false);
  var user_id = id;
  const [url, setUrl] = useState('');

  const ShareLink = async () => {
    AdminService.getUserDataById(user_id)
      .then(resp => {
        const AccessID = resp.data.user_id;      
        setUrl(`http://localhost:3000/display?id=${AccessID}`); 
        setModalShow(true);
      })
      .catch(err => console.log(err));
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
              <input type="text" class="form-control" defaultValue={url} placeholder="https://tabber.com/123" readOnly />
            </Form.Group>
          </Form>
  
          <div className="share" style={{justifyContent: 'center'}}>
            <a onClick={props.onHide} className="flexAlignCenter modal-button">Copy Link</a>
          </div>
  
        </div>
      </Modal>
    );
  }

  return (
    <>
      <div className="mw1100 share">
        <button className="flexAlignCenter share-button" style={{outline: 'none'}} onClick={() => ShareLink()}>
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
