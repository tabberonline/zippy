/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import '../../styles/HelperStyles.css'
import { Modal, Form } from 'react-bootstrap';
import {AiOutlineCloseCircle} from 'react-icons/ai';
import { PortalMap, setItem, getItem } from '../../utility/localStorageControl';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminService from '../../AdminServices/AdminService';
import edited from '../../assets/images/Edit-Icon.png';

export default function UpdateContestProfile(portalName, Rank, userName, id, ContestName) {
  const [modalShow, setModalShow] = React.useState(false);
  var portal1 = portalName;
  var portal = portal1.portalName;
  const data = ['Geeks for Geeks', 'CodeChef', 'CodeForces', 'HackerRank', 'TopCoder', 'LeetCode'];
  var contest = portal1.ContestName;
  var rank = portal1.Rank;
  var username = portal1.userName;
  var card_id = portal1.id;

  const formatPortal = portal => {
    return portal.split(' ').join('').toLowerCase();
  }

  const updateWidget = async (card_id) => {
    if(portal.length > 0 && username.length > 0 && rank.length > 0 && contest.length > 0){
      const updateWidgetData = {
        'rank' : getItem('Contestrank'),
        'website_id' : getItem('website_id'),
        'username' : getItem('Contestusername'),
        'contest_name' : getItem('Contestname')
      }
      AdminService.updateContestWidget(card_id, updateWidgetData)
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
              setItem('contestWidgets', resp.data.contest_widgets);
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
    if(portal !== ''){
      setItem('url', PortalMap.get(portal).url);
      setItem('website_id', PortalMap.get(portal).id);
      setItem('logo', PortalMap.get(portal).logo);
    }
  }

  const UpdateCard = (card_id) => {
    setItem('Contestportal', portal);
    getPortalDetails(formatPortal(getItem('Contestportal')));
    setItem('Contestusername', username);
    setItem('Contestrank', rank);
    setItem('Contestname', contest);
    updateWidget(card_id);
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
            <h2 className="modal-head">Add Contests won</h2>
            <button onClick={props.onHide}>
              <AiOutlineCloseCircle style={{fontSize: 40, color: 'black'}} />
            </button>
          </div>
          <Form>
            <Form.Group controlId="formBasicEmail" className=" flexColumn mb-20">
              <Form.Label>Website Name</Form.Label>
              <select defaultValue={portal} onChange={(e) => portal = (e.target.value)}>
                <option value="Eg. GeeksforGeeks, CodeChef" disabled>Eg. GeeksforGeeks, CodeChef</option>
                {data.map(platform => (
                  <option value={platform}>{platform}</option>
                ))}
              </select>
            </Form.Group>
  
            <Form.Group controlId="formBasicPassword1" className="mb-20">
              <Form.Label>Your Profile Username </Form.Label>
              <Form.Control type="text" placeholder="Eg. abc_234" defaultValue={username} onChange={(e) => username = (e.target.value)} />
            </Form.Group>
  
            <Form.Group controlId="formBasicPassword2" className="mb-20">
              <Form.Label>Contest Name</Form.Label>
              <Form.Control type="text" placeholder="Eg. 2020 Hackathon" defaultValue={contest} onChange={(e) => contest = (e.target.value)} />
            </Form.Group>
  
            <Form.Group controlId="formBasicPassword3">
              <Form.Label>Your Rank</Form.Label>
              <Form.Control type="text" placeholder="Eg. 2514" defaultValue={rank} onChange={(e) => rank = (e.target.value)} />
            </Form.Group>
  
          </Form>
  
          <div className="share" style={{justifyContent: 'center'}}>
            <a onClick={() => UpdateCard(card_id)} className="flexAlignCenter modal-button">Add to Profile</a>
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
    </>
  );
}
