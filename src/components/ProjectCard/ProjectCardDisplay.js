import React, { useState, useEffect } from 'react';
import '../../styles/HelperStyles.css';
import './ProjectCard.css';
import {isMobile} from 'react-device-detect';
const API_KEY = 'Anj637BlDTyMhOXjonqruz';
const processAPI = 'https://process.filestackapi.com';

export default function ProjectCardDisplay({name, url}){
    const [namecard, setcard] = useState(true);
    var img = "";
    useEffect(() => {
        url.length > 0 
            ? (img = `${processAPI}/${API_KEY}/urlscreenshot=agent:${isMobile ? 'mobile' : 'desktop'}/${url}`) 
            : (img = "")
    })
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
                    <div className="flexColumn flexCenter flexAlignCenter project-textbox">
                        <p className="project-name">{ name.length > 0 ? name : "Sample Webpage"}</p>
                    </div>
                ) : null
            }
        </div>
    );
}