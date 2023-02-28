import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostPage from "../../components/posts/PostPage";
import { toast } from 'react-toastify';
import "./timeline.css";
import { Modal, Button, Form } from "react-bootstrap";
// import Pagination from "../../components/posts/Pagination";

const Timeline = ({ id, showLogin, isAuthenticated }) => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState(false);
    const [inputs, setInputs] = useState({
        tree_name: "",
        treeDescription: "",
        note: ""
    })
    const [image, setImage] = useState({})
    const [imageDiscard, setImageDiscard] = useState("")
    const [loading, setLoading] = useState(false)
    //Page by page implementation
    // const [currentPage, setCurrentPage] = useState(1)
    // const [postsPerPage] = useState(5)
    const [isPosting, setIsPosting] = useState(false)
    const [deleteReloadPosts, setDeleteReloadPosts] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated)  
    const [showPostModal, setShowPostModal] = useState(false);
    const [sureConfirmationDiscardModal, setConfirmationDiscardModal] = useState(false)
    //setting the inputs
    const onChange = e => {//post_type     : post   
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
    const fileOnChange = (e) => {
    setImage(e)
    setImageDiscard(document.getElementById("formFileMultiple").value)
    }

    // const fileSelectedHandler = (e) => {
    //     setImage({ files: [...this.state.files, ...e.target.files] })
    // }
    
    useEffect(() => {
        if (isAuthenticated){
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false)
        }
    }, [id, isAuthenticated, showLogin])
    
    const handleDiscard = () => {
        if (imageDiscard) {
            document.getElementById("formFileMultiple").value = ""
            setImageDiscard("")
        }
        setInputs({
            tree_name: "",
            treeDescription: "",
            note: ""
        })
        setIsPosting(false)
        setImage(Object)
        toast.warn("Changes Cleared")
    }
    
    const { tree_name, treeDescription, note } = inputs
    const onSubmitForm = async (e) => {
        setIsPosting(true)
        e.preventDefault()
        try {
            //making a body object from the values of username and password
            // const body = { tree_name, tree_descr, note }
            let formData = new FormData()
            for (var i = 0; i < image.length; i++) {
                formData.append("photos", image[i])
            }
            if (tree_name !== "" ) {
                formData.append("tree_name", tree_name.toLowerCase())
                if (treeDescription !== ""){
                    formData.append("treeDescription", treeDescription)
                }
            }
            formData.append("note", note)
            console.log(formData)
            //fetch api for POST method
            const response = await fetch(
                "http://localhost:8000/posts",
                {
                    method: "POST",
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token')
                    },
                    body: formData
                }
            )
            const parsedResponse = await response.json()
            setPosts([...posts, parsedResponse]);
            setNewPost(true)
            toast.success("Posted Successfully")
            setInputs({
                tree_name: "",
                treeDescription: "",
                note: ""
            })
            if (imageDiscard) { 
                document.getElementById("formFileMultiple").value = ""
                setImageDiscard("")
            }
            setImage(Object)
            setIsPosting(false)
            // window.location.reload(false)
        } catch (error) {
            console.error(error.message)
        }
    }
    
    //Handle Showing of Modal Post
    const handleClosePostModal = () => setShowPostModal(false);
    const handleShowPostModal = () => setShowPostModal(true);

    const getPosts = async () => {
        try {
            setLoading(true)
            //fetch api that uses the GET method
            const response = await fetch(
                "http://localhost:8000/posts",
                {
                    method: "GET",
                    //retrieving the token and putting it in the Auth header
                    // headers: { Authorization: "Bearer " + localStorage.getItem('token') }
                })
            //parsing the json back to a JS object
            const parseRes = await response.json();
            setPosts(parseRes);
            setLoading(false);
        } catch (error) {
            console.log(error.message)
        }
    }
    // Get current posts
    // const indexOfLastPost = currentPage * postsPerPage
    // const indexOfFirstPost = indexOfLastPost - postsPerPage
    // const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

    // Change page
    // const paginate = pageNumber => setCurrentPage(pageNumber)   

    useEffect(() => {
        getPosts();
    }, [newPost, deleteReloadPosts])

    //Handle default textarea keys
    // const handleKeyDown = (e) => {
    //     if (e.key === 'Enter' && e.shiftKey) {
    //       setNewComment(newComment);
    //     } else if (e.key === 'Enter') {
    //       handleSubmit(e);
    //     }
    //   };
    
    return(
        <>
        <main className="container">
        <div className="my-3 p-3 bg-body rounded shadow-sm">
        <h1>Posts</h1>
        {
            isLoggedIn ? 
            <Button className="buttons btn btn-success" variant="primary" onClick={handleShowPostModal}>
            Post Something
            </Button> : <><Link onClick={showLogin}>Login</Link> or <Link to="/register">Register</Link> to Post Here</>
        }
        {/* Posting in Modal */}
        <Modal show={showPostModal} onHide={handleClosePostModal}>
            <Form onSubmit={onSubmitForm}>
            <Modal.Header>
                <Modal.Title>Post Something</Modal.Title>
                {((inputs.tree_name || inputs.treeDescription || inputs.note || imageDiscard) === "") ? (
                <Button className="btn-close" onClick={handleClosePostModal}></Button>
                ) : (
                <Button className="btn-close" onClick={() => setConfirmationDiscardModal(true)}></Button>
                )}
            </Modal.Header>
            <Modal.Body>
                <Form.Group className="mb-4" controlId="tree_content">
                <Form.Label>Tree Name</Form.Label>
                <Form.Control
                    type="text"
                    name="tree_name"
                    placeholder="Required"
                    value={inputs.tree_name}
                    onChange={onChange}
                />
                </Form.Group>
                <Form.Group className="mb-4" controlId="treeDescription">
                <Form.Label>Tree Description</Form.Label>
                <Form.Control
                    type="text"
                    name="treeDescription"
                    placeholder="Optional"
                    value={inputs.treeDescription}
                    onChange={onChange}
                />
                </Form.Group>
                <Form.Group className="mb-4" controlId="caption">
                <Form.Label>Note/Caption</Form.Label>
                <Form.Control
                    as="textarea"
                    style={{ resize: "none" }}
                    required
                    name="note"
                    placeholder="Required"
                    value={inputs.note}
                    onChange={onChange}
                />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFileMultiple">
                <Form.Label>Upload Image/s</Form.Label>
                <Form.Control type="file" multiple onChange={(e) => fileOnChange(e.target.files)} />
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                {(inputs.note || inputs.tree_name || inputs.treeDescription || imageDiscard) !== "" ? (
                <>
                    <Button variant="secondary" onClick={handleDiscard}>
                    Clear Changes
                    </Button>
                    {inputs.tree_name && inputs.note !== "" ? (
                    isPosting ? (
                        <Button variant="success" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        Loading...
                        </Button>
                    ) : (
                        <Button type="submit" variant="success">
                        Post
                        </Button>
                    )
                    ) : (
                    <Button variant="secondary" disabled>
                        Post
                    </Button>
                    )}
                </>
                ) : (
                <>
                    <Button variant="outline-secondary" disabled>
                    Clear Changes
                    </Button>
                    <Button variant="secondary" disabled>
                    Post
                    </Button>
                </>
                )}
            </Modal.Footer>
        </Form>
      </Modal>
        {/* <!-- Are you sure you want to dicard image? Modal --> */}
        <Modal
            show={sureConfirmationDiscardModal}
            onHide={() => setConfirmationDiscardModal(true)}
            backdrop="static"
            keyboard={false}
            >
            <Modal.Header closeButton>
                <Modal.Title>Are you sure you want to exit and discard changes?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setConfirmationDiscardModal(false)}>Cancel</Button>
                <Button 
                variant="danger" 
                onClick={() => {handleDiscard(); setConfirmationDiscardModal(false); setShowPostModal(false)}}
                >
                    Discard
                </Button>
            </Modal.Footer>
        </Modal>





            </div>

            <div className="my-3 p-3 bg-body rounded shadow-sm">
            <h6 className="border-bottom pb-2 mb-0">Recent updates</h6>
            <PostPage 
                posts={posts} 
                loading={loading} 
                setDeleteReloadPosts={setDeleteReloadPosts} 
                ownId={id}
            />
            {/* <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
            /> */}
            </div>
            
        </main>
        </>
    )
}

export default Timeline