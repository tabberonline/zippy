/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from 'react'
import { GoogleLogin } from 'react-google-login';
import { getItem, setItem } from '../utility/localStorageControl';
import Axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PortfolioModal from '../components/modals/PortfolioModal';
import AdminService from '../AdminServices/AdminService';

const CLIENT_ID = '148434873376-a1k8ubdj3g3oqkh53an00v8angbj2itd.apps.googleusercontent.com';
const API_ENDPOINT = 'https://whispering-eyrie-04211.herokuapp.com';

const GoogleBtn = () => {
  const [isLogin, setLogin] = useState(false);

  const loginSuccess = (response) => {
    if(response.tokenId){
      Axios.post(`${API_ENDPOINT}/login?idTokenString=${response.tokenId}`)
        .then(function (response) {
          setItem('login', true);
          setLogin(true);
          setItem('access_token', response.data.access_token);  
          console.log(getItem('access_token'));
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
            .then(resp => {
              setItem('user_id', resp.data.user_id);
              setItem('name', resp.data.name);
              setItem('image', resp.data.picture_url);
              setItem('portfolio', resp.data.resume_present);
              setItem('projectWidgets', resp.data.personal_projects);
              setItem('rankWidgets', resp.data.rank_widgets);
              setItem('contestWidgets', resp.data.contest_widgets);
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
      { isLogin ?(
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