import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

const Posts = ({ posts, own_id }) => {
    // console.log(posts.post_id)
    const [profilePic, setProfilePic] = useState("")
    const [loading, setLoading] = useState(false)
    const [ownId, setOwnId] = useState(own_id)
    const [available, setAvailable] = useState(posts.available)
    const [availableButton, setAvailableButton] = useState(posts.available)
    const friendId = posts.user_id

    const getAvatar = async () => {
        try {
            const response = await fetch(
                `http://localhost:8000/photos/avatar1s?id=` + friendId, 
                {
                    method: "GET"
                }
            )
            const parseRes = await response.json()
            setProfilePic(`http://localhost:8000/img/${parseRes}`)
        } catch (error) {
            // console.log(error)
        }
    }
    
    const onClickMessage = async () => {
        try {
            const senderId = own_id
            const receiverId = friendId
            const body = { senderId, receiverId }
            const response = await fetch(
                "http://localhost:8000/conversations/",
                {
                    method: "POST",
                    headers: {
                        "Content-type" : "application/json"
                    },
                    body: JSON.stringify(body)
                })
            const parseRes = await response.json()
            console.log(parseRes)

        } catch (error) {
            console.log(error.message)
        }
    }

    const onClickAvailable = () => {
        console.log(posts.post_id)
        setLoading(true)
        setAvailable(available => !available)
    }

    const onClickDelete = () => {
        deletePost()
        setLoading(true)
        console.log(posts.post_id)
    }

    //Availability
    useEffect(() => {
        const setOwnAvailability = async () => {
            // console.log(posts.post_id)
            // console.log(available)
            try {
                const response = await fetch(
                    "http://localhost:8000/posts?post_id=" + posts.post_id,
                    {
                        method: "PUT",
                        headers: {
                            "Content-type" : "application/json"
                        },
                        body: JSON.stringify({ available })
                    })
                const parseRes = await response.json()
                setAvailableButton(parseRes)
                // console.log(parseRes)
            } catch (error) {
                console.log(error.message)
            }
        }
        setTimeout(() => {
            setOwnAvailability()
            setLoading(false)
        }, 1000);
    }, [available])

    //Delete Post
    const deletePost = async () => {
        console.log(posts.post_id)
        try {
            const response = await fetch(
                "http://localhost:8000/posts/delete?post_id=" + posts.post_id,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token'),
                        "Content-type" : "application/json"
                    },
                })
            const parseRes = await response.json()
            console.log(parseRes)
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        } catch (error) {
            console.log(error.message)
        }}

    //Date & Time
    const d = new Date(posts.date_posted)
    const date = d.toString();
    const hours = date.substring(16, 18)
    const meridiem = hours >= 12 ? 'PM' : 'AM'
    const hour = (hours % 12) || 12

    //refresh button interval if ownAvailable button isn't retrieved yet
    useEffect(() => {
        // console.log(ownId)
        getAvatar()
        // setOwnId(own_id)
        if (own_id){
            if (ownId !== posts.user_id){
                const interval = setInterval(() => {
                    // console.log("timed")
                    // window.location.reload(false)
                    setOwnId(own_id)
                }, 500);
                return () => clearInterval(interval);
            }
        }
    }, [posts, own_id])

    return(
        <>
        <div className="card-body">
        <div className="modal-header">
        <img src={profilePic? profilePic : "https://secure.gravatar.com/avatar/36e59b2d168a96ba0d0046b45fb0fa5f?s=500&d=mm&r=g"} 
            alt="" className="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" focusable="false"/>
        {
            !own_id? (
                (available? <div className="card d-flex text-bg-success">Available</div> :
                            <div className="card d-flex text-bg-secondary">Taken/Unavailable</div>
                )
            ) : ( own_id? ( ownId === posts.user_id?
            (loading? <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
                </div> 
            : (availableButton? <div className="dropdown">
            <button className="btn btn-success dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Available
            </button>
                <ul className="dropdown-menu">
                <li className="dropdown-item" onClick={onClickAvailable}>Set to Taken/Unavailable</li>
                <li className="dropdown-item" onClick={onClickDelete}>Delete Post</li>
                </ul>
            </div>
          :
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Taken
            </button>
            <ul className="dropdown-menu">
                <li className="dropdown-item" onClick={onClickAvailable}>Set to Available</li>
                <li className="dropdown-item" onClick={onClickDelete}>Delete Post</li>
            </ul>
            </div>) )
            :
            (available? <div className="card d-flex text-bg-success">Available</div> :
            <div className="card d-flex text-bg-secondary">Taken/Unavailable</div>) )
            : 
            ( <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
            </div> ) )
            
        }
        </div>
        <button type="button" className="btn btn-info mt-2" onClick={onClickMessage}>Message</button>
        <strong className="d-block text-gray-dark fw-bold">{posts.username}</strong>
        <div className="pb-3 mb-0 small lh-sm border-bottom">
        <dd className="card-text fs-4">{posts.post_description}</dd>
        <div className="row mb-3 bg-body rounded shadow-sm">
            {posts.pictures.map ( (pics, post) => (
                <div key={post} className="col my-2 p-2 bg-body rounded shadow-sm">
                    <img src={`http://localhost:8000/img/${pics}`} width="240px" height="240px" alt=""/>
                </div>
            ))}
        </div>
        <time>{hour + date.substring(18, 21)} {meridiem} {date.substring(4, 10)}, {date.substring(11, 16)}</time>
        </div>
        </div>
        </>
    )
}

export default Posts