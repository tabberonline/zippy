import React, { useState } from 'react';
import '../../styles/HelperStyles.css';
import './ContestCard.css';
import {BsThreeDotsVertical} from 'react-icons/bs';
import deleted from '../../assets/images/Bin-Icon.png';
import edited from '../../assets/images/Edit-Icon.png';
import hidden from '../../assets/images/Hide-Icon.png';
import hidecards from '../../assets/images/hiddeeen.png';

export default function ContestCard({name, rank, id, logo, contest}){

    const [ bullets, setbullets ] = useState(true);
    const [ drawer, setdrawer ] = useState(false);
    const [option1, setoption1] = useState(false);
    const [option2, setoption2] = useState(false);
    const [option3, setoption3] = useState(false);
    const [hidecard, sethide] = useState(false);
    const [icon1, seticon1] = useState(true);
    const [icon2, seticon2] = useState(true);
    const [icon3, seticon3] = useState(true);

    const OptionDrawer = () => {
        setdrawer(true);
        setbullets(false);
    }

    return(
        <div className="card11 flexColumn achievement-card">
            {
                hidecard ? (
                    <div id="overlay" onClick={() => sethide(false)} className="flexColumn flexCenter flexAlignCenter">
                        <img src={hidecards} alt="hidden" className="hide-card-icon" style={{height:30, width: 30, marginBottom: 10}} />
                        <p className="options-text" style={{color: 'white'}}>Hidden</p>
                    </div>
                ) : null
            }
            <div className="flexRow flexCenter" style={{position: 'relative'}}>
                {logo === "" ? (
                    <div className="flexRow flexCenter flexAlignCenter empty-logo">
                        <p className="profile-name" style={{fontWeight: 700, color: 'white'}}>LOGO</p>
                    </div>
                ) : (
                    <img className="logo" src={logo} alt="logo" />
                )}
                { bullets ? (
                    <div onClick={() => OptionDrawer()} className="flexRow option-drawer flexCenter flexAlignCenter iconcontainer">
                        <BsThreeDotsVertical className="portfolio-icon" size="20" />                    
                    </div>
                    ) : null 
                }
                { drawer ? (
                    <div className="flexColumn flexStart options" style={{position: 'absolute', top: '-15%', right:'-2%'}}>
                        {icon1 ? (<img src={deleted} alt="delete" onMouseEnter={() => {setoption1(true); seticon1(false);}} className="delete-icon" style={{height:30, width: 30, marginBottom: 10, marginLeft: option2 ? 50 : null || option3 ? 50 : null}} />) : null }
                        { option1 ? (
                            <div className="flexRow flexAlignCenter option delete-option" onMouseLeave={() => {setoption1(false); seticon1(true);}} style={{ marginBottom: 10, position: 'relative', left: 40 }}>
                                <img src={deleted} alt="delete" style={{height:30, width: 30, marginRight: 10}} />
                                <p className="options-text">Delete</p>
                            </div>                            
                            ) : null
                        }
                        {icon2 ? (<img src={edited} alt="edit" onMouseEnter={() => {setoption2(true); seticon2(false);}} className="edit-icon" style={{height:30, width: 30, marginBottom: 10, marginLeft: option1 ? 50 : null || option3 ? 50 : null}} />) : null}
                        { option2 ? (
                            <div className="flexRow flexAlignCenter option edit-option" onMouseLeave={() => {setoption2(false); seticon2(true);}} style={{ marginBottom: 10, position: 'relative', left: 40 }}>
                                <img src={edited} alt="edit" style={{height:30, width: 30, marginRight: 10}} />
                                <p className="options-text">Edit</p>
                            </div>
                            ) : null
                        }
                        {icon3 ? (<img src={hidden} alt="hide" onMouseEnter={() => {setoption3(true); seticon3(false);}} className="hide-icon" style={{height:30, width: 30, marginBottom: 10, marginLeft: option2 ? 50 : null || option1 ? 50 : null}} />) : null}
                        { option3 ? (
                            <div className="flexRow flexAlignCenter option hide-option" onClick={() => {sethide(true);}} onMouseLeave={() => {setoption3(false); seticon3(true);}} style={{ marginBottom: 10, position: 'relative', left: 40 }}>
                                <img src={hidden} alt="hide" style={{height:30, width: 30, marginRight: 10}} />
                                <p className="options-text">Hide</p>
                            </div>
                            ) : null
                        }
                    </div>
                    ) : null
                }
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