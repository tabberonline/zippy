/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import '../../styles/HelperStyles.css'
import { Modal, Form } from 'react-bootstrap';
import {AiOutlinePlusCircle, AiOutlineCloseCircle, AiOutlineCloudDownload} from 'react-icons/ai';
import {BsFillEyeFill} from 'react-icons/bs'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminService from '../../AdminServices/AdminService';
import { getItem, setItem } from '../../utility/localStorageControl';

export default function AttachResumeModal() {
  const [modalShow, setModalShow] = React.useState(false);
  console.log(getItem('resumeLink'));
  var url = getItem('resumeLink');

  const ResumeAttach = async () => {
    if(url !== getItem('resumeLink')){
      setItem('resumeLink', url)
    }
    AdminService.AttachResume(url)
      .then(resp => {
        toast.success('Resume Link Added!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setModalShow(false);
      })
      .catch(err => toast.error("Some Error Occured.", {
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
            <h2 className="modal-head">Attach your Resume</h2>
            <button onClick={props.onHide}>
              <AiOutlineCloseCircle style={{fontSize: 40, color: 'black'}} />
            </button>
          </div>
          <Form>
            <Form.Group controlId="formBasicEmail" className="flexColumn mb-20">
              <Form.Label style={{fontStyle: 'Poppins'}}>Enter your Resume link in the form of PDF below</Form.Label>
              <textarea style={{fontStyle: 'Poppins', borderRadius: 32, margin: '10px 0'}} rows={5} type="text" class="form-control" defaultValue={url} placeholder="Example https://www.gdrive.com/profile/abc,.pdf" onChange={(event) => url = event.target.value} />
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
        {url.length > 0 ?
        (<div style={{display: 'flex', gap: 20}}>
          <AiOutlineCloudDownload onClick={() => setModalShow(true)} className="grow2" style={{fontSize: 40, color: '#C0C0C0', cursor: 'pointer'}} />
          <BsFillEyeFill onClick={() => window.open(url)} className="grow2" style={{fontSize: 40, color: '#C0C0C0', cursor: 'pointer'}} />
        </div>) :
        (
          <AiOutlinePlusCircle onClick={() => setModalShow(true)} className="grow2" style={{fontSize: 40, color: '#C0C0C0', cursor: 'pointer'}} />
        )}
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
