/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../../styles/HelperStyles.css'
import { Modal, Form } from 'react-bootstrap';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import { setItem, getItem } from '../../utility/localStorageControl';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminService from '../../AdminServices/AdminService';
import edited from '../../assets/images/Edit-Icon.png';
import { useStateValue } from '../../utility/StateProvider';

export default function UpdateProject(projectName, projectlink, projectImage, projectId) {
  const [{projects}, dispatch] = useStateValue();
  const [modalShow, setModalShow] = React.useState(false);
  var project1 = projectName;
  var url = project1.projectlink;
  var project = project1.projectName;
  var project_id = project1.projectId;

  const updateWidget = async (id) => {
    if(url.length > 0 && project.length > 0 ){
        const projectWidgetData = {
          'title' : getItem('Projectname'),
          'link' : getItem('Projectid')
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
              dispatch({
                type: "SET_PROJECTS",
                projects: response.data.personal_projects
              }); 
                setModalShow(false);
            })
            .catch(err => console.log(err));
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

  const UpdateCard = (id) => {
    setItem('Projectname', project);
    setItem('Projectid', url);
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
  
            <Form.Group controlId="formBasicPassword" className="mb-20">
              <Form.Label>Project URL</Form.Label>
              <Form.Control type="text" placeholder="http://www.google.com/" defaultValue={url} onChange={(e) => url = (e.target.value)} />
            </Form.Group>
  
            <Form.Group controlId="formBasicPassword2" className="mb-20">
              <Form.Label>Cover Image</Form.Label>
              <Form.Control type="text" placeholder="Click on “upload cover” to upload an image of less than 2MB for your website cover." />
            </Form.Group>
  
            <div className="share">
              <a className="flexAlignCenter upload-button">Upload Cover</a>
            </div>
  
          </Form>
  
          <div className="share" style={{justifyContent: 'center'}}>
            <a onClick={() => UpdateCard(project_id)} className="flexAlignCenter modal-button">Update</a>
          </div>
  
        </div>
      </Modal>
    );
  }

  return (
    <>
        <img src={edited} alt="hidden" onClick={() => setModalShow(true)} className="edit-card-icon" style={{height:30, width: 30, marginBottom: 10}} />
  
        <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
        />
    </>
  );
}