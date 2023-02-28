import React, { useEffect, useState } from "react";
import CommentSection from "../comments/CommentsSection";
import { Modal, Button, Spinner } from 'react-bootstrap';
import AvatarInPost from "./AvatarInPost";

const Posts = ({ post, avatar, setDeleteReloadPosts, own_id }) => {
    const [postContent, setPostContent] = useState(post.post_description);
    // const [editedPost, setEditedPost] = useState([])
    const [profilePic, setProfilePic] = useState("https://secure.gravatar.com/avatar/36e59b2d168a96ba0d0046b45fb0fa5f?s=500&d=mm&r=g");
    const [loading, setLoading] = useState(false);
    const [ownId, setOwnId] = useState(own_id);
    const [available, setAvailable] = useState(post.available);
    const [availableButton, setAvailableButton] = useState(post.available);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [sureDelete, setSureDelete] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    
    useEffect(() => {
        if (post.avatar) {
            setProfilePic(`http://localhost:8000/img/${post.avatar}`)
        } else if (avatar) {
            setProfilePic(`http://localhost:8000/img/${avatar}`)
        } else {
            setProfilePic("https://secure.gravatar.com/avatar/36e59b2d168a96ba0d0046b45fb0fa5f?s=500&d=mm&r=g")
        }
    }, [post])
    
    const onClickMessage = async () => {
    const othersId = post.user_id;
        try {
            const senderId = own_id
            const receiverId = othersId
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

    //Edit and update post
    const onClickEdit = () => {
        setIsEditing(true);
    }

    const onClickSave = async () => {
        try {
            setIsSaving(true);
            const response = await fetch(
                `http://localhost:8000/posts/${post.post_id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ updatedPost: postContent })
                }
            );
            // const parseRes = await response.json();
            // setEditedPost(parseRes);
            setIsEditing(false);
            setIsSaving(false);
        } catch (error) {
            console.error(error);
        }
    };

    const onClickAvailable = () => {
        console.log(post.post_id)
        setLoading(true)
        setAvailable(available => !available)
    }

    //Availability
    useEffect(() => {
        const setOwnAvailability = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/posts/available?post_id=" + post.post_id,
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

    const onClickDelete = () => {
        setSureDelete(true)
    }

    //Delete Post
    const deletePost = async () => {
        try {
            setIsDeleting(true);
            const response = await fetch(
                `http://localhost:8000/posts/delete/${post.post_id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token'),
                        "Content-type" : "application/json"
                    },
                })
            const parsedResponse = await response.json();
            if (response.ok) {
                setIsDeleting(false);
                setDeleteReloadPosts(true)
                }
        } catch (error) {
            console.log(error.message)
        }}

    const onClickCancel = () => {
        setIsEditing(false);
        setSureDelete(false);
    };

    //Date & Time
    const d = new Date(post.date_posted)
    const date = d.toString();
    const hours = date.substring(16, 18)
    const meridiem = hours >= 12 ? 'PM' : 'AM'
    const hour = (hours % 12) || 12

    //refresh button interval if ownAvailable button isn't retrieved yet
    useEffect(() => {
        if (own_id){
            if (ownId !== post.user_id){
                const interval = setInterval(() => {
                    // console.log("timed")
                    // window.location.reload(false)
                    setOwnId(own_id)
                }, 500);
                return () => clearInterval(interval);
            }
        }
    }, [post, own_id])

    return(
        <>
        <div className="card-body">
        <div className="modal-header d-flex align-items-center">
            <AvatarInPost 
                profilePic={profilePic} 
                userId={post.user_id}
                username={post.username} 
                email={post.email} 
                ownId={own_id}
                />
            <div className="mb-0 mt-n4 flex-grow-1" style={{ marginTop: -15, paddingTop: 0 }}>
                <strong className="d-block text-gray-dark fw-bold username">{post.username}</strong>
            </div>
        {
            !own_id? (
                (available? <div className="card d-flex text-bg-success">Available</div> :
                            <div className="card d-flex text-bg-secondary">Taken/Unavailable</div>
                )
            ) : ( own_id? ( ownId === post.user_id?
            (loading? 
                <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading...</span>
                </div> 
            : (availableButton? 
            <div className="dropdown">
            <button className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
              Available
            </button>
                <ul className="dropdown-menu">
                <li className="text-secondary dropdown-item user-select-none" onClick={onClickAvailable}>Set to Taken/Unavailable</li>
                <li className="dropdown-item user-select-none" onClick={onClickEdit}>Edit Post</li>
                <hr className="dropdown-divider"/>
                <li className="text-danger dropdown-item user-select-none" onClick={onClickDelete}>Delete Post</li>
                </ul>
            </div>
          :
          <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                Taken
            </button>
            <ul className="dropdown-menu">
                <li className="text-success dropdown-item user-select-none" onClick={onClickAvailable}>Set to Available</li>
                <li className="dropdown-item user-select-none" onClick={onClickEdit}>Edit Post</li>
                <hr className="dropdown-divider"/>
                <li className="text-danger dropdown-item user-select-none" onClick={onClickDelete}>Delete Post</li>
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
        
        <Modal show={sureDelete} onHide={!sureDelete} centered>
            {
                isDeleting?
                ( 
                    <Button variant="danger" disabled>
                        <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        /> Deleting...
                        <span className="visually-hidden">Loading...</span>
                    </Button> ) : (
            <Modal.Footer>
                <h3>Are you sure, do you want to delete this post?</h3>
                <Button variant="danger" onClick={deletePost} className="ms-2">
                    Confirm
                </Button>
                <Button variant="secondary" onClick={onClickCancel}>
                    Cancel
                </Button>
            </Modal.Footer>
                )
            }
        </Modal>
        
        </div>
        {/* {
            ownId !== post.user_id &&
            <button 
                type="button" 
                className="btn btn-info mt-2" 
                onClick={onClickMessage}
            >Message
            </button>
        } */}
    
        
        <div className="pb-3 mb-0 small lh-sm border-bottom">
            {
                isEditing? 
                (
                    <div>
                        <textarea
                            className="form-control"
                            value={postContent}
                            onChange={e => setPostContent(e.target.value)}
                        />
                        {isSaving ? <button
                            className="btn btn-success mt-2"
                            onClick={onClickSave}
                            disabled={isSaving}
                        >
                            Saving...
                        </button> : <><button
                            className="btn btn-success mt-2"
                            onClick={onClickSave}
                            disabled={isSaving}
                        >
                            Save
                        </button>
                        <button
                            className="btn btn-danger ms-2 mt-2"
                            onClick={onClickCancel}
                            disabled={isSaving}
                        >
                            Cancel
                        </button></>
                        }
                        
                    </div>
                ) : (
                    <dd className="card-text fs-4">{postContent}</dd>
                )
            }
            <div className="row justify-content-sm-start">
            {   
                post.pictures.map ( (pics, post) => (
                <div key={post} 
                className="col-md-3 my-2 p-2 bg-body rounded shadow-sm">
                    <img 
                        src={`http://localhost:8000/img/${pics}`} 
                        width="240px" 
                        height="240px" 
                        alt=""
                        className="img-fluid"/>
                </div>
            ))}
            </div>
            <time>
                {hour + date.substring(18, 21)} {meridiem} {date.substring(4, 10)}, {date.substring(11, 16)}
            </time>
        </div>
                {/* Comment Sections */}
                <CommentSection postId={post.post_id} ownId={own_id}/>
        </div>
        </>
    )
}

export default Posts