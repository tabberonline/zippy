import {React} from 'react';
import './AchievementCard.css';
import '../../styles/HelperStyles.css';

function AchievementCard({name, image, desc}){
    return (
        <div className='achievement-card'>
            <div className="flexRow flexAlignCenter flexAround">
                <img src={image} alt="achievement" />
                <div className="flexColumn">
                    <h1 className="achievement-heading">{desc}</h1>
                    <h2 className="achievement-text">{name}</h2>
                </div>
            </div>
        </div>
    );
}

export default AchievementCard;