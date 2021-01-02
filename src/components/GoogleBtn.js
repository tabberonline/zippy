import React, { Component } from 'react'
import axios from 'axios';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { getItem, setItem } from '../utility/localStorageControl';
import AdminService from '../AdminServices/AdminService';

const CLIENT_ID = '148434873376-a1k8ubdj3g3oqkh53an00v8angbj2itd.apps.googleusercontent.com';

class GoogleBtn extends Component {
   constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      accessToken: '',
      name: '',
      picture_url: '' 
    };

    this.login = this.login.bind(this);
    this.handleLoginFailure = this.handleLoginFailure.bind(this);
    this.logout = this.logout.bind(this);
    this.handleLogoutFailure = this.handleLogoutFailure.bind(this);
  }

  login (response) {
    if(response.tokenId){
      this.setState(state => ({
        isLogin: true,
        accessToken: response.tokenId,
        name: response.profileObj.name,
        picture_url: response.profileObj.imgUrl
      }));

      setItem('access_token', this.state.accessToken);
      setItem('name', this.state.name);
      setItem('image', this.state.picture_url); 

      AdminService.addToken(this.state.accessToken)
        .then(result => {
          console.log('Bearer ' + getItem('access_token'));
        }) 
        .catch(error => {
          console.warn(error);
        })
    }
  }

  logout (response) {
    this.setState(state => ({
      isLogin: false,
      accessToken: ''
    }));
  }

  handleLoginFailure (response) {
    console.log(response)
  }

  handleLogoutFailure (response) {
    alert('Failed to log out')
  }

  render() {

    return (
    <div>
      { this.state.isLogin ?(
        /* <GoogleLogout
          clientId={ CLIENT_ID }
          buttonText='Sign Out'
          onLogoutSuccess={ this.logout }
          onFailure={ this.handleLogoutFailure }
          className="google-button"
        /> */
          <button className="edit-your-portfolio">Edit your Portfolio</button>
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