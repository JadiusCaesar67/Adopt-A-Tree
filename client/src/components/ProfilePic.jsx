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
            <img src={profilePic} className="img-fluid img-thumbnail" alt="Profile Picture"></img>
    )
}

export default ProfilePic