/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import '../../styles/HelperStyles.css';
import './CodingCard.css';
import {BsThreeDotsVertical} from 'react-icons/bs';
import deleted from '../../assets/images/Bin-Icon.png';
import edited from '../../assets/images/Edit-Icon.png';
import hidden from '../../assets/images/Hide-Icon.png';
import hidecards from '../../assets/images/hiddeeen.png';
import {setItem, getItem, PortalMap} from '../../utility/localStorageControl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminService from '../../AdminServices/AdminService';
import UpdateCodingProfile from '../UpdateModals/UpdateCodingProfile';
import { Modal } from 'react-bootstrap';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Form } from 'react-bootstrap';

export default function CodingCard({name, rank, id, logo, hide}){        
    var invisible = hide;
    const [ bullets, setbullets ] = useState(true);
    const [ drawer, setdrawer ] = useState(false);
    const [option1, setoption1] = useState(false);
    const [option2, setoption2] = useState(false);
    const [option3, setoption3] = useState(false);
    const [icon1, seticon1] = useState(true);
    const [icon2, seticon2] = useState(true);
    const [icon3, seticon3] = useState(true);
    const [modalShow, setModalShow] = React.useState(false);

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

    const updateRankWidget = async (name) => {        
          var website_name = formatPortal(name);
          var website_id = PortalMap.get(website_name).id;
          const rankWidgetData = {
            'website_id' : website_id,
            'rank' : rank,
            'username': id,
            'invisible' : invisible,
          }
          console.log(rankWidgetData);
          AdminService.updateRankWidget(rankWidgetData)
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
                  setItem('rankWidgets', resp.data.rank_widgets);
                  window.open('/portfolio', '_self')
                })
                .catch(err => toast.error("Some Error Occured.", {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                }));
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

      const unHideCard = (name) => {
        invisible = false;
        updateRankWidget(name);
      }
  
      const HideCard = (name) => {
        invisible = true;
        updateRankWidget(name)
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
                <a onClick={(e) => {DeleteCard(name); setModalShow(false); }} style={{marginRight: 10}} className="flexAlignCenter modal-button">Delete</a>
                <a onClick={props.onHide} className="flexAlignCenter modal-button">Cancel</a>
              </div>
      
            </div>
          </Modal>
        );
      }

    const DeleteCard = async (name) => {
        var website_name = formatPortal(name);
        var website_id = PortalMap.get(website_name).id;

        AdminService.deleteRankWidget(website_id)
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
                      setItem('rankWidgets', resp.data.rank_widgets);
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

    const DeleteCardPortal = (name) => {
        setModalShow(true);
    }

    return(
            <div className="grow1 card11 flexColumn profile-card" onMouseLeave={() => CloseOptionDrawer()}>
                {
                    invisible ? (
                        <div id="overlay" onClick={() => unHideCard(name)} className="flexColumn flexCenter flexAlignCenter">
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
                            {icon1 ? (<img src={deleted} alt="delete" onMouseEnter={() => {setoption1(true); seticon1(false);}} onClick={() => DeleteCardPortal(name)} className="delete-icon" style={{height:30, width: 30, marginBottom: 10, cursor: 'pointer', marginLeft: option2 ? 50 : null || option3 ? 50 : null}} />) : null }
                            { option1 ? (
                                <div className="flexRow flexAlignCenter option delete-option" onClick={() => DeleteCardPortal(name)} onMouseLeave={() => {setoption1(false); seticon1(true);}} style={{ marginBottom: 10, position: 'relative', left: 40, cursor: 'pointer' }}>
                                    <img src={deleted} alt="delete" style={{height:30, width: 30, marginRight: 10}} />
                                    <p className="options-text">Delete</p>
                                </div>                            
                                ) : null
                            }
                            {icon2 ? (<img src={edited} alt="edit" onMouseEnter={() => {setoption2(true); seticon2(false);}} className="edit-icon" style={{height:30, width: 30, marginBottom: 10, cursor: 'pointer', marginLeft: option1 ? 50 : null || option3 ? 50 : null}} />) : null}
                            { option2 ? (
                                <div className="flexRow flexAlignCenter option edit-option" onMouseLeave={() => {setoption2(false); seticon2(true);}} style={{ marginBottom: 10, position: 'relative', left: 40, cursor: 'pointer' }}>
                                    <UpdateCodingProfile portalName={name} Rank={rank} userName={id} />
                                    <p className="options-text">Edit</p>
                                </div>
                                ) : null
                            }
                            {icon3 ? (<img src={hidden} alt="hide" onMouseEnter={() => {setoption3(true); seticon3(false);}} className="hide-icon" style={{height:30, width: 30, marginBottom: 10, cursor: 'pointer', marginLeft: option2 ? 50 : null || option1 ? 50 : null}} />) : null}
                            { option3 ? (
                                <div className="flexRow flexAlignCenter option hide-option" onClick={() => HideCard(name)} onMouseLeave={() => {setoption3(false); seticon3(true);}} style={{ marginBottom: 10, position: 'relative', left: 40, cursor: 'pointer' }}>
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
                <p className="profile-name ph-20 mb-10"><span className="profile-heading">ID:</span> {id === "" ?  "Id here" : id }</p>
                <p className="profile-name ph-20 mb-10"><span className="profile-heading">Rank:</span> {rank === "" ?  "?" : rank  }</p>
            </div>
    );
}