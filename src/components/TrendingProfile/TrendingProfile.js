import React from 'react'

const TrendingProfile = ({profile}) => {
    console.log(profile)
    return (
        <div className="trending__profileCard flexColumn flexAlignCenter flexCenter">
            <img src={profile.picture_url} className="trending__profileImage" alt="UserImage" />
            <div className="trending__profileName">
                <span>{profile.name}</span>
            </div>
            <div className="trending__profileCollege">
                <span>{profile.portfolio.college.split(',')[0]}</span>   
            </div>   
            <div className="trending__profileViews">       
                <span>{profile.portfolio.views}{" "}Views</span>
            </div>
        </div>
    )
}

export default TrendingProfile
