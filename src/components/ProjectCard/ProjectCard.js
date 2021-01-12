import React, { useState, useEffect } from 'react';
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
import {isMobile} from 'react-device-detect';
const API_KEY = 'AFjzy7b0VSvCEJhKDtcQ6z';
const processAPI = 'https://cdn.filestackcontent.com';

export default function ProjectCard({name, url, id, hide}){
    var invisible = hide;
    const [namecard, setcard] = useState(true);
    const [detailcard, setdetail] = useState(false);
    var img = `${processAPI}/${API_KEY}/urlscreenshot=agent:${isMobile ? 'mobile' : 'desktop'}/${url}`;

    // useEffect(() => {
    //     var imgPortal = "";
    //     url.length > 0 
    //         ? (imgPortal = `${processAPI}/${API_KEY}/urlscreenshot=agent:${isMobile ? 'mobile' : 'desktop'}/${url}`) 
    //         : (imgPortal = "")
    // })    
    
    // console.log(url, img);

    const HideCard = () => {
        invisible = true;
        updateWidget();
    }

    const unHideCard = () => {
        invisible = false;
        updateWidget();
    }

    const updateWidget = async () => {
        const projectWidgetData = {
            'title' : name,
            'link' : url,
            'invisible': invisible
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
                    setItem('projectWidgets', resp.data.personal_projects);
                    window.open('/portfolio', '_self')
                })
                .catch(err => console.log(err));
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
            });
        }

    const DeleteCard = async (project_id) => {        
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
                        setItem('projectWidgets', resp.data.personal_projects);
                        window.open('/portfolio', '_self')
                    })
                    .catch(err => console.log(err));
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
            });
    }

    return(
        <>
            {
                invisible ? (
                    <div className="flexColumn project-card flexEnd" 
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
                            <ToastContainer
                                position="top-center"
                                autoClose={3000}
                                hideProgressBar={true}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                            />
                        </div>
                    </div>  
                ) : (
                    <div className="flexColumn project-card flexEnd" 
                        style={{  
                            backgroundImage: img === "" ? null : `url("${img}")`,
                            backgroundColor: 'rgba(219,219,219,1)',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >             
                        {
                            namecard ? (
                                <div onMouseEnter={() => {setcard(false); setdetail(true);}} className="flexColumn flexCenter flexAlignCenter project-textbox">
                                    <p className="project-name">{ name.length > 0 ? name : "Sample Webpage"}</p>
                                </div>
                            ) : null
                        }
                        {
                            detailcard ? (
                                <div onMouseLeave={() => {setdetail(false); setcard(true);}} className="flexColumn flexCenter flexAlignCenter project-textbox1">
                                    <p className="project-name">{ name.length > 0 ? name : "Sample Webpage"}</p>
                                    <ToastContainer
                                        position="top-center"
                                        autoClose={3000}
                                        hideProgressBar={true}
                                        newestOnTop={false}
                                        closeOnClick
                                        rtl={false}
                                        pauseOnFocusLoss
                                        draggable
                                        pauseOnHover
                                    />
                                    <div className="flexRow flexAround flexAlignCenter" style={{position: 'absolute', bottom: 30, width: '75%'}}>
                                        <img src={deleted} onClick={() => DeleteCard(id)} alt="delete" className="delete-card-icon" style={{height:30, width: 30, marginBottom: 10}} />
                                        <UpdateProject projectName={name} projectlink={url} projectImage={img} projectId={id}/>
                                        <img src={hidden} onClick={() => HideCard()} alt="hidden" className="delete-card-icon" style={{height:30, width: 30, marginBottom: 10}} />
                                    </div>
                                </div>
                            ) : null
                        }
                    </div>
                )
            }
        </>
    );
}