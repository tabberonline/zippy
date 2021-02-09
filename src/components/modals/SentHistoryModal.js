/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import '../../styles/HelperStyles.css'
import { Modal, Form } from 'react-bootstrap';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminService from '../../AdminServices/AdminService';
import SendViaEmail from './SendViaEmail';

export default function SentHistoryModal() {
  const [modalShow, setModalShow] = React.useState(false);
  var url = "";

//   const ShareLink = async () => {
//     AdminService.getUserDataById(user_id)
//       .then(resp => {
//         const AccessID = resp.data.user_id;      
//         setUrl(`http://localhost:3000/d?id=${AccessID}`); 
//         setModalShow(true);
//       })
//       .catch(err => console.log(err));
//   }

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
              <textarea style={{fontStyle: 'Poppins', borderRadius: 32, margin: '10px 0'}} rows={5} type="text" class="form-control" defaultValue={url} placeholder="Example https://www.gdrive.com/profile/abc,.pdf" onChange={(text) => url = text} />
            </Form.Group>
          </Form>

          <span className="modal-list">• Enter a proper Gdrive/Dropbox or any cloud link.</span>
          <span className="modal-list">• Upload the file in cloud in pdf format (Recommended).</span>
  
          <SendViaEmail />
  
        </div>
      </Modal>
    );
  }

  return (
    <>
      <div className="mw1100 history">
        <button className="flexAlignCenter history-button" style={{outline: 'none'}} 
          onClick={() => setModalShow(true)}
        >
          View Sent History        
        </button>
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
