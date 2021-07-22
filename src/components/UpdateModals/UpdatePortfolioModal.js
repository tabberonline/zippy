/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import '../../styles/HelperStyles.css'
import { Form, Modal } from 'react-bootstrap';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import { ErrorToast, SuccessToast } from '../../utility/localStorageControl';
import AdminService from '../../AdminServices/AdminService';
import { useSelector, useDispatch } from 'react-redux';
import { setPortfolio, setName, userName, userPortfolio } from '../../features/user/userSlice';
import { API_ENDPOINT } from '../../AdminServices/baseUrl';
import axios from 'axios';
  
  export default function UpdatePortfolioModal({open, close}) {
    const dispatch = useDispatch();
    const name = useSelector(userName);
    const portfolio = useSelector(userPortfolio);
    const [modalShow, setModalShow] = useState(false);
    const [collegeList, setList] = useState([]);
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
                  setModalShow(false)
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
          AdminService.UpdateName(name11)
            .then(res => {
              AdminService.getUserData()
                .then(resp => {
                  dispatch(setName(resp.data))
                  SuccessToast('Details Updated!')
                  setModalShow(false)
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

      const getUnivList = () =>{
        axios.get(`${API_ENDPOINT}/university/university_list`)
          .then(res => {
            const data = Object.values(res.data);
            setList(data);
          })
      }

    const Add = () => {
      open();
      UpdatePortfolio();
    }

    useEffect(() => {
      getUnivList()
    }, [])

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
              <Form.Group controlId="formBasicEmail" className="flexColumn mb-20">
                <Form.Label>Your College Name<span style={{color: 'red'}}>*</span></Form.Label>
                <select defaultValue={college} onChange={(e) => college = (e.target.value)}>
                  <option value="Eg. TIET, BITS" disabled>Eg. TIET, BITS, IIIT</option>
                  {collegeList.map((college, index) => (
                    <option value={index}>{college.split(',')[0]}</option>
                  ))}
                </select>
              </Form.Group> 
              <Form.Group controlId="formBasic5" className="mb-20">
                <Form.Label>If not in above list:<span style={{color: 'red'}}></span> </Form.Label>
                <Form.Control type="text" defaultValue={other} onChange={(e) => other = (e.target.value)} placeholder="Eg. Thapar University, Patiala" />
              </Form.Group>     
              <Form.Group controlId="formBasic2">
                <Form.Label>Your Description<span style={{color: 'red'}}>*</span></Form.Label>
                <Form.Control as="textarea" defaultValue={desc} onChange={(e) => desc = (e.target.value)} placeholder="Enter your short bio/description here" />
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