/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState, useContext, useEffect} from 'react'
import { GoogleLogin } from 'react-google-login';
import { ErrorToast, getItem, setItem, SuccessToast } from '../utility/localStorageControl';
import Axios from 'axios';
import PortfolioModal from '../components/modals/PortfolioModal';
import AdminService from '../AdminServices/AdminService';
import {API_ENDPOINT} from '../AdminServices/baseUrl';
import {ProgrammerContext} from '../utility/userContext';

const CLIENT_ID = '148434873376-a1k8ubdj3g3oqkh53an00v8angbj2itd.apps.googleusercontent.com';

const GoogleBtn = ({open, close}) => {
  const [user, setUser] = useContext(ProgrammerContext);
  const [isLogin, setLogin] = useState(user.login);
  const loginSuccess = (response) => {
    open();
    if(response.tokenId){
      Axios.post(`${API_ENDPOINT}/login?idTokenString=${response.tokenId}`)
        .then(function (response) {
          setLogin(true);
          setUser(prevUser => ({...prevUser, login: true, token: response.data.access_token }));
          setItem('accessToken', response.data.access_token);
          SuccessToast('Successfully Logged In');
          AdminService.getUserData()
            .then(resp => {
              setUser(prevUser => ({...prevUser,
                user_id: resp.data.user_id,
                name: resp.data.name,
                email: resp.data.email,
                image: resp.data.picture_url,
                resume_present: resp.data.resume_present,
                portfolio: resp.data.portfolio,
                rank_widgets: resp.data.rank_widgets,
                contest_widgets: resp.data.contest_widgets,
                project_widgets: resp.data.personal_projects,
              }));              
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
      { user.login ? (
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