/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useContext, useState} from 'react';
import '../../styles/HelperStyles.css'
import { Modal, Form, Table, Pagination } from 'react-bootstrap';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';
import AdminService from '../../AdminServices/AdminService';
import { setItem, getItem } from '../../utility/localStorageControl';
import { ToastContainer, toast } from 'react-toastify';
import { ProgrammerContext } from '../../utility/userContext';

export default function SentHistoryModal() {
    const [user, setUser] = useContext(ProgrammerContext);
    const [modalShow, setModalShow] = React.useState(false);
    const [active, setActive] = useState(1);
    let items = [];
    const pages = Math.floor(user.total_mails_sent/5) + 1;
    for (let number = 1; number <= pages; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active} onClick={() => {
          setActive(number);
          GetHistory(number, 5)
          console.log(pages, active, user.sent_history);}} style={{cursor: 'pointer'}}>
        {number}
        </Pagination.Item>,
    );
    }

    const GetHistory = async (page, item) => {
      AdminService.SentHistory(page, item)
        .then(resp => {
          setUser(prevUser => ({...prevUser,
            sent_history: resp.data.mail_history,
            total_mails_sent: resp.data.total_items
          }));          
        })
        .catch(err => {toast.error("Some Error Occured.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });});
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
            <h2 className="modal-head">List of E-mail Sent History</h2>
            <button onClick={props.onHide}>
              <AiOutlineCloseCircle style={{fontSize: 40, color: 'black'}} />
            </button>
          </div>
          <Table striped bordered hover style={{borderRadius: 8}}>
                <thead>
                    <tr>
                        <th className="table-head">Date</th>
                        <th className="table-head">Email ID</th>
                    </tr>
                </thead>
                <tbody>
                {
                  props.history ? (
                  props.history.map((table) => (
                    <tr>
                        <td className="table-date">{table.date.split(' ')[0]}</td>
                        <td className="table-element">{table.email}</td>
                    </tr>
                  ))) : null
                }
                </tbody>
            </Table>
            <div>
                <Pagination className="pageNumbers">
                  <Pagination.Item key="First" active={1 === active} disabled={active === 1 ? true : false} onClick={() => {
                    setActive(active === 1 ? 1 : active-1); 
                    GetHistory(active === 1 ? 1 : active-1,5);
                    console.log(pages, active, user.sent_history);
                  }} style={{cursor: 'pointer'}}>
                    Prev
                  </Pagination.Item>
                  {items}
                  <Pagination.Item key="Next" active={true} disabled={active === pages ? true : false} onClick={() => {
                    setActive(active+1);
                    GetHistory(active+1,5);
                    console.log(pages, active, user.sent_history); 
                  }} style={{cursor: 'pointer'}}>
                    Next
                  </Pagination.Item>
                </Pagination>
            </div>
        </div>
      </Modal>
    );
  }

  return (
    <>
      <div className="history">
          <button className="flexAlignCenter history-button" style={{outline: 'none'}} onClick={() => {setModalShow(true); GetHistory(1, 5);}} >
              View Sent History        
          </button>
        </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        history = {user.sent_history}
      />
    </>
  );
}
