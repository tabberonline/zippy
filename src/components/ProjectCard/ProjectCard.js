import '../../styles/HelperStyles.css';
import './ProjectCard.css';

export default function ProjectCard({name, img, techstack}){
    return(
        <div className="flexColumn project-card flexEnd" 
            style={{  
                backgroundImage: img === "" ? null : `url("${img}")`,
                backgroundColor: 'rgba(219,219,219,1)',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="flexColumn flexCenter flexAlignCenter project-textbox">
                <p className="project-name">{ name.length > 0 ? name : "Sample Webpage"}</p>
            </div>
        </div>
    );
}