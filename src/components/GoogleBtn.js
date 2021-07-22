/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { GoogleLogin } from 'react-google-login';
import { ErrorToast, setItem, SuccessToast } from '../utility/localStorageControl';
import Axios from 'axios';
import PortfolioModal from '../components/modals/PortfolioModal';
import AdminService from '../AdminServices/AdminService';
import {API_ENDPOINT} from '../AdminServices/baseUrl';
import { useDispatch, useSelector } from 'react-redux';
import {logUser, setUser, userID, userLogin, userPortfolio} from '../features/user/userSlice'
import { useHistory } from 'react-router-dom';

const CLIENT_ID = '148434873376-a1k8ubdj3g3oqkh53an00v8angbj2itd.apps.googleusercontent.com';

const GoogleBtn = ({open, close}) => {
  const history = useHistory()
  const dispatch = useDispatch();
  const isLogin = useSelector( userLogin );
  const userid = useSelector(userID);
  const portfolio = useSelector(userPortfolio);
  const loginSuccess = (response) => {
    open();
    if(response.tokenId){
      Axios.post(`${API_ENDPOINT}/login?idTokenString=${response.tokenId}`)
        .then(response => {
          dispatch(logUser(response.data));
          setItem('accessToken', response.data.access_token);
          AdminService.getUserData()
            .then(resp => {
              dispatch(setUser(resp.data));
              SuccessToast('Successfully Logged In');
              SuccessToast('User Details fetched!');
              portfolio && portfolio.id && history.push('/portfolio');
              close();
            })
            .catch(err => {
              ErrorToast("Some Error Occured, Re-login");
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
      { isLogin && userid ? (
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