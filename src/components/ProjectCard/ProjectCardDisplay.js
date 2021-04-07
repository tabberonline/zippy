import React, { useState, useEffect } from 'react';
import '../../styles/HelperStyles.css';
import './ProjectCard.css';

export default function ProjectCardDisplay({name, img, url}){
    const [namecard, setcard] = useState(true);
    return(
        <div onClick={() => window.open(url)} className="grow1 flexColumn project-card flexEnd" 
            style={{  
                backgroundImage: img === "" ? null : `url("${img}")`,
                backgroundColor: 'rgba(219,219,219,1)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                cursor: 'pointer'
            }}
        >
            {
                namecard ? (
                    <div className="flexColumn flexCenter flexAlignCenter project-textbox">
                        <p style={{cursor: 'pointer'}} onClick={() => window.open(url)} className="project-name">{ name.length > 0 ? name : "Sample Webpage"}</p>
                    </div>
                ) : null
            }
        </div>
    );
}