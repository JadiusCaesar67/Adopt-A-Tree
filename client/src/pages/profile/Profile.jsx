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
            const parseRes = await response.json()
            setUser(parseRes)
            console.log(parseRes)
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
        {/* <div className="m-5">
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
            <br></br> */}

            <header class="masthead bg-primary text-white">
            
            <div class="container d-flex flex-column">
                {/* <!-- Masthead Avatar Image--> */}
                <div className="card" style={{ width: 20 + 'rem' }}>
                <picture>
                      <ProfilePic getId = {user.id}/>
                </picture>
                </div>
                {/* <!-- Masthead Heading--> */}
                <div className="m-2">
                <h1 class="fw-bold mb-0">{user.first_name} {user.last_name}</h1>
                <h2 class="mb-0">{user.username}</h2>
                </div>
                {/* <!-- Masthead Subheading--> */}
                <p class="masthead-subheading font-weight-light pt-4 mb-0">Bio</p>
            </div>
        </header>
        {/* <!-- About Section--> */}
        <section class="page-section bg-primary text-white mb-0" id="about">
            <div class="container">
                {/* <!-- About Section Heading--> */}
                <h2 class="page-section-heading text-center text-uppercase text-white">About</h2>
                {/* <!-- Icon Divider--> */}
                <div class="divider-custom divider-light">
                    <div class="divider-custom-line"></div>
                    <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                    <div class="divider-custom-line"></div>
                </div>
                {/* <!-- About Section Content--> */}
                <div class="row">
                    <div class="col-lg-4 ms-auto"><p class="lead">Freelancer is a free bootstrap theme created by Start Bootstrap. The download includes the complete source files including HTML, CSS, and JavaScript as well as optional SASS stylesheets for easy customization.</p></div>
                    <div class="col-lg-4 me-auto"><p class="lead">You can create your own custom avatar for the masthead, change the icon in the dividers, and add your email address to the contact form to make it fully functional!</p></div>
                </div>
                {/* <!-- About Section Button--> */}
                <div class="text-center mt-4">
                    <a class="btn btn-xl btn-outline-light" href="https://startbootstrap.com/theme/freelancer/">
                        <i class="fas fa-download me-2"></i>
                        Free Download!
                    </a>
                </div>
            </div>
        </section>
        </>

    )
}

export default Profile;