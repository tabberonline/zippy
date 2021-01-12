/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { GoogleLogin } from 'react-google-login';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PortfolioModal from '../components/modals/PortfolioModal';
import AdminService from '../AdminServices/AdminService';
import { useStateValue } from '../utility/StateProvider';

const CLIENT_ID = '148434873376-a1k8ubdj3g3oqkh53an00v8angbj2itd.apps.googleusercontent.com';
const API_ENDPOINT = 'https://whispering-eyrie-04211.herokuapp.com';

const GoogleBtn = () => {
  const [{login, token}, dispatch] = useStateValue();

  const loginSuccess = (response) => {
    if(response.tokenId){
      Axios.post(`${API_ENDPOINT}/login?idTokenString=${response.tokenId}`)
        .then(function (response) {          
          dispatch({
            type: "SET_LOGIN",
            login: true,
          });
          dispatch({
            type: "SET_TOKEN",
            token: response.data.access_token
          });  
          toast.success('Login Successful!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          AdminService.getUserData()
            .then(response => {
              dispatch({
                type: "SET_USERID",
                user_id: response.data.user_id
              });
              dispatch({
                type: "SET_TOKEN",
                token: response.data.access_token
              }); 
              dispatch({
                type: "SET_NAME",
                name: response.data.name
              });  
              dispatch({
                type: "SET_IMAGE",
                image: response.data.image
              }); 
              dispatch({
                type: "SET_PORTFOLIO",
                portfolio: response.data.resume_present
              }); 
              dispatch({
                type: "SET_RANK_WIDGETS",
                rankWidgets: response.data.rank_widgets
              }); 
              dispatch({
                type: "SET_CONTEST_WIDGETS",
                contestWidgets: response.data.contest_widgets
              }); 
              dispatch({
                type: "SET_PROJECTS",
                projects: response.data.personal_projects
              }); 
            })
            .catch(err => console.log(err));

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

  const loginFailure = (response) => {
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

  return (
    <div>
      { login ? (
        <>
          <PortfolioModal home={false} />
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
            onSuccess={ loginSuccess }
            onFailure={ loginFailure }
            cookiePolicy={ 'single_host_origin' }
            responseType='code,token'
            className="google-button"
          />
        )
      }
    </div>
  );
}

export default GoogleBtn;