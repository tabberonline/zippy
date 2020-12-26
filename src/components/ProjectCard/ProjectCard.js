import '../../styles/HelperStyles.css';
import './ProjectCard.css';
import {BsThreeDotsVertical} from 'react-icons/bs';

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
            <div className="flexRow flexCenter flexAlignCenter iconcontainer" style={{top: '-50%', left: '90%'}}>
                <BsThreeDotsVertical className="portfolio-icon" size="20" />
            </div>
            <div className="flexColumn flexCenter flexAlignCenter project-textbox">
                <p className="project-name">{ name.length > 0 ? name : "Sample Webpage"}</p>
            </div>
        </div>
    );
}