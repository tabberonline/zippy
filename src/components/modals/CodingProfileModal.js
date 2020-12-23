import React from 'react';
import '../../styles/HelperStyles.css'
import { Modal, Form } from 'react-bootstrap';
import {AiOutlineCloseCircle} from 'react-icons/ai';

function CodingProfileModal({show, onHide}) {
  return (
    <Modal
      show = {show}
      size="lg"
      centered
    >
      <div className="flexColumn">
        <div className="flexRow flexBetween flexAlignCenter mb-40">
          <div style={{width: 20}}></div>
          <h2 className="modal-head">Add Coding Profile</h2>
          <button onClick={onHide}>
            <AiOutlineCloseCircle style={{fontSize: 40, color: 'black'}} />
          </button>
        </div>
        <Form>
          <Form.Group controlId="formBasicEmail" className="mb-20">
            <Form.Label>Website Name</Form.Label>
            <Form.Control type="website" placeholder="Eg. https://www.hackerrank.com" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-20">
            <Form.Label>Your Profile ID </Form.Label>
            <Form.Control type="text" placeholder="Eg. abc_234" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Your Rank</Form.Label>
            <Form.Control type="text" placeholder="Eg. 25" />
          </Form.Group>

        </Form>

        <div className="share" style={{justifyContent: 'center'}}>
          <a href="" onClick={onHide} className="flexAlignCenter modal-button">Add to Profile</a>
        </div>

      </div>
    </Modal>
  );
}

export default CodingProfileModal;
