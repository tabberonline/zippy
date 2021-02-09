import React, {useState} from 'react';
import '../../styles/HelperStyles.css';
import AdminService from '../../AdminServices/AdminService';
import {setItem, getItem} from '../../utility/localStorageControl'

import splashlogo from '../../assets/images/logo.png';

export default function MailPreview(){
    return(
        <div className="mail-box">
            <img src={splashlogo} width="200" height="40" style={{alignSelf: 'center'}} className="d-inline-block" alt="logo" />
            <div className="mail-content-box">
                <div style={{backgroundColor: 'rgba(255,217,135,1)', borderTopLeftRadius: 8, borderTopRightRadius: 8}}>
                    <h6 className="mailcontent-header">{getItem('titlePortfolio')}</h6>
                </div>
                <div style={{padding: 20, gap: 30}} className="flexRow">
                    <img src={getItem('image')} className="profile-pic" alt="profile" />
                    <div className="flexColumn">
                        <h2 className="mailcontent-name">{getItem('name')}</h2>
                        <h4 className="mailcontent-mail">{getItem('email')}</h4>
                        <div className="flexRow" style={{alignItems: 'baseline', gap: 50}}>
                            <div className="flexRow" style={{alignItems: 'baseline', gap: 10}}>
                                <h1 className="mailcontent-number">{getItem('rankWidgets').length}</h1>
                                <h5 className="mailcontent-sec">Profiles</h5>
                            </div>
                            <div className="flexRow" style={{alignItems: 'baseline', gap: 10}}>
                                <h1 className="mailcontent-number">{getItem('contestWidgets').length}</h1>
                                <h5 className="mailcontent-sec">Coding Contests</h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="share" style={{justifyContent: 'center', padding: 0}} >
                <a onClick className="flexAlignCenter modal-button">Visit Profile</a>
            </div>
        </div>
    );
}