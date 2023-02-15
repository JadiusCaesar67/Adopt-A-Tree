import React, { useState, useEffect } from 'react'

const AvatarProfile = ({ avatar, loadingAvatar }) => {
    const [profilePic, setProfilePic] = useState(avatar)

    useEffect(() => {
        setProfilePic( avatar? 
            `http://localhost:8000/img/${avatar}` 
            : 
            "https://secure.gravatar.com/avatar/36e59b2d168a96ba0d0046b45fb0fa5f?s=500&d=mm&r=g")
    }, [avatar])

    return (
            // <img src={profilePic} className="img-fluid img-thumbnail" alt="Profile Picture"></img>
            <>
            {
                loadingAvatar? 
                <svg className="object-fit-fill rounded-circle" width="18em" height="18em" xmlns="http://www.w3.org/2000/svg" 
                role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false">
                <rect width="18em" height="18em" fill="#868e96"></rect>
                </svg>
                :
                <img src={profilePic} className="object-fit-fill rounded-circle" 
                style={{ width: 18 + 'rem', height: 18 + 'rem' }} alt="..."></img>
            }
            </>
    )
}

export default AvatarProfile;