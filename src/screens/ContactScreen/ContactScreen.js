import React from 'react';
import '../../styles/HelperStyles.css';
import './ContactScreen.css';
import Footer from '../../components/Footer/Footer';
import contactimg from '../../assets/images/Contactimg.png';
import {Form} from 'react-bootstrap';
import Header1 from '../../components/Header/Header1';

function ContactScreen() {
  return (
    <div className="contact-screen">
        <Header1 />
        <div id="intro-section">
          <div className="mw1100 flexColumn">
            <div className="flexColumn flexAlignCenter flexCenter mh-20" style={{height: 300, borderRadius: 8}}>
                <img src={contactimg} alt="" style={{width: '90%'}} />
            </div>
            <div className="flexColumn contact-section">
                <h1 className="contact-heading">Have anything to ask?</h1>
                <div className="flexColumn flexAround flexAlignCenter mv-40">
                    <Form style={{width: '60%'}}>
                        <Form.Group controlId="formBasicEmail" className="mb-20">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name"/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mb-20">
                            <Form.Label>Email </Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mb-20">
                            <Form.Label>Subject</Form.Label>
                            <Form.Control type="text" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Message</Form.Label>
                            <Form.Control as="textarea" rows={5} />
                        </Form.Group>

                        <div className="share" style={{justifyContent: 'flex-start', paddingLeft: 0, paddingTop: 30}}>
                            <a href="" className="flexAlignCenter modal-button">Send</a>
                        </div>
                    </Form>
                </div>
            </div>
          </div>
      </div>
        <Footer />
    </div>
  );
}

export default ContactScreen;
