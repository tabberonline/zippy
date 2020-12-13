import '../../styles/HelperStyles.css';
import './ProjectCard.css';

export default function ProjectCard({name, img, techstack}){
    return(
        <div className="flexColumn project-card flexEnd" 
            style={{  
                backgroundImage: `url("${img}")`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="flexColumn flexCenter flexAlignCenter project-textbox">
                <p className="project-name">{name}</p>
            </div>
        </div>
    );
}