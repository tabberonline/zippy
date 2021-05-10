/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useContext } from 'react';
import '../../styles/HelperStyles.css';
import './ProjectCard.css';
import deleted from '../../assets/images/Bin-Icon.png';
import hidden from '../../assets/images/Hide-Icon.png';
import {setItem} from '../../utility/localStorageControl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminService from '../../AdminServices/AdminService';
import UpdateProject from '../UpdateModals/UpdateProject';
import hidecards from '../../assets/images/hiddeeen.png';
import { Form, Modal } from 'react-bootstrap';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { ProgrammerContext } from '../../utility/userContext';
import { ClickAwayListener } from '@material-ui/core';

export default function ProjectCard({name, url, id, img, hide, open, close, techstack, desc}){
    const [user, setUser] = useContext(ProgrammerContext);
    var invisible = hide;
    const [namecard, setcard] = useState(true);
    const [detailcard, setdetail] = useState(false);
    const [modalShow, setModalShow] = useState(false);

    techstack = techstack ? techstack.map(e => e.trim()) : techstack;

    const HideCard = () => {
        open();
        invisible = true;
        updateWidget();
    }

    const unHideCard = () => {
        open();
        invisible = false;
        updateWidget();
    }

    const updateWidget = async () => {
        const projectWidgetData = {
            'title' : name,
            'link' : url,
            'invisible' : invisible,
            'techstack' : techstack,
            'description' : desc,
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
                .catch(err => {
                    toast.error("Some Error Occured.", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                    close();
                });
            })
            .catch(error => {
              toast.error('Error updating, Retry!', {
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
        }

        function DeleteModal(props) {
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
                    <h2 className="modal-head">Delete Card</h2>
                    <button onClick={props.onHide}>
                      <AiOutlineCloseCircle style={{fontSize: 40, color: 'black'}} />
                    </button>
                  </div>
                  <Form>
                    <Form.Group controlId="formBasicEmail" className="flexColumn mb-20">
                      <Form.Label style={{textAlign: 'center'}}>Are you sure you want to delete this card?</Form.Label>
                    </Form.Group>
                  </Form>
          
                  <div className="share" style={{justifyContent: 'center'}}>
                    <a onClick={(e) => DeleteCard(id)} className="flexAlignCenter modal-button" style={{marginRight: 10}}>Delete</a>
                    <a onClick={props.onHide} className="flexAlignCenter modal-button">Cancel</a>
                  </div>
          
                </div>
              </Modal>
            );
          }

    const DeleteCard = async (project_id) => {       
        open(); 
        setModalShow(false);
        AdminService.deleteProjectWidget(project_id)
            .then(response => {
                toast.success('Card deleted successfully!', {
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
                        setModalShow(false);
                        close();
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
                toast.error('Error, Cannot delete this card!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
                close();
            });
    }

    const DeleteCardPortal = (id) => {
        setModalShow(true);
    }

    return(
        <>
            <DeleteModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            {
                invisible ? (
                    <div className="grow1 flexColumn project-card flexEnd" 
                        style={{  
                            backgroundImage: img === "" ? null : `url("${img}")`,
                            backgroundColor: 'rgba(219,219,219,1)',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >                 
                        <div id="overlay" onClick={() => unHideCard()} className="flexColumn flexCenter flexAlignCenter">
                            <img src={hidecards} alt="hidden" className="hide-card-icon" style={{height:30, width: 30, marginBottom: 10}} />
                            <p className="options-text" style={{color: 'white'}}>Hidden</p>
                        </div>                    
                        <div onMouseEnter={() => {setcard(false); setdetail(true);}} className="flexColumn flexCenter flexAlignCenter project-textbox">
                            <p className="project-name">{ name.length > 0 ? name : "Sample Webpage"}</p>
                        </div>
                    </div>  
                ) : (
                    <div className="grow1 flexColumn project-card flexEnd" 
                        style={{  
                            backgroundImage: img === "" ? null : `url("${img}")`,
                            backgroundColor: 'rgba(219,219,219,1)',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                        }}
                    >         
                        <div onClick={() => window.open(url)} style={{fontSize: 30, position: 'absolute', top: 0, height: '60%', width: '100%', cursor: 'pointer'}} />    
                        {
                            namecard ? (
                                <div onMouseEnter={() => {setcard(false); setdetail(true);}} className="flexColumn flexCenter flexAlignCenter project-textbox">
                                    <p className="project-name">{ name.length > 0 ? name : "Sample Webpage"}</p>
                                </div>
                            ) : null
                        }
                        {
                            detailcard ? (
                                <ClickAwayListener onClickAway={() => {setdetail(false); setcard(true);}}>
                                    <div className="flexColumn flexAlignCenter project-textbox1">
                                        {/* <p style={{cursor: 'pointer'}} onClick={() => window.open(url)} className="project-name">{ name.length > 0 ? name : "Sample Webpage"}</p> */}
                                        <p style={{cursor: 'pointer'}} onClick={() => window.open(url)} className="project-desc textAlignCenter">{ desc.length > 0 ? desc = desc.length > 65 ? desc.slice(0,65)+"..." : desc : "Sample Description"}</p>
                                        <p style={{cursor: 'pointer'}} onClick={() => window.open(url)} className="project-stack textAlignCenter">{ techstack ? (techstack.slice(0,4).join(' | ')) : "Sample Stack"}</p>
                                        <div className="actionsProject flexRow flexAround flexAlignCenter">
                                            <img src={deleted} onClick={() => DeleteCardPortal(id)} alt="delete" className="delete-card-icon" style={{height:30, width: 30, marginBottom: 10, cursor: 'pointer'}} />
                                            <UpdateProject open={open} close={close} projectName={name} projectlink={url} projectImage={img} projectId={id} ProjectStack={techstack} ProjectDesc={desc}  />
                                            <img src={hidden} onClick={() => HideCard()} alt="hidden" className="delete-card-icon" style={{height:30, width: 30, marginBottom: 10, cursor: 'pointer'}} />
                                        </div>
                                    </div>
                                </ClickAwayListener>
                            ) : null
                        }
                    </div>
                )
            }
        </>
    );
}