import React from 'react'
import { useHistory } from 'react-router-dom'

const TrendingProfile = ({profile}) => {
    const history = useHistory(); 
    return (
        <div className="trending__profileCard flexColumn flexAlignCenter flexCenter pointer" onClick={() => window.open('https://'+profile.portfolio_link)}>
            <img src={profile.picture_url} className="trending__profileImage" alt="UserImage" id="trendingImgProfile" />
            <div className="trending__profileName flexRow flexAlignCenter">
                <span>{profile.name}</span>
            </div>
            <div className="trending__profileCollege flexRow flexAlignCenter">
                <span>{profile.portfolio.college.split(',')[0]}</span>   
            </div>   
            <div className="trending__profileViews flexRow flexAlignCenter">       
                <span>{profile.portfolio.views}{" "}Views</span>
            </div>
        </div>
    )
}

export default TrendingProfile
