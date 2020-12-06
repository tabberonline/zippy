import {React} from 'react';
import './FeatureCard.css';
import '../../styles/HelperStyles.css';
import Icon from '@material-ui/core/Icon';
import { BiMedal } from 'react-icons/bi';

function FeatureCard({name, icon, desc}){
    return (
        <div className='feature-card'>
            <div className="flexColumn flexAlignCenter">
                <Icon className={icon} />
                <p className="feature-text">{name}</p>
                <p className="feature-innertext">{desc}</p>
            </div>
        </div>
    );
}

export default FeatureCard;