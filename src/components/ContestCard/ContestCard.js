import '../../styles/HelperStyles.css';
import './ContestCard.css';

export default function ContestCard({name, rank, id, logo, contest}){
    return(
        <div className="flexColumn achievement-card">
            <img className="logo" src={logo} alt="logo" />
            <p className="profile-name pl-20 mb-10">{name}</p>
            <div className="flexRow flexBetween"> 
            <p className="profile-name ph-20 mb-10"><span className="profile-heading">ID:</span> {id}</p>
            <p className="profile-name ph-20 mb-10"><span className="profile-heading">Rank:</span> {rank}</p>
            </div>
            <p className="profile-name ph-20 mb-10"><span className="profile-heading">Contest Name:</span> {contest}</p>
        </div>
    );
}