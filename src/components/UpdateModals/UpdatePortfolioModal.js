/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import '../../styles/HelperStyles.css'
import { Form, Modal } from 'react-bootstrap';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import { ErrorToast, SuccessToast } from '../../utility/localStorageControl';
import AdminService from '../../AdminServices/AdminService';
import { useSelector, useDispatch } from 'react-redux';
import { setPortfolio, setName, userName, userPortfolio } from '../../features/user/userSlice';
import { useHistory } from 'react-router-dom';
  
  export default function UpdatePortfolioModal({open, close}) {
    const dispatch = useDispatch();
    const name = useSelector(userName);
    const portfolio = useSelector(userPortfolio);
    const [modalShow, setModalShow] = useState(false);
    var title = portfolio && portfolio.title;
    var desc = portfolio && portfolio.description;  
    var college = portfolio && portfolio.college;  
    var name11 = name;
    var other= '';

    const UpdatePortfolio = async () =>{
        if(desc.length > 0 && title.length > 0){
          const UpdatePortfolioData = {
            'title': title,
            'description': desc,
            'college': college,
            "college_others": other,
          }
          AdminService.updatePortfolio(UpdatePortfolioData)
            .then(resp => {
              SuccessToast('Details Updated!')
              AdminService.getUserData()
                .then(resp => {
                  dispatch(setPortfolio(resp.data))
                  close();
                })
                .catch(err => {
                  ErrorToast("Some Error Occured.")
                  close();
                });
            })
            .catch(err => {
              ErrorToast('Error, Please retry!')
              close();
            });
        } else {
          ErrorToast('Error, Fields cannot be empty!')
          close();
        }
        if(name11 !== name){
          AdminService.UpdateName({userName: name11})
            .then(res => {
              AdminService.getUserData()
                .then(resp => {
                  dispatch(setName(resp.data))
                  SuccessToast('Details Updated!')
                  close();
                })
                .catch(err => {
                  ErrorToast("Some Error Occured.")
                  close();
                });
              })
            .catch(err => {
              ErrorToast('Error, Please retry!')
              close();
            });
        }
      }

    const Add = () => {
      open();
      UpdatePortfolio();
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
              <h2 className="modal-head">Update Portfolio Details</h2>
              <button onClick={props.onHide}>
                <AiOutlineCloseCircle style={{fontSize: 40, color: 'black'}} />
              </button>
            </div>
            <Form>   
              <Form.Group controlId="formBasic2" className="mb-20">
                <Form.Label>Your Name<span style={{color: 'red'}}>*</span> </Form.Label>
                <Form.Control type="text" defaultValue={name11} onChange={(e) => name11 = (e.target.value)} placeholder="Enter your name" />
              </Form.Group>  
              <Form.Group controlId="formBasic1" className="mb-20">
                <Form.Label>Your Portfolio Title<span style={{color: 'red'}}>*</span> </Form.Label>
                <Form.Control type="text" defaultValue={title} onChange={(e) => title = (e.target.value)} placeholder="Eg. Web Developer, Analyst, Mechanic" />
              </Form.Group> 
              <Form.Group controlId="formBasic2">
                <Form.Label>Your College Name<span style={{color: 'red'}}>*</span></Form.Label>
                <Form.Control type="text" defaultValue={college} onChange={(e) => college = (e.target.value)} placeholder="Enter your College here" />
              </Form.Group>    
              <Form.Group controlId="formBasic2">
                <Form.Label>Your Description<span style={{color: 'red'}}>*</span></Form.Label>
                <Form.Control type="text" defaultValue={desc} onChange={(e) => desc = (e.target.value)} placeholder="Enter your short bio/description here" />
              </Form.Group>    
            </Form>
    
            <div className="share" style={{justifyContent: 'center'}}>
              <a onClick={() => Add()} className="flexAlignCenter modal-button">Update Portfolio</a>
            </div>
    
          </div>
          </Modal>
        );
      }
  
    return (
      <>
        <div className="history">
          <button className="flexAlignCenter history-button" style={{outline: 'none', marginRight: 0}} onClick={() => {setModalShow(true);}} >
              Edit Portfolio      
          </button>
        </div>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }