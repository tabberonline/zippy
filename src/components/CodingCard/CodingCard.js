import React, { useEffect, useState } from 'react';
import '../../styles/HelperStyles.css';
import './CodingCard.css';
import {BsThreeDotsVertical} from 'react-icons/bs';
import deleted from '../../assets/images/Bin-Icon.png';
import edited from '../../assets/images/Edit-Icon.png';
import hidden from '../../assets/images/Hide-Icon.png';
import $ from 'jquery';

export default function CodingCard({name, rank, id, logo}){
        
    const [ bullets, setbullets ] = useState(true);
    const [ drawer, setdrawer ] = useState(false);
    const [option1, setoption1] = useState(false);
    const [option2, setoption2] = useState(false);
    const [option3, setoption3] = useState(false);

    useEffect(() => {
        $(".option-drawer").mouseenter(() => {
            setdrawer(true);
            setbullets(false);
            $(".options").mouseleave(() => {
                console.log("Bye");
                setdrawer(false);
                setbullets(true);
            })
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
    })
    

    return(
        <div className="card11 flexColumn profile-card">
            <div className="flexRow flexCenter">
                {logo === "" ? (
                    <div className="flexRow flexCenter flexAlignCenter empty-logo">
                        <p className="profile-name" style={{fontWeight: 700, color: 'white'}}>LOGO</p>
                    </div>
                ) : (
                    <img className="logo" src={logo} alt="logo" />
                )}
                { bullets ? (
                    <div className="flexRow option-drawer flexCenter flexAlignCenter iconcontainer" style={{top: '-15%', right:'-25%'}}>
                        <BsThreeDotsVertical className="portfolio-icon" size="20" />                    
                    </div>
                    ) : null 
                }
                { drawer ? (
                    <div className="flexColumn options" style={{position: 'relative', top: '-10%', right:'-25%'}}>
                        <img src={deleted} alt="delete" className="delete-icon" style={{height:30, width: 30, marginBottom: 10, marginLeft: option2 ? 5 : null || option3 ? 5 : null}} />
                        { option1 ? (
                            <div className="flexRow option delete-option" style={{ marginBottom: 10 }}>
                                <img src={deleted} alt="delete" style={{height:30, width: 30, marginRight: 10}} />
                                <p className="options-text">Delete</p>
                            </div>                            
                            ) : null
                        }
                        <img src={edited} alt="edit" className="edit-icon" style={{height:30, width: 30, marginBottom: 10, marginLeft: option1 ? 5 : null || option3 ? 5 : null}} />
                        { option2 ? (
                            <div className="flexRow option edit-option" style={{ marginBottom: 10 }}>
                                <img src={edited} alt="edit" style={{height:30, width: 30, marginRight: 10}} />
                                <p className="options-text">Edit</p>
                            </div>
                            ) : null
                        }
                        <img src={hidden} alt="hide" className="hide-icon" style={{height:30, width: 30, marginBottom: 10, marginLeft: option2 ? 5 : null || option1 ? 5 : null}} />
                        { option3 ? (
                            <div className="flexRow option hide-option" style={{ marginBottom: 10 }}>
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