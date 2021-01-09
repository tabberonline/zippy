import React, { useState } from 'react';
import '../../styles/HelperStyles.css';
import './ProjectCard.css';
import deleted from '../../assets/images/Bin-Icon.png';
import {setItem} from '../../utility/localStorageControl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminService from '../../AdminServices/AdminService';
import UpdateProject from '../UpdateModals/UpdateProject';

export default function ProjectCard({name, img, url, id}){
    const [namecard, setcard] = useState(true);
    const [detailcard, setdetail] = useState(false);

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
                            <img src={deleted} onClick={() => DeleteCard(id)} alt="hidden" className="delete-card-icon" style={{height:30, width: 30, marginBottom: 10}} />
                            <UpdateProject projectName={name} projectlink={url} projectImage={img} projectId={id}/>
                        </div>
                    </div>
                ) : null
            }
        </div>
    );
}