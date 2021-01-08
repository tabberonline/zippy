/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../../styles/HelperStyles.css'
import { Form, Modal } from 'react-bootstrap';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import { PortalMap, setItem, getItem } from '../../utility/localStorageControl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminService from '../../AdminServices/AdminService';
import edited from '../../assets/images/Edit-Icon.png';

  export default function UpdateCodingProfile(portalName, Rank, userName) {
    const [modalShow, setModalShow] = React.useState(false);
    var portal1 = portalName;
    var portal = portal1.portalName
    var username = portal1.userName;
    var rank = portal1.Rank;

    console.log(portal, username, rank);

    const formatPortal = portal => {
      return portal.split(' ').join('').toLowerCase();
    }

    const updateRankWidget = async () => {
      if(portal.length > 0 && username.length > 0 && rank.length > 0){
        const rankWidgetData = {
          'rank' : getItem('Codingrank'),
          'website_id' : getItem('website_id'),
          'username' : getItem('Codingusername'),
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
                setModalShow(false);
              })
              .catch(err => console.log(err));
          })
          .catch(error => {
            toast.error('Error, Enter correct details!', {
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

    const getPortalDetails = (portal) => {
        console.log(portal);
      if(portal !== ''){
        setItem('url', PortalMap.get(portal).url);
        setItem('website_id', PortalMap.get(portal).id);
        setItem('logo', PortalMap.get(portal).logo);
      }
    }

    const UpdateCard = () => {
      setItem('Codingportal', portal);
      getPortalDetails(formatPortal(getItem('Codingportal')));
      setItem('Codingusername', username);
      setItem('Codingrank', rank);
      updateRankWidget();
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
            <h2 className="modal-head">Update Coding Profile</h2>
            <button onClick={props.onHide}>
              <AiOutlineCloseCircle style={{fontSize: 40, color: 'black'}} />
            </button>
          </div>
          <Form>
            <Form.Group controlId="formBasicEmail" className="mb-20">
              <Form.Label>Website Name</Form.Label>
              <Form.Control placeholder="Eg. GeeksforGeeks, CodeChef" type="text" defaultValue={portal} onChange={(e) => portal = (e.target.value)} readOnly />
            </Form.Group>
  
            <Form.Group controlId="formBasicPassword" className="mb-20">
              <Form.Label>Your Profile Username </Form.Label>
              <Form.Control type="text" placeholder="Eg. abc_234" defaultValue={username} onChange={(e) => username = (e.target.value)} />
            </Form.Group>
  
            <Form.Group controlId="formBasicPassword1">
              <Form.Label>Your Rank</Form.Label>
              <Form.Control type="text" placeholder="Eg. 2512" defaultValue={rank} onChange={(e) => rank = (e.target.value)} />
            </Form.Group>
  
          </Form>
  
          <div className="share" style={{justifyContent: 'center'}}>
            <a onClick={() => UpdateCard() } className="flexAlignCenter modal-button">Update</a>
          </div>
  
        </div>
        </Modal>
      );
    }
  
    return (
      <>
        <img src={edited} alt="edit" onClick={() => setModalShow(true)} style={{height:30, width: 30, marginRight: 10}} />
  
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