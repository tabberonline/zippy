import '../../styles/HelperStyles.css';
import './ContestCard.css';
import {BsThreeDotsVertical} from 'react-icons/bs';

export default function ContestCard({name, rank, id, logo, contest}){
    return(
        <div className="flexColumn achievement-card">
            <div className="flexRow flexCenter">
                {logo === "" ? (
                    <div className="flexRow flexCenter flexAlignCenter empty-logo">
                        <p className="profile-name" style={{fontWeight: 700, color: 'white'}}>LOGO</p>
                    </div>
                ) : (
                    <img className="logo" src={logo} alt="logo" />
                )}
                <div className="flexRow flexCenter flexAlignCenter iconcontainer" style={{top: '-15%', right:'-25%'}}>
                    <BsThreeDotsVertical className="portfolio-icon" size="20" />
                </div>
            </div>
            <p className="profile-name pl-20 mb-10"> {name === "" ? "Company Name" : name}</p>
            <div className="flexRow flexBetween"> 
            <p className="profile-name ph-20 mb-10"><span className="profile-heading">ID:</span> {id === "" ?  "Id here" : id }</p>
            <p className="profile-name ph-20 mb-10"><span className="profile-heading">Rank:</span> {rank === "" ?  "?" : rank  }</p>
            </div>
            <p className="profile-name ph-20 mb-10"><span className="profile-heading">Contest Name: </span>{contest === "" ? "Contest Name" : contest }</p>
        </div>
    );
}