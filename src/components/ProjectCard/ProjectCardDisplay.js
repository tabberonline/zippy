import React, { useState, useEffect } from 'react';
import '../../styles/HelperStyles.css';
import './ProjectCard.css';

export default function ProjectCardDisplay({name, img, url, techstack, desc}){
    const [namecard, setcard] = useState(true);
    const [detailcard, setdetail] = useState(false);   
    desc = desc.length > 120 ? desc.slice(0,120)+"..." : desc;
    techstack = techstack.map(e => e.trim());
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
                    <div onMouseEnter={() => {setcard(false); setdetail(true);}} className="flexColumn flexCenter flexAlignCenter project-textbox">
                        <p style={{cursor: 'pointer'}} className="project-name">{ name.length > 0 ? name : "Sample Webpage"}</p>
                    </div>
                ) : null
            }
            {
                detailcard ? (
                    <div onMouseLeave={() => {setdetail(false); setcard(true);}} className="flexColumn flexAlignCenter flexCenter project-textbox1">
                        <p style={{cursor: 'pointer'}} onClick={() => window.open(url)} className="project-desc textAlignCenter">{ desc.length > 0 ? desc : "Sample Description"}</p>
                        <p style={{cursor: 'pointer'}} onClick={() => window.open(url)} className="project-stack textAlignCenter">{ techstack ? (techstack.slice(0,4).join(' | ')) : "Sample Stack"}</p>
                    </div>
                ) : null
            }
        </div>
    );
}