/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import '../../styles/HelperStyles.css'
import { Modal, Form } from 'react-bootstrap';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import { setItem, getItem } from '../../utility/localStorageControl';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminService from '../../AdminServices/AdminService';
import edited from '../../assets/images/Edit-Icon.png';
import { ProgrammerContext } from '../../utility/userContext';

export default function UpdateProject({projectName, projectlink, ProjectDesc, ProjectStack, projectId, open, close}) {
  const [user, setUser] = useContext(ProgrammerContext);
  const [modalShow, setModalShow] = React.useState(false);
  var url = projectlink;
  var project = projectName;
  var project_id = projectId;
  var stack = ProjectStack;
  var stacks = [];
  var description = ProjectDesc;

  const updateWidget = async (id) => {
    if(url.length > 0 && project.length > 0 ){
        const projectWidgetData = {
          'title' : project,
          'link' : url,
          'tech_stack' : stacks,
          'description' : description
        }
      AdminService.updateProjectWidget(id, projectWidgetData)
        .then(response => {
          toast.success('Card Updated!', {
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
              setUser(prevUser => ({...prevUser,
                project_widgets: resp.data.personal_projects,
              }));
              close();
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
            close();
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
          close();
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
      close();
    }
  }

  const UpdateCard = (id) => {
    open();
    stacks = stack.split(',');
    description = description.length > 65 ? description.slice(0,65)+"..." : description;
    updateWidget(id);
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
            <h2 className="modal-head">Update your Project</h2>
            <button onClick={props.onHide}>
              <AiOutlineCloseCircle style={{fontSize: 40, color: 'black'}} />
            </button>
          </div>
          <Form>
            <Form.Group controlId="formBasicEmail" className="mb-20">
              <Form.Label>Project Title</Form.Label>
              <Form.Control type="text" placeholder="Eg. Automated System" defaultValue={project} onChange={(e) => project = (e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail2" className="mb-20">
              <Form.Label>Project TechStack   *Separated by Commas(",")*</Form.Label>
              <Form.Control type="text" placeholder="Eg. Arduino, IOT, React" defaultValue={stack} onChange={(e) => stack = (e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail3" className="mb-20">
              <Form.Label>Project Description</Form.Label>
              <Form.Control type="text" placeholder="Eg. Automated System does this and that" defaultValue={description} onChange={(e) => description = (e.target.value)} />
            </Form.Group>
  
            <Form.Group controlId="formBasicPassword1" className="mb-20">
              <Form.Label>Project URL</Form.Label>
              <Form.Control type="text" placeholder="http://www.google.com/" defaultValue={url} onChange={(e) => url = (e.target.value)} />
            </Form.Group>
  
          </Form>
  
          <div className="share" style={{justifyContent: 'center'}}>
            <a onClick={() => UpdateCard(projectId)} className="flexAlignCenter modal-button">Add to Profile</a>
          </div>
  
        </div>
      </Modal>
    );
  }

  return (
    <>
        <img src={edited} alt="hidden" onClick={() => setModalShow(true)} className="edit-card-icon" style={{height:30, width: 30, marginBottom: 10, cursor: 'pointer'}} />
  
        <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
        />
    </>
  );
}