/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import '../../styles/HelperStyles.css'
import { Modal, Form, Table, Pagination } from 'react-bootstrap';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';
import AdminService from '../../AdminServices/AdminService';
import { setItem, getItem } from '../../utility/localStorageControl';

export default function SentHistoryModal() {
    const [modalShow, setModalShow] = React.useState(false);
    const [active, setActive] = useState(1);
    var history = [];
    let items = [];
    for (let number = 1; number <= 10; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active} onClick={() => {
          setActive(number);}}>
        {number}
        </Pagination.Item>,
    );
    }

    const GetHistory = async (page, item) => {
      AdminService.SentHistory(page, item)
        .then(resp => {
          history = resp.data.mail_history;
          setItem('history', history)
        })
        .catch(err => console.log(err));
    }

  GetHistory(active ,5);

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
                {getItem('history').map((table) => (
                    <tr>
                        <td className="table-date">{table.date.split(' ')[0]}</td>
                        <td className="table-element">{table.email}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <div>
                <Pagination className="pageNumbers">
                  <Pagination.Item key="First" active={1 === active} disabled={active===1 ? true : false} onClick={() => {
                    setActive(1); 
                  }}>
                    First
                  </Pagination.Item>
                  {items}
                  <Pagination.Item key="Next" active={true} disabled={active===10 ? true : false} onClick={() => {
                    setActive(active+1); 
                  }}>
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
          <button className="flexAlignCenter history-button" style={{outline: 'none'}} onClick={() => setModalShow(true)} >
              View Sent History        
          </button>
        </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
