// import { response } from "express"
import React, { useEffect, useState } from "react";
import { useNavigate  } from 'react-router-dom';
import { toast } from "react-toastify";
import "./profile.css";
import OwnPosts from "../../components/profile/OwnPosts";
import ProfileSection from "../../components/profile/ProfileSection";

const Profile = ({ setAuth }) => {
    const [ user, setUser ] = useState("");
    const [ ownPosts, setOwnPosts ] = useState("");
    const [showEditForm, setShowEditForm] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [loadingAvatar, setLoadingAvatar] = useState(false)
    const [deleteReloadPosts, setDeleteReloadPosts] = useState(false)
    const navigate = useNavigate();

    const getProfile = async () => {
        try {
            setLoadingAvatar(true)
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
            setLoadingAvatar(false)
        } catch (error) {
            console.error(error)
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
            setOwnPosts(parseRes)
        } catch (error) {
            console.log("something went wrong")
        }
    }

    useEffect(() => {
        getProfile()
        getOwnPosts()
    }, [isUpdating, deleteReloadPosts]) 
    //`isUpdating` & `deleteReloadPosts` is needed to re-render the whole data because the `handleUpdateProfile` will only fetch `users` table

    const handleUpdateProfile = async (formData) => {
        try {
            // console.log(formData)
            setShowEditForm(true)
            setIsUpdating(true)
            const response = await fetch(
                "http://localhost:8000/profile/edit",
                {
                    method: "PUT", 
                    headers: { 
                        Authorization: "Bearer " + localStorage.getItem("token"),
                        "Content-type" : "application/json"
                      },
                      body: JSON.stringify({ formData })
                })
            const parsedResponse = await response.json()
            setUser(parsedResponse)
            toast.success("Changes saved")
            setIsUpdating(false)
            setShowEditForm(false)
        } catch (error) {
            toast.error("No changes are made...")
            console.error(error)
        }
        
    }

    const handleDeleteUser = async () => {
        if (window.confirm('Are you really sure you want to delete your account? This action cannot be undone.')) {
            try {
                setIsDeleting(true)
                const response = await fetch(
                    "http://localhost:8000/profile/delete",
                    {
                        method: "DELETE", 
                        headers: { 
                            Authorization: "Bearer " + localStorage.getItem("token")
                          },
                    })
                const parsedResponse = await response.json()
                if (parsedResponse) {
                    toast.error(parsedResponse.message)
                    // Navigate to homepage
                    setTimeout(() => {
                        localStorage.removeItem('token');
                        setAuth(false);
                        setIsDeleting(false);
                        navigate('/');
                        // window.location.reload(false);
                    }, 500);
                }
            } catch (error) {
                console.error(error.message)
            }
        }}

    return (
        <>
        <header className="masthead col">
            <div className="row">
                <div className="container col me-sm-5">
                    <ProfileSection 
                        profile={user} 
                        loadingAvatar={loadingAvatar}
                        setShowEditForm={setShowEditForm} 
                        showEditForm={showEditForm}
                        isUpdating={isUpdating}
                        handleDeleteUser={handleDeleteUser}
                        isDeleting={isDeleting}
                        handleUpdateProfile={handleUpdateProfile}
                    />
                </div>
            {/* <!-- Posts Section--> */}
            {
                !showEditForm && (
                    <section className="page-section col bg-primary text-black mb-0 me-sm-5" id="about">
                        <div className="container">
                            {/* <!-- Posts Section Heading--> */}
                            <h2 className="page-section-heading text-center text-uppercase text-white">Posts</h2>
                            <div className="card">
                                <div className="card-body">
                                <OwnPosts posts={ownPosts} avatar={user.avatar} setDeleteReloadPosts={setDeleteReloadPosts} id={user.id}/>
                                </div>
                            </div>
                        </div>
                    </section>
                    )
            }
            </div>
        </header>
        </>
    )
}

export default Profile;