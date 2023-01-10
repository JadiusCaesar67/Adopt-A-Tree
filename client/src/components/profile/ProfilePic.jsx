import React, { useState, useEffect } from 'react'

const ProfilePic = () => {
    const [profilePic, setProfilePic] = useState("")

    const getPicture = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/photos/avatar`, 
                {
                    method: "GET",
                    headers: { 
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            )
            const parseRes = await response.json()
            setProfilePic(`http://localhost:8000/img/${parseRes}`)
        
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPicture()
    }, [])

    return (
            // <img src={profilePic} className="img-fluid img-thumbnail" alt="Profile Picture"></img>
            <>
            {
                profilePic? 
                <img src={profilePic} className="object-fit-fill rounded-circle" 
                style={{ width: 18 + 'rem', height: 18 + 'rem' }} alt="..."></img>
                :
                <svg className="object-fit-fill rounded-circle" width="18em" height="18em" xmlns="http://www.w3.org/2000/svg" 
                role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false">
                <rect width="18em" height="18em" fill="#868e96"></rect>
                </svg>
            }
            </>
    )
}

export default ProfilePic