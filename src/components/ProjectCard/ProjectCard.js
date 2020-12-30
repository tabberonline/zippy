import React, { useState } from 'react';
import '../../styles/HelperStyles.css';
import './ProjectCard.css';
import deleted from '../../assets/images/Bin-Icon.png';
import edited from '../../assets/images/Edit-Icon.png';

export default function ProjectCard({name, img, techstack}){
    const [namecard, setcard] = useState(true);
    const [detailcard, setdetail] = useState(false);
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
                        <div className="flexRow flexBetween flexAlignCenter" style={{position: 'absolute', bottom: 30, width: '75%'}}>
                            <img src={deleted} alt="hidden" className="delete-card-icon" style={{height:30, width: 30, marginBottom: 10}} />
                            <img src={edited} alt="hidden" className="edit-card-icon" style={{height:30, width: 30, marginBottom: 10}} />
                        </div>
                    </div>
                ) : null
            }
        </div>
    );
}