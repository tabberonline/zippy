/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../../styles/HelperStyles.css'
import { Modal, Form } from 'react-bootstrap';
import {AiOutlineCloseCircle, AiOutlinePlusCircle} from 'react-icons/ai';
import { setItem, getItem } from '../../utility/localStorageControl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminService from '../../AdminServices/AdminService';

export default function ProjectModal() {
  const [modalShow, setModalShow] = React.useState(false);
  var url = '';
  var project = '';

  const createWidget = async () => {
    if(url.length > 0 && project.length > 0 ){
      const projectWidgetData = {
        'title' : getItem('Projectname'),
        'link' : getItem('Projectid')
      }
      AdminService.createProjectWidget(projectWidgetData)
        .then(response => {
          console.log(response);
          toast.success('Details Entered!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          AdminService.getUserData()
            .then(resp => {
              setItem('projectWidgets', resp.data.personal_projects);
              window.open('/portfolio', '_self');
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
        })
        .catch(error => {
          toast.error('Error, Enter correct details!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    } else {
      toast.error('Error, Fields cannot be empty!', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const UpdateCard = () => {
    setItem('Projectname', project);
    setItem('Projectid', url);
    createWidget();
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
            <h2 className="modal-head">Add your work</h2>
            <button onClick={props.onHide}>
              <AiOutlineCloseCircle style={{fontSize: 40, color: 'black'}} />
            </button>
          </div>
          <Form>
            <Form.Group controlId="formBasicEmail" className="mb-20">
              <Form.Label>Project Title</Form.Label>
              <Form.Control type="text" placeholder="Eg. Automated System" defaultValue={project} onChange={(e) => project = (e.target.value)} />
            </Form.Group>
  
            <Form.Group controlId="formBasicPassword1" className="mb-20">
              <Form.Label>Project URL</Form.Label>
              <Form.Control type="text" placeholder="http://www.google.com/" defaultValue={url} onChange={(e) => url = (e.target.value)} />
            </Form.Group>
  
          </Form>
  
          <div className="share" style={{justifyContent: 'center'}}>
            <a onClick={() => UpdateCard()} className="flexAlignCenter modal-button">Add to Profile</a>
          </div>
  
        </div>
      </Modal>
    );
  }

  return (
    <>
      <div className="grow1 flexColumn flexCenter flexAlignCenter add-card" style={{height: 280}}>
        <button onClick={() => setModalShow(true)}>
          <AiOutlinePlusCircle style={{fontSize: 80, color: '#C0C0C0'}} />
        </button>
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}