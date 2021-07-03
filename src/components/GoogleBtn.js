/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { GoogleLogin } from 'react-google-login';
import { ErrorToast, SuccessToast } from '../utility/localStorageControl';
import Axios from 'axios';
import PortfolioModal from '../components/modals/PortfolioModal';
import AdminService from '../AdminServices/AdminService';
import {API_ENDPOINT} from '../AdminServices/baseUrl';
import { useDispatch, useSelector } from 'react-redux';
import {logUser, setUser, userLogin} from '../features/user/userSlice'

const CLIENT_ID = '148434873376-a1k8ubdj3g3oqkh53an00v8angbj2itd.apps.googleusercontent.com';

const GoogleBtn = ({open, close}) => {
  const dispatch = useDispatch();
  const isLogin = useSelector( userLogin );

  const loginSuccess = (response) => {
    open();
    if(response.tokenId){
      Axios.post(`${API_ENDPOINT}/login?idTokenString=${response.tokenId}`)
        .then(response => {
          dispatch(logUser(response.data));
          SuccessToast('Successfully Logged In');
          AdminService.getUserData()
            .then(resp => {
              dispatch(setUser(resp.data));
              SuccessToast('User Details fetched!');
              close();
            })
            .catch(err => {
              ErrorToast("Some Error Occured");
              close();
            });
        })
        .catch(function (error) {
          ErrorToast('Login Failed, Retry!');
          close();
        });

    }
  }

  const loginFailure = (response) => {
    open();    
    ErrorToast('Login Failed, Retry!');
    close();
  }
    return (
    <div>
      { isLogin ? (
        <>
          <PortfolioModal home={false} open={() => open()} close={() => close()} />
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