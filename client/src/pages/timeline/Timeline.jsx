import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostPage from "../../components/posts/PostPage";
import { toast } from 'react-toastify';
// import Pagination from "../../components/posts/Pagination";

const Timeline = ({ id, showLogin, isAuthenticated }) => {
    console.log(id, isAuthenticated)
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
            <button type="button" id="button_post" className="buttons btn btn-success" data-bs-toggle="modal" data-bs-target="#modal">
            Post Something
            </button> : <><Link onClick={showLogin}>Login</Link> or <Link to="/register">Register</Link> to Post Here</>
        }
        {/* Posting in Modal */}
        <div className="modal fade" id="modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <form onSubmit={onSubmitForm}>
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Post Something</h1>
                {((inputs.tree_name || inputs.treeDescription || inputs.note || imageDiscard) === "")?
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                :
                <button type="button" className="btn-close" data-bs-toggle="modal" data-bs-target="#staticBackdrop" data-bs-dismiss="modal" aria-label="Close"></button>
                }
            </div>
            <div className="modal-body">
            
                <div className="form-floating mb-4">
                    <input
                        
                        type="text"
                        id="tree_content"
                        name="tree_name"
                        className="form-control"
                        placeholder="Optional"
                        value={tree_name}
                        onChange={e => onChange(e)} />
                    <label className="form-label" htmlFor="form2Example1">Tree Name</label>
                </div>
                <div className="form-floating mb-4">
                    <input
                        type="text"
                        id="treeDescription"
                        name="treeDescription"
                        placeholder="Optional"
                        className="form-control"
                        value={treeDescription}
                        onChange={e => onChange(e)} />
                    <label className="form-label" htmlFor="form2Example1">Tree Description</label>
                </div>
                <div className="form-floating mb-4">
                    <textarea
                        style={{ resize : "none" }}
                        required
                        type="text"
                        id="caption"
                        name="note"
                        placeholder="Required"
                        className="form-control"
                        value={note}
                        onChange={e => onChange(e)} />
                    <label className="form-label" htmlFor="form2Example1">Note/Caption</label>
                </div>
                <div className="mb-3">
                    <label htmlFor="formFileMultiple" className="form-label">Upload Image/s</label>
                    <input className="form-control" type="file" id="formFileMultiple" multiple onChange={(e) => fileOnChange(e.target.files)} />
                </div>
                {/* <button type="submit" className="btn btn-primary btn-block mb-4">Post</button> */}
      </div>
      <div className="modal-footer">
        {
            ( inputs.note || inputs.tree_name || inputs.treeDescription || imageDiscard) !== ""? 
            (
                <>
                <button type="reset" className="btn btn-secondary" onClick={handleDiscard}>Clear Changes</button>
                {
                    inputs.tree_name && inputs.note  !== ""? 
                    <>
                    {   
                        isPosting? 
                        <button className="btn btn-success" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                        </button> : 
                      <button type="submit" className="btn btn-success">Post</button> 
                    }
                    </>
                    :
                    <button type="submit" className="btn btn-secondary" disabled>Post</button>
                }
                </> 
            ) 
            : 
            (
                <>
                <button type="reset" className="btn btn-outline-secondary" disabled>Clear Changes</button>
                <button type="submit" className="btn btn-secondary" disabled>Post</button>
                </>
            )
        }
        {/* <button type="submit" className="btn btn-success" data-bs-dismiss="modal">Post It</button>  */}
      </div>
      </form>
    </div>
  </div>
        </div>
        {/* <!-- Are you sure you want to dicard image? Modal --> */}
        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-body">
                <h2>Are you sure you want to exit and discard changes?</h2>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-bs-toggle="modal" data-bs-target="#modal">No</button>
                <button type="reset" id="discard" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleDiscard}>Discard Changes</button>
            </div>
            </div>
        </div>
        </div>
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