import {React} from 'react';
import './FAQCard.css';
import '../../styles/HelperStyles.css';
import {BiChevronDownCircle} from 'react-icons/bi';

function FAQCard({ques, ans}){
    return (
        <div className='faq-card'>
            <div className="flexRow flexAlignCenter flexBetween">
                <h1 className="faq-ques">{ques}</h1>
                <BiChevronDownCircle style={{fontSize: 25}} />
            </div>
        </div>
    );
}

export default FAQCard;