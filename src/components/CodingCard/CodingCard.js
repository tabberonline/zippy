import React, { useEffect, useState } from 'react';
import '../../styles/HelperStyles.css';
import './CodingCard.css';
import {BsThreeDotsVertical} from 'react-icons/bs';
import deleted from '../../assets/images/Bin-Icon.png';
import edited from '../../assets/images/Edit-Icon.png';
import hidden from '../../assets/images/Hide-Icon.png';
import hidecards from '../../assets/images/hiddeeen.png';
import $ from 'jquery';

export default function CodingCard({name, rank, id, logo, class1}){
        
    const [ bullets, setbullets ] = useState(true);
    const [ drawer, setdrawer ] = useState(false);
    const [option1, setoption1] = useState(false);
    const [option2, setoption2] = useState(false);
    const [option3, setoption3] = useState(false);
    const [hidecard, sethide] = useState(false);

    useEffect(() => {
        $(".option-drawer").on("click", () => {
            setdrawer(true);
            setbullets(false);
            // $(".options").mouseleave(() => {
            //     setdrawer(false);
            //     setbullets(true);
            // })
        })
        $(".option-drawer").on("click", () => {
            setdrawer(true);
            setbullets(false);
        })
        $(".delete-icon").mouseenter(() => {
            $(".delete-icon").hide();
            setoption1(true);
            
            $(".delete-option").mouseleave(() => {
                $(".delete-icon").show();
                setoption1(false);
            })        
        })
        $(".edit-icon").mouseenter(() => {
            $(".edit-icon").hide();
            setoption2(true);
            
            $(".edit-option").mouseleave(() => {
                $(".edit-icon").show();
                setoption2(false);
            }) 
        })
        $(".hide-icon").mouseenter(() => {
            $(".hide-icon").hide();
            setoption3(true);
            
            $(".hide-option").mouseleave(() => {
                $(".hide-icon").show();
                setoption3(false);
            }) 
        })
        $(".hide-option").on("click", () => {
            sethide(true);
            $(".hide-card-icon").on("click", () => {
                sethide(false);
            })
        })
    })
    return(
            <div className="card11 flexColumn profile-card">
                {
                    hidecard ? (
                        <div id="overlay" className="flexColumn flexCenter flexAlignCenter">
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
                        <div className="flexRow option-drawer flexCenter flexAlignCenter iconcontainer">
                            <BsThreeDotsVertical className="portfolio-icon" size="20" />                    
                        </div>
                        ) : null 
                    }
                    { drawer ? (
                        <div className="flexColumn flexStart options" style={{position: 'absolute', top: '-15%', right:'-2%'}}>
                            <img src={deleted} alt="delete" className="delete-icon" style={{height:30, width: 30, marginBottom: 10, marginLeft: option2 ? 50 : null || option3 ? 50 : null}} />
                            { option1 ? (
                                <div className="flexRow flexAlignCenter option delete-option" style={{ marginBottom: 10, position: 'relative', left: 40 }}>
                                    <img src={deleted} alt="delete" style={{height:30, width: 30, marginRight: 10}} />
                                    <p className="options-text">Delete</p>
                                </div>                            
                                ) : null
                            }
                            <img src={edited} alt="edit" className="edit-icon" style={{height:30, width: 30, marginBottom: 10, marginLeft: option1 ? 50 : null || option3 ? 50 : null}} />
                            { option2 ? (
                                <div className="flexRow flexAlignCenter option edit-option" style={{ marginBottom: 10, position: 'relative', left: 40 }}>
                                    <img src={edited} alt="edit" style={{height:30, width: 30, marginRight: 10}} />
                                    <p className="options-text">Edit</p>
                                </div>
                                ) : null
                            }
                            <img src={hidden} alt="hide" className="hide-icon" style={{height:30, width: 30, marginBottom: 10, marginLeft: option2 ? 50 : null || option1 ? 50 : null}} />
                            { option3 ? (
                                <div className="flexRow flexAlignCenter option hide-option" style={{ marginBottom: 10, position: 'relative', left: 40 }}>
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
                <p className="profile-name ph-20 mb-10"><span className="profile-heading">ID:</span> {id === "" ?  "Id here" : id }</p>
                <p className="profile-name ph-20 mb-10"><span className="profile-heading">Rank:</span> {rank === "" ?  "?" : rank  }</p>
            </div>
    );
}