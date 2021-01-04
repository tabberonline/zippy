/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../../styles/HelperStyles.css'
import { Form, Modal } from 'react-bootstrap';
import AdminService from '../../AdminServices/AdminService';
import {AiOutlineCloseCircle, AiOutlinePlusCircle} from 'react-icons/ai';
import { getItem, setItem } from '../../utility/localStorageControl';
import Axios from 'axios';
const API_ENDPOINT = 'https://whispering-eyrie-04211.herokuapp.com';
  
  export default function CodingProfileModal() {
    const [modalShow, setModalShow] = React.useState(false);
    const [name, setname] = React.useState('');
    const [desc, setdesc] = React.useState('');
    const [title, settitle] = React.useState('');

    const accessToken = getItem('access_token');

    const createPortfolio = async () => {
        console.log('3rd call', getItem('access_token'));
        // if (name.length > 0 & title.length > 0 & desc.length > 0 ){
            const portfolioData = {
                'title': getItem('title'),
                'picture_url': getItem('image'),
                'description': getItem('desc')
            };
            Axios.post(`${API_ENDPOINT}/portfolio/create`, portfolioData, {headers : {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            }})
              .then(resp => {
                console.log('Response',resp);
              })
              .catch(err => {
                console.log('Error',err.response);
              })
        // }
    };

    const Add = () => {
      setItem('title', title);
      setItem('desc', desc);
      createPortfolio();
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
              <Form.Group controlId="formBasicEmail" className="mb-20">
                <Form.Label>Name<span style={{color: 'red'}}>*</span></Form.Label>
                <Form.Control type="text" defaultValue={name} onChange={(e) => setname(e.target.value)} placeholder="Eg. Aarav Bansal" />
              </Form.Group>
    
              <Form.Group controlId="formBasic1" className="mb-20">
                <Form.Label>Your Portfolio Title<span style={{color: 'red'}}>*</span> </Form.Label>
                <Form.Control type="text" defaultValue={title} onChange={(e) => settitle(e.target.value)} placeholder="Eg. Web Developer" />
              </Form.Group>
    
              <Form.Group controlId="formBasic2">
                <Form.Label>Your Description<span style={{color: 'red'}}>*</span></Form.Label>
                <Form.Control type="text" defaultValue={desc} onChange={(e) => setdesc(e.target.value)} placeholder="Enter your College and profile description here" />
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
        <button onClick={() => setModalShow(true)} className="edit-your-portfolio">Edit your Portfolio</button>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }