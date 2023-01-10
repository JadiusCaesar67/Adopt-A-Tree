// import { response } from "express"
import React, { useEffect, useState } from "react"
import UploadAvatar from "../../components/profile/UploadAvatar"
import ProfilePic from "../../components/profile/ProfilePic"
import "./profile.css"
import OwnPosts from "../../components/profile/OwnPosts"

const Profile = () => {
    const [ user, setUser ] = useState("")
    const [ posts, setPosts ] = useState("")

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
        }

        catch (error) {
            console.log("something went wrong")
        }
    }

    const getOwnPosts = async () => {
        try {
            const response = await fetch(
                "http://localhost:8000/posts/own-posts", 
                {
                    method: "GET", 
                    headers: { 
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                }
            )
            const parseRes = await response.json()
            setPosts(parseRes)
        }

        catch (error) {
            console.log("something went wrong")
        }
    }

    useEffect(() => {
        getProfile()
        getOwnPosts()
    }, [])

    return (
        <>
            <header className="masthead col bg-primary text-white">
            <div className="row">
            <div className="container col ms-5">
                {/* <!-- Masthead Avatar Image--> */}
                <div className="card rounded-circle" style={{ width: 18 + 'rem', height: 18 + 'rem' }}>
                    <ProfilePic/>
                </div>
                <UploadAvatar getId = {user.id}/>
                {/* <!-- Masthead Heading--> */}
                <div className="m-2">
                <h1 className="fw-bold mb-0">{user.first_name} {user.last_name}</h1>
                <h2 className="mb-0">{user.username}</h2>
                </div>
                {/* <!-- Bio Subheading--> */}
                <p className="masthead-subheading font-weight-light pt-4 mb-0">For user Bio or About Me; feature not yet available</p>
            </div>

            {/* <!-- Posts Section--> */}
        <section className="page-section col bg-primary text-black mb-0" id="about">
            <div className="container">
                {/* <!-- Posts Section Heading--> */}
                <h2 className="page-section-heading text-center text-uppercase text-white">Posts</h2>
                <div className="card">
                    <div className="card-body">
                    {
                        posts? (posts.map ( (posts, index) => (
                            <div key={index}>
                                <OwnPosts posts={posts}/>
                            </div>
                        ))) : (
                            <>
                        <p className="card-text placeholder-glow">
                            <span className="placeholder col-7"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-6"></span>
                            <span className="placeholder col-8"></span>
                        </p>
                        <p className="card-text placeholder-glow">
                            <span className="placeholder col-7"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-6"></span>
                            <span className="placeholder col-8"></span>
                        </p>
                        <p className="card-text placeholder-glow">
                            <span className="placeholder col-7"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-4"></span>
                            <span className="placeholder col-6"></span>
                            <span className="placeholder col-8"></span>
                        </p>
                        </>
                        )
                    }
                    </div>
                </div>
            </div>
        </section>
            </div>
        </header>
        </>
    )
}

export default Profile;