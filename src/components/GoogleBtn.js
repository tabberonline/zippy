/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react'
import { GoogleLogin } from 'react-google-login';
import { getItem, setItem } from '../utility/localStorageControl';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PortfolioModal from '../components/modals/PortfolioModal';

const CLIENT_ID = '148434873376-a1k8ubdj3g3oqkh53an00v8angbj2itd.apps.googleusercontent.com';
const API_ENDPOINT = 'https://whispering-eyrie-04211.herokuapp.com';
class GoogleBtn extends Component {
   constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      accessToken: '',
      name: '',
      picture_url: '',
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
  }

  componentDidMount(){
    setItem('access_token', '');
  }

  login (response) {
    if(response.tokenId){
      this.setState(state => ({
        isLogin: true,
        accessToken: response.tokenId,
        name: response.profileObj.name,
        picture_url: response.profileObj.imageUrl
      }));

      setItem('name', this.state.name);
      setItem('image', this.state.picture_url);
      const idToken = this.state.accessToken;

      Axios.post(`${API_ENDPOINT}/login?idTokenString=${idToken}`)
        .then(function (response) {
          setItem('access_token', response.data.access_token);   
          console.log('Acceess Token Retrieved', getItem('access_token'));       
          setItem('login', true);
          toast.success('Login Successful!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        })
        .catch(function (error) {
          console.log(error);
          toast.error('Login Failed, Retry!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        });

    }
  }

  handleLoginFailure (response) {
    toast.error('Login Failed, Retry!', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  render() {

    return (
    <div>
      { this.state.isLogin ?(
        <>
          <PortfolioModal />
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
        )
        : 
        (
          <GoogleLogin
            clientId={ CLIENT_ID }
            buttonText='Sign in with Google'
            onSuccess={ this.login }
            onFailure={ this.handleLoginFailure }
            cookiePolicy={ 'single_host_origin' }
            responseType='code,token'
            className="google-button"
          />
        )
      }
    </div>
    )
  }
}

export default GoogleBtn;