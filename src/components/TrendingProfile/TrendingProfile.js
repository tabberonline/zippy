import React from 'react'

const TrendingProfile = ({profile}) => {
    return (
        <div className="trending__profileCard flexColumn flexAlignCenter">
            <img src={profile.picture_url} className="trending__profileImage" alt="UserImage" />
            <span className="trending__profileName">{profile.name}</span>
            <span className="trending__profileCollege">{profile.portfolio.college.split(',')[0]}</span>                 
            <span className="trending__profileViews">{profile.portfolio.views}{" "}Views</span>
        </div>
    )
}

export default TrendingProfile
