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

function ContactScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const SendMail = async () => {
        if(name.length > 0 && email.length > 0 && subject.length > 0 && message.length > 0){
            const mailContent = {
                'name': name,
                'email': email,
                'subject': subject,
                'message': message
            }
            AdminService.sendMail(mailContent)
                .then(resp => {
                    toast.success('Mail Sent!', {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setName('');
                    setEmail('');
                    setMessage('');
                    setSubject('');
                })
                .catch(err => {
                    toast.error('Invalid entries!', {
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
        <div id="intro-section">
          <div className="mw1100 flexColumn">
            <div className="flexColumn flexAlignCenter flexCenter mh-20" style={{height: 300, borderRadius: 8}}>
                <img src={contactimg} alt="" style={{width: '90%'}} />
            </div>
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
            <div className="flexColumn contact-section">
                <h1 className="contact-heading">Have anything to ask?</h1>
                <div className="flexColumn flexAround flexAlignCenter mv-40">
                    <Form style={{width: '60%'}}>
                        <Form.Group controlId="formBasicEmail" className="mb-20">
                            <Form.Label>Name*</Form.Label>
                            <Form.Control type="name" defaultValue={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mb-20">
                            <Form.Label>Email* </Form.Label>
                            <Form.Control type="text" defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword2" className="mb-20">
                            <Form.Label>Subject*</Form.Label>
                            <Form.Control type="text" defaultValue={subject} onChange={(e) => setSubject(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword3">
                            <Form.Label>Message*</Form.Label>
                            <Form.Control as="textarea" rows={5} defaultValue={message} onChange={(e) => setMessage(e.target.value)} />
                        </Form.Group>

                        <div className="share" onClick={() => SendMail()} style={{justifyContent: 'flex-start', paddingLeft: 0, paddingTop: 30}}>
                            <a className="flexAlignCenter modal-button">Send</a>
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
