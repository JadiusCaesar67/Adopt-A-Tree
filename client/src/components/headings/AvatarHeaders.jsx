import React, { useState, useEffect } from 'react'

const AvatarHeaders = ({ isAuth }) => {
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
            // console.log(error)
            // setProfilePic(`https://secure.gravatar.com/avatar/36e59b2d168a96ba0d0046b45fb0fa5f?s=500&d=mm&r=g`)
        }
      }

      useEffect(() => {
        if (isAuth){
            const interval = setInterval(() => {
                getPicture()
              }, 1000);
              return () => clearInterval(interval);
        }
      }, [isAuth]);

    return (
            <img src={profilePic? 
            profilePic: "https://secure.gravatar.com/avatar/36e59b2d168a96ba0d0046b45fb0fa5f?s=500&d=mm&r=g"} 
            alt="" 
            width="30" height="30" 
            className="rounded-circle profile_icon_pic" />
    )
}

export default AvatarHeaders