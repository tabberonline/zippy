/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useRef} from "react";
import "../../styles/HelperStyles.css";
import { Modal, Form } from "react-bootstrap";
import { AiOutlineCloseCircle, AiOutlinePlusCircle } from "react-icons/ai";
import AdminService from "../../AdminServices/AdminService";
import { ErrorToast, SuccessToast } from "../../utility/localStorageControl";
import { useDispatch } from "react-redux";
import { setProjectWidgets } from "../../features/user/userSlice";

export default function AddCourseModal({ open, close }) {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = React.useState(false);
  const CourseName = useRef("");
  const InstituteName = useRef("");
  const CourseLink = useRef("");

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
            <h2 className="modal-head">Add Course</h2>
            <button onClick={props.onHide}>
              <AiOutlineCloseCircle style={{ fontSize: 40, color: "black" }} />
            </button>
          </div>
          <Form>
            <Form.Group controlId="formBasicEmail" className="mb-20">
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Eg.  Data Structures & Algorithm"
                ref={CourseName}
                onChange={(e) => (CourseName.current = e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail2" className="mb-20">
              <Form.Label>
                Institute Name
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Eg.  Coursera"
                ref={InstituteName}
                onChange={(e) => (InstituteName.current = e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail3" className="mb-20">
              <Form.Label>Course Link</Form.Label>
              <Form.Control
                type="text"
                placeholder="Eg.  https://www.google.com"
                ref={CourseLink}
                onChange={(e) => (CourseLink.current = e.target.value)}
              />
            </Form.Group>
          </Form>

          <div className="share" style={{ justifyContent: "center" }}>
            <a
              onClick={() => {
                setModalShow(false);
              }}
              className="flexAlignCenter modal-button"
            >
              Add to Profile
            </a>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <>      
      <a className="mr-60 AddCourseModal grow1" onClick={() => setModalShow(true)}>
        <AiOutlinePlusCircle style={{ fontSize: 30, color: "#C0C0C0" }} />
      </a>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}
