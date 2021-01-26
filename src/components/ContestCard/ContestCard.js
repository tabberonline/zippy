/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import '../../styles/HelperStyles.css';
import './ContestCard.css';
import {BsThreeDotsVertical} from 'react-icons/bs';
import deleted from '../../assets/images/Bin-Icon.png';
import edited from '../../assets/images/Edit-Icon.png';
import hidden from '../../assets/images/Hide-Icon.png';
import hidecards from '../../assets/images/hiddeeen.png';
import {setItem, PortalMap} from '../../utility/localStorageControl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminService from '../../AdminServices/AdminService';
import UpdateContestProfile from '../UpdateModals/UpdateContestProfile';
import { Form, Modal } from 'react-bootstrap';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export default function ContestCard({name, rank, id, logo, contest, card_id, hide}){

    const [ bullets, setbullets ] = useState(true);
    const [ drawer, setdrawer ] = useState(false);
    const [option1, setoption1] = useState(false);
    const [option2, setoption2] = useState(false);
    const [option3, setoption3] = useState(false);
    const [icon1, seticon1] = useState(true);
    const [icon2, seticon2] = useState(true);
    const [icon3, seticon3] = useState(true); 
    const [modalShow, setModalShow] = useState(false);    
    var invisible = hide;

    const OptionDrawer = () => {
        setdrawer(true);
        setbullets(false);
    }
    const CloseOptionDrawer = () => {
        setdrawer(false);
        setbullets(true);
    }

    const formatPortal = portal => {
        return portal.split(' ').join('').toLowerCase();
    }

    const updateWidget = async () => {  
        var website_name = formatPortal(name);
        var website_id = PortalMap.get(website_name).id;
        const updateWidgetData = {
            'rank' : rank,
            'website_id' : website_id,
            'username' : name,
            'contest_name' : contest,
            'invisible': invisible,
          }
        console.log(updateWidgetData);
        AdminService.updateContestWidget(card_id, updateWidgetData)
          .then(response => {
            toast.success('Card Updated!', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            AdminService.getUserData()
              .then(resp => {
                setItem('contestWidgets', resp.data.contest_widgets);
                window.open('/portfolio', '_self')
              })
              .catch(err => console.log(err));
          })
          .catch(error => {
            toast.error('Error updating!', {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      }

    const unHideCard = () => {
      invisible = false;
      updateWidget();
    }

    const HideCard = () => {
      invisible = true;
      updateWidget()
    }

    function DeleteModal(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <div className="flexColumn">
              <div className="flexRow flexBetween flexAlignCenter mb-40">
                <div style={{width: 20}}></div>
                <h2 className="modal-head">Delete Card</h2>
                <button onClick={props.onHide}>
                  <AiOutlineCloseCircle style={{fontSize: 40, color: 'black'}} />
                </button>
              </div>
              <Form>
                <Form.Group controlId="formBasicEmail" className="flexColumn mb-20">
                  <Form.Label style={{textAlign: 'center'}}>Are you sure you want to delete this card?</Form.Label>
                </Form.Group>
              </Form>
      
              <div className="share" style={{justifyContent: 'center'}}>
                <a onClick={(e) => DeleteCard(card_id)} style={{marginRight: 10}} className="flexAlignCenter modal-button">Delete</a>
                <a onClick={props.onHide} className="flexAlignCenter modal-button">Cancel</a>
              </div>
      
            </div>
          </Modal>
        );
      }

    const DeleteCard = async (card_id) => {
        
        AdminService.deleteContestWidget(card_id)
            .then(response => {
                toast.success('Card deleted successfully!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                AdminService.getUserData()
                    .then(resp => {
                      setItem('contestWidgets', resp.data.contest_widgets);
                      window.open('/portfolio', '_self')
                    })
                    .catch(err => console.log(err));
                })
            .catch(error => {
                toast.error('Error, Cannot delete this card!', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            });
    }

    const DeleteCardPortal = (card_id) => {
        setModalShow(true);
    }

    return(
        <div className="grow1 card11 flexColumn achievement-card" onMouseLeave={() => CloseOptionDrawer()}>
            {
                invisible ? (
                    <div id="overlay" onClick={() => unHideCard()} className="flexColumn flexCenter flexAlignCenter">
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
                        <BsThreeDotsVertical className="portfolio-icon" />                    
                    </div>
                    ) : null 
                }
                { drawer ? (
                    <div className="flexColumn flexStart options" style={{position: 'absolute', top: '-15%', right:'-2%'}}>
                        {icon1 ? (<img src={deleted} alt="delete" onMouseEnter={() => {setoption1(true); seticon1(false);}} className="delete-icon" style={{height:30, width: 30, marginBottom: 10, marginLeft: option2 ? 50 : null || option3 ? 50 : null}} />) : null }
                        { option1 ? (
                            <div className="flexRow flexAlignCenter option delete-option" onClick={() => DeleteCardPortal(card_id)} onMouseLeave={() => {setoption1(false); seticon1(true);}} style={{ marginBottom: 10, position: 'relative', left: 40 }}>
                                <img src={deleted} alt="delete" style={{height:30, width: 30, marginRight: 10}} />
                                <p className="options-text">Delete</p>
                            </div>                            
                            ) : null
                        }
                        {icon2 ? (<img src={edited} alt="edit" onMouseEnter={() => {setoption2(true); seticon2(false);}} className="edit-icon" style={{height:30, width: 30, marginBottom: 10, marginLeft: option1 ? 50 : null || option3 ? 50 : null}} />) : null}
                        { option2 ? (
                            <div className="flexRow flexAlignCenter option edit-option" onMouseLeave={() => {setoption2(false); seticon2(true);}} style={{ marginBottom: 10, position: 'relative', left: 40 }}>
                                <UpdateContestProfile portalName={name} Rank={rank} userName={id} id={card_id} ContestName={contest} />
                                <p className="options-text">Edit</p>
                            </div>
                            ) : null
                        }
                        {icon3 ? (<img src={hidden} alt="hide" onMouseEnter={() => {setoption3(true); seticon3(false);}} className="hide-icon" style={{height:30, width: 30, marginBottom: 10, marginLeft: option2 ? 50 : null || option1 ? 50 : null}} />) : null}
                        { option3 ? (
                            <div className="flexRow flexAlignCenter option hide-option" onClick={() => HideCard()} onMouseLeave={() => {setoption3(false); seticon3(true);}} style={{ marginBottom: 10, position: 'relative', left: 40 }}>
                                <img src={hidden} alt="hide" style={{height:30, width: 30, marginRight: 10}} />
                                <p className="options-text">Hide</p>
                            </div>
                            ) : null
                        }
                    </div>
                    ) : null
                }
            </div>
            <DeleteModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <p className="profile-head mb-10"> {name === "" ? "Company Name" : name}</p>
            <div className="flexRow flexBetween conv"> 
                <p className="profile-name ph-20 mb-10"><span className="profile-heading">ID:</span> {id === "" ?  "Id here" : id }</p>
                <p className="profile-name ph-20 mb-10"><span className="profile-heading">Rank:</span> {rank === "" ?  "?" : rank  }</p>
            </div>
            <p className="profile-name ph-20 mb-10"><span className="profile-heading">Contest Name: </span>{contest === "" ? "Contest Name" : contest }</p>
        </div>
    );
}