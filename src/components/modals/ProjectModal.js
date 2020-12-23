import React from 'react';
import '../../styles/HelperStyles.css'
import { Modal, Form } from 'react-bootstrap';
import {AiOutlineCloseCircle} from 'react-icons/ai';

function ProjectModal(props) {
  console.log(props)
  return (
    <Modal
      {...props}
      size="lg"
      centered
    >
      <div className="flexColumn">
        <div className="flexRow flexBetween flexAlignCenter mb-40">
          <div style={{width: 20}}></div>
          <h2 className="modal-head">Add your work</h2>
          <button onClick={props.onHide}>
            <AiOutlineCloseCircle style={{fontSize: 40, color: 'black'}} />
          </button>
        </div>
        <Form>
          <Form.Group controlId="formBasicEmail" className="mb-20">
            <Form.Label>Website Title</Form.Label>
            <Form.Control type="website" placeholder="Eg. https://www.hackerrank.com" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-20">
            <Form.Label>Website URL</Form.Label>
            <Form.Control type="text" placeholder="http://www,google.com/" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword" className="mb-20">
            <Form.Label>Website Image</Form.Label>
            <Form.Control type="text" placeholder="Click on “upload cover” to upload an image of less than 2MB for your website cover." />
          </Form.Group>

          <div className="share">
            <a href="#" className="flexAlignCenter upload-button">Upload Cover</a>
          </div>

        </Form>

        <div className="share" style={{justifyContent: 'center'}}>
          <a href="" onClick={props.onHide} className="flexAlignCenter modal-button">Add to Profile</a>
        </div>

      </div>
    </Modal>
  );
}

export default ProjectModal;
