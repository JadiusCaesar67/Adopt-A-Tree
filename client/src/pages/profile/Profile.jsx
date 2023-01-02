// import { response } from "express"
import React, { useEffect, useState } from "react"
import UploadAvatar from "../../components/Upload"
import ProfilePic from "../../components/ProfilePic"
import "./profile.css"

const Profile = () => {
    const [ user, setUser ] = useState("")

    const getProfile = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/profile", 
                {
                    method: "GET", 
                    headers: { 
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            )
            console.log(response)
            const parseRes = await response.json()
            setUser(parseRes)
        }

        catch (error) {
            console.log("something went wrong")
        }
    }

    useEffect(() => {
        getProfile();
    }, [])

    return (

        <>
        <div className="m-5">
            <div className="card" style={{ width: 18 + 'rem' }}>
                <h1>This is {user.username}'s profile page</h1>
                <UploadAvatar getId = {user.id}/>
                <div className="card-body">
                    <h5 className="card-title">{user.username}</h5>
                    <p className="card-text">Bio</p>
                    <a href="/" className="btn btn-primary">Home</a>
                </div>
            </div>

            </div>
            <br></br>
            <br></br>

<main>
<aside className="profile-card position-absolute top-75 start-50 translate-middle rounded">
  
  <header>
    
    {/* <!-- here’s the avatar --> */}
    <a href="*">
        <ProfilePic getId = {user.id}/>
    </a>

    {/* <!-- the username --> */}
    <h1>{user.first_name} {user.last_name}</h1>
    
    {/* <!-- and role or location --> */}
    <h2>{user.user_type}</h2>
    
  </header>
  
  {/* <!-- bit of a bio; who are you? --> */}
  <div className="profile-bio">
    
    <p>Specialties are Creative UI, HTML5, CSS3, Semantic Web, Responsive Layouts, Web Standards Compliance, Performance Optimization, Cross Device Troubleshooting.</p>
    
  </div>
  
  {/* <!-- some social links to show off --> */}
  {/* <ul class="profile-social-links">
    
    <li>
      <a href="https://twitter.com/alishahab">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/social-twitter.svg"/>
      </a>
    </li>
    
    <li>
      <a href="http://themeforest.net/user/alishahab">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/social-envato.svg"/>
      </a>
    </li>
    
    <li>
      <a href="https://codepen.io/alishahab">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/social-codepen.svg"/>
      </a>
    </li>
    
    
  </ul> */}
  
</aside>
</main>
        </>

    )
}

export default Profile;