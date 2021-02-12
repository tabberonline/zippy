/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react';
import '../../styles/HelperStyles.css'
import { Modal, Form, Table, Pagination } from 'react-bootstrap';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import 'react-toastify/dist/ReactToastify.css';
import AdminService from '../../AdminServices/AdminService';

export default function SentHistoryModal() {
    const [modalShow, setModalShow] = React.useState(false);
    const [active, setActive] = useState(1);
    let items = [];
    for (let number = 1; number <= 10; number++) {
    items.push(
        <Pagination.Item key={number} active={number === active} onClick={() => {
          // GetHistory(active, 5); 
          setActive(number);}}>
        {number}
        </Pagination.Item>,
    );
    }

    var history = [];

    const GetHistory = async (page, item) => {
      AdminService.SentHistory(page, item)
        .then(resp => {
          history = resp.data;
        })
        .catch(err => console.log(err));
    }

    GetHistory(active ,5)

    const data = [
        {
            sr : 1,
            date : '11/29/2020',
            id : 'orn.jamaal@hudson.com'
        }, {
            sr : 2,
            date : '11/29/2020',
            id : 'orn.jamaal@hudson.com'
        }, {
            sr : 3,
            date : '11/29/2020',
            id : 'orn.jamaal@hudson.com'
        }, {
            sr : 4,
            date : '11/29/2020',
            id : 'orn.jamaal@hudson.com'
        }, {
            sr : 5,
            date : '11/29/2020',
            id : 'orn.jamaal@hudson.com'
        }, {
            sr : 6,
            date : '11/29/2020',
            id : 'orn.jamaal@hudson.com'
        }, {
            sr : 7,
            date : '11/29/2020',
            id : 'orn.jamaal@hudson.com'
        }, {
            sr : 8,
            date : '11/29/2020',
            id : 'orn.jamaal@hudson.com'
        }, 
    ]

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
                {history.map((table, index) => (
                    <tr key={index}>
                        <td className="table-date">{table.date}</td>
                        <td className="table-element">{table.id}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <div>
                <Pagination className="pageNumbers">
                  <Pagination.Item key="First" active={1 === active} disabled={active===1 ? true : false} onClick={() => {
                    setActive(1); 
                    // GetHistory(1, 5);
                  }}>
                    First
                  </Pagination.Item>
                  {items}
                  <Pagination.Item key="Next" active={true} disabled={active===10 ? true : false} onClick={() => {
                    setActive(active+1); 
                    // GetHistory(active+1, 5)
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
