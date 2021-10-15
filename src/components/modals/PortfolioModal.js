/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import "../../styles/HelperStyles.css";
import { Form, Modal } from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  ErrorToast,
  SuccessToast,
  WarningToast,
} from "../../utility/localStorageControl";
import AdminService from "../../AdminServices/AdminService";
import { useSelector, useDispatch } from "react-redux";
import {
  setPortfolio,
  userImage,
  userLogin,
  userPortfolio,
  userToken,
} from "../../features/user/userSlice";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINT } from "../../AdminServices/baseUrl";

export default function PortfolioModal({ home, open, close }) {
  const token = useSelector(userToken);
  const dispatch = useDispatch();
  const image = useSelector(userImage);
  const isLogin = useSelector(userLogin);
  const portfolio = useSelector(userPortfolio);
  const history = useHistory();
  const [modalShow, setModalShow] = useState(false);
  const [apicall, setcall] = useState("");
  const [collegeList, setList] = useState([]);
  var title = "";
  var desc = "";
  var college = -1;
  var other = null;

  const createPortfolio = async () => {
    if (token === "") {
      ErrorToast("Access Token not Retrieved!");
    } else {
      if (title && desc && college) {
        const portfolioData = {
          title: title,
          picture_url: image,
          description: desc,
          college: college,
          college_others: other,
        };
        AdminService.createPortfolio(portfolioData)
          .then((resp) => {
            SuccessToast("Details Entered!");
            AdminService.getUserData()
              .then((resp) => {
                dispatch(setPortfolio(resp.data));
                setModalShow(false);
                history.push("/portfolio");
                close();
              })
              .catch((err) => {
                ErrorToast("Some Error Occured.");
                close();
              });
          })
          .catch((err) => {
            ErrorToast("Error, One User, One Portfolio!");
            close();
          });
      } else {
        ErrorToast("Error, Fields cannot be empty!");
        close();
      }
    }
  };

  const Add = () => {
    open();
    createPortfolio();
  };

  const getUnivList = () => {
    axios.get(`${API_ENDPOINT}/university/university_list`).then((res) => {
      const data = Object.values(res.data);
      setList(data);
    });
  };

  useEffect(() => {
    !home && !portfolio && setModalShow(true);
    getUnivList();
  }, []);

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        animation={false}
      >
        <div className="flexColumn">
          <div className="flexRow flexBetween flexAlignCenter mb-40">
            <div style={{ width: 20 }}></div>
            <h2 className="modal-head">Add Portfolio Details</h2>
            <button onClick={props.onHide}>
              <AiOutlineCloseCircle style={{ fontSize: 40, color: "black" }} />
            </button>
          </div>
          <Form>
            <Form.Group controlId="formBasic1" className="mb-20">
              <Form.Label>
                Your Portfolio Title<span style={{ color: "red" }}>*</span>{" "}
              </Form.Label>
              <Form.Control
                type="text"
                defaultValue={title}
                onChange={(e) => (title = e.target.value)}
                placeholder="Eg. Web Developer, Analyst, Mechanic"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="flexColumn mb-20">
              <Form.Label>
                Your College Name<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <select
                defaultValue={college}
                onChange={(e) => (college = e.target.value)}
              >
                <option value="Eg. TIET, BITS" disabled>
                  Eg. TIET, BITS, IIIT
                </option>
                {collegeList.map((college, index) => (
                  <option value={index}>{college.split(",")[0]}</option>
                ))}
              </select>
            </Form.Group>
            <Form.Group controlId="formBasic5" className="mb-20">
              <Form.Label>
                If not in above list:<span style={{ color: "red" }}></span>{" "}
              </Form.Label>
              <Form.Control
                type="text"
                defaultValue={other}
                onChange={(e) => (other = e.target.value)}
                placeholder="Eg. Thapar University, Patiala"
              />
            </Form.Group>
            <Form.Group controlId="formBasic2">
              <Form.Label>
                Your Description<span style={{ color: "red" }}>*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                defaultValue={desc}
                onChange={(e) => (desc = e.target.value)}
                placeholder="Enter your short bio/description here"
              />
            </Form.Group>
          </Form>

          <div className="share" style={{ justifyContent: "center" }}>
            <a onClick={() => Add()} className="flexAlignCenter modal-button">
              Create Portfolio
            </a>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <>
      {home ? (
        <a
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (isLogin) {
              if (portfolio) {
                history.push("/portfolio");
              } else {
                setModalShow(true);
              }
            } else {
              WarningToast("You need to Login first!");
            }
          }}
          className="flexAlignCenter intro-button"
        >
          Get Started
        </a>
      ) : (
        <button
          onClick={() => {
            portfolio ? history.push("/portfolio") : setModalShow(true);
          }}
          className="edit-your-portfolio grow1"
        >
          {portfolio ? "Move to your Portfolio" : "Edit your Portfolio"}
        </button>
      )}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
