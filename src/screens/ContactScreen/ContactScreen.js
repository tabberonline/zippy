import React, { useState } from 'react';
import '../../styles/HelperStyles.css';
import './ContactScreen.css';
import Footer from '../../components/Footer/Footer';
import contactimg from '../../assets/images/Contactimg.png';
import {Form} from 'react-bootstrap';
import Header1 from '../../components/Header/Header1';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminService from '../../AdminServices/AdminService';
import { Animated } from 'react-animated-css';

function ContactScreen() {
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const SendMail = async () => {
        if(name.length > 0 && subject.length > 0 && message.length > 0){
            const mailContent = {
                'subject': subject,
                'text': message
            }
            console.log(mailContent);
            AdminService.sendMail(mailContent)
                .then(resp => {
                    console.log(resp);
                    toast.success('Mail Sent!', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
                .catch(err => {
                    console.log(err);
                    toast.error('Some Error Occured!', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                })
        } else{
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
  return (
    <div className="contact-screen">
        <Header1 />
        <div id="contact-section">
          <div className="mw1100 flexColumn">
            <Animated isVisible={true} animationIn="slideInUp">
                <div className="flexColumn flexAlignCenter flexCenter mh-20 contact-header">
                    <img src={contactimg} alt="" style={{width: '90%'}} />
                </div>
            </Animated>
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
            <Animated isVisible={true} animationIn="slideInUp">
                <div className="flexColumn contact-section">
                    <h1 className="contact-heading">Have anything to ask?</h1>
                    <div className="flexColumn flexAround flexAlignCenter mv-40">
                        <Form style={{width: '75%'}}>
                            <Form.Group controlId="formBasicEmail" className="mb-20">
                                <Form.Label>Name*</Form.Label>
                                <Form.Control type="name" defaultValue={name} onChange={(e) => setName(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword2" className="mb-20">
                                <Form.Label>Subject*</Form.Label>
                                <Form.Control type="text" defaultValue={subject} onChange={(e) => setSubject(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword3">
                                <Form.Label>Message*</Form.Label>
                                <Form.Control as="textarea" rows={5} defaultValue={message} onChange={(e) => setMessage(e.target.value)} />
                            </Form.Group>

                            <div className="share" onClick={() => SendMail()} style={{cursor: 'pointer', justifyContent: 'flex-start', paddingLeft: 0, paddingTop: 30}}>
                                <a className="flexAlignCenter modal-button">Send</a>
                            </div>
                        </Form>
                    </div>
                </div>
            </Animated>
          </div>
      </div>
        <Footer />
    </div>
  );
}

export default ContactScreen;
