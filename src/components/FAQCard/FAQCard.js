import {React, useState} from 'react';
import './FAQCard.css';
import '../../styles/HelperStyles.css';
import {BiChevronDownCircle, BiChevronUpCircle} from 'react-icons/bi';

function FAQCard({ques, ans}){
    const [isOpen, setOpen] = useState(false);
    return (
        <div>
            <div className='faq-card' style={{backgroundColor: isOpen ? '#F2B630' : '#F2D492'}}>
                <div className="flexRow flexAlignCenter flexBetween">
                    <h1 className="faq-ques">{ques}</h1>
                    {
                        isOpen ? (
                            <BiChevronUpCircle style={{fontSize: 25}} onClick={() => setOpen(false)} />
                        ) : (
                            <BiChevronDownCircle style={{fontSize: 25}} onClick={() => setOpen(true)} />
                        )
                    }
                </div>
            </div>
            {
                isOpen ? (
                    <div className='ans-card'>
                        <p className="ans">{ans}</p>
                    </div>
                ) : null
            }
        </div>
    );
}

export default FAQCard;