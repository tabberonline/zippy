/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from 'react';
import '../../styles/HelperStyles.css'
import { Form, Modal } from 'react-bootstrap';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import { ErrorToast, getItem, setItem, SuccessToast, WarningToast } from '../../utility/localStorageControl';
import AdminService from '../../AdminServices/AdminService';
import { ProgrammerContext } from '../../utility/userContext';
  
  export default function PortfolioModal({home, open, close}) {
    const [user, setUser] = useContext(ProgrammerContext);
    const [modalShow, setModalShow] = useState(false);
    const [apicall, setcall] = useState('');
    var title = '';
    var desc = '';    

    const createPortfolio = async () => {
      if(user.token === ""){
        ErrorToast('Access Token not Retrieved!')
      } else{
        if(title && desc){
          const portfolioData = {
              'title': title,
              'picture_url': user.image,
              'description': desc
          };
          AdminService.createPortfolio(portfolioData)
            .then(resp => {
              SuccessToast('Details Entered!')
              setcall('Success');
              AdminService.getUserData()
                .then(resp => {
                  setUser(prevUser => ({...prevUser,
                    portfolio: resp.data.portfolio,
                  }));    
                  close();          
                })
                .catch(err => {
                  ErrorToast("Some Error Occured.")
                  close();
                });
            })
            .catch(err => {
              ErrorToast('Error, One User, One Portfolio!')
              close();
            });
        } else {
          ErrorToast('Error, Fields cannot be empty!')
          close();
        }
      }
    };  

    const Add = () => {
      open();
      createPortfolio();
      setModalShow(false);  
    }

    const ModalOpen = () => {
      apicall === 'Success' ? window.open('/portfolio', '_self') : setModalShow(true);
    }

    function MyVerticallyCenteredModal(props) {
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
              <h2 className="modal-head">Add Portfolio Details</h2>
              <button onClick={props.onHide}>
                <AiOutlineCloseCircle style={{fontSize: 40, color: 'black'}} />
              </button>
            </div>
            <Form>    
              <Form.Group controlId="formBasic1" className="mb-20">
                <Form.Label>Your Portfolio Title<span style={{color: 'red'}}>*</span> </Form.Label>
                <Form.Control type="text" defaultValue={title} onChange={(e) => title = (e.target.value)} placeholder="Eg. Web Developer" />
              </Form.Group>    
              <Form.Group controlId="formBasic2">
                <Form.Label>Your Description<span style={{color: 'red'}}>*</span></Form.Label>
                <Form.Control type="text" defaultValue={desc} onChange={(e) => desc = (e.target.value)} placeholder="Enter your College and profile description here" />
              </Form.Group>    
            </Form>
    
            <div className="share" style={{justifyContent: 'center'}}>
              <a onClick={() => Add()} className="flexAlignCenter modal-button">Create Portfolio</a>
            </div>
    
          </div>
          </Modal>
        );
      }
  
    return (
      <>
        {
          home ? (
            <a style={{cursor: 'pointer'}} onClick={() => {
              if(user.login){
                if(user.portfolio){
                  window.open('/portfolio', '_self');
                } else {
                  setModalShow(true);
                }
              } else{
                WarningToast('You need to Login first!');
              }
            }} className="flexAlignCenter intro-button"
          >
            Get Started
          </a>
          ) :
            (
              <button onClick={() => {
                  user.portfolio ? window.open('/portfolio', '_self') : ModalOpen()
                }} 
                className="edit-your-portfolio grow1"
              >
                {apicall === 'Success' || user.portfolio ? 'Move to your Portfolio' : 'Edit your Portfolio'}
              </button>
            )
        }
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }