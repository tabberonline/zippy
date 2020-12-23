import React from 'react';
import '../../styles/HelperStyles.css'
import { Modal, Form } from 'react-bootstrap';
import {AiOutlineCloseCircle} from 'react-icons/ai';

function ShareModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
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
            <input type="text" class="form-control" defaultValue="https://tabber.com/123" />
          </Form.Group>
        </Form>

        <div className="share" style={{justifyContent: 'center'}}>
          <a href="#" onClick={props.onHide} className="flexAlignCenter modal-button">Copy Link</a>
        </div>

      </div>
    </Modal>
  );
}

export default ShareModal;
