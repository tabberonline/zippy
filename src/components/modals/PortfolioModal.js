/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import '../../styles/HelperStyles.css'
import { Form, Modal } from 'react-bootstrap';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import { getItem, setItem } from '../../utility/localStorageControl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminService from '../../AdminServices/AdminService';
  
  export default function PortfolioModal({home}) {
    const [modalShow, setModalShow] = useState(false);
    const [apicall, setcall] = useState('');
    var name = '';
    var title = '';
    var desc = '';    

    const createPortfolio = async () => {
      const accessToken = getItem('access_token');
      if(accessToken === ""){
        toast.error('Access Token not Retrieved!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      } else{
        if(title.length > 0 && desc.length > 0){
          const portfolioData = {
              'title': getItem('titlePortfolio'),
              'picture_url': getItem('image'),
              'description': getItem('descPortfolio')
          };
          AdminService.createPortfolio(portfolioData)
            .then(resp => {
              toast.success('Details Entered!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setcall('Success');
              AdminService.getUserData()
                .then(resp => {
                  setItem('portfolio', resp.data.resume_present);
                  setModalShow(false);
                })
                .catch(err => console.log(err));
            })
            .catch(err => {
              toast.error('Error, One User, One Portfolio!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
            });
        } else {
          toast.error('Error, Fields cannot be empty!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      }
    };  

    const Add = () => {
      setItem('name', name);
      setItem('titlePortfolio', title);
      setItem('descPortfolio', desc);
      createPortfolio();
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
                <Form.Label>Your Name<span style={{color: 'red'}}>*</span> </Form.Label>
                <Form.Control type="text" defaultValue={name} onChange={(e) => name = (e.target.value)} placeholder="Eg. Aarav Bansal" />
              </Form.Group>    
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
            <a onClick={() => {
              if(getItem('login')){
                if(getItem('portfolio')){
                  window.open('/portfolio', '_self');
                } else {
                  setModalShow(true);
                }
              } else{
                toast.warning('You need to Login first!', {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
            }} className="flexAlignCenter intro-button"
          >
            Get Started
          </a>
          ) :
            (
              <button onClick={() => {
                  getItem('portfolio') ? window.open('/portfolio', '_self') : ModalOpen()
                }} 
                className="edit-your-portfolio"
              >
                {apicall === 'Success' || getItem('portfolio') ? 'Move to your Portfolio' : 'Edit your Portfolio'}
              </button>
            )
        }
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    );
  }