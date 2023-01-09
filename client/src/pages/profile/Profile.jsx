// import { response } from "express"
import React, { useEffect, useState } from "react"
import UploadAvatar from "../../components/profile/UploadAvatar"
import ProfilePic from "../../components/profile/ProfilePic"
import "./profile.css"

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
            console.log(parseRes)
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

    const d = new Date(posts.date_posted)
    const date = d.toString();
    const hours = date.substring(16, 18)
    const meridiem = hours >= 12 ? 'PM' : 'AM'
    const hour = (hours % 12) || 12
    console.log(posts)
    return (
        <>
            <header className="masthead col bg-primary text-white">
            <div className="row">
            <div className="container col ms-5">
                {/* <!-- Masthead Avatar Image--> */}
                <div className="card rounded-circle" style={{ width: 18 + 'rem', height: 18 + 'rem' }}>
                <picture>
                    <ProfilePic getId = {user.id}/>
                </picture>
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
                            <div key={index} className="card my-3 p-3 bg-body rounded shadow-sm">
                            <div className="pb-3 mb-0 small lh-sm border-bottom">
                                <dd className="card-text fs-4">{posts.post_description}</dd>
                                <div className="row mb-3 bg-body rounded shadow-sm">
                                    {posts.pictures.map ( (pics, post) => (
                                        <div key={post} className="col my-2 p-2 bg-body rounded shadow-sm">
                                            <img src={`http://localhost:8000/img/${pics}`} width="240px" height="240px" alt=""/>
                                        </div>
                                    ))}
                                </div>
                            </div>
                                <p>{posts.date_posted}</p>
                                <p>{hour + date.substring(18, 21)} {meridiem} {date.substring(4, 10)}, {date.substring(11, 16)}</p>
                            </div>
                    ))) : (
                    <p className="card-text placeholder-glow">
                        <span className="placeholder col-7"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-6"></span>
                        <span className="placeholder col-8"></span>
                    </p>
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