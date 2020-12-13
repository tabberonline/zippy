import React from 'react';
import '../../styles/HelperStyles.css';
import './CodingCard.css';

export default function CodingCard({name, rank, id, logo}){
    return(
        <div className="flexColumn profile-card">
            <img className="logo" src={logo} alt="logo" />
            <p className="profile-name pl-20 mb-10">{name}</p>
            <p className="profile-name pl-20 mb-10"><span className="profile-heading">ID:</span> {id}</p>
            <p className="profile-name pl-20 mb-10"><span className="profile-heading">Rank:</span> {rank}</p>
        </div>
    );
}