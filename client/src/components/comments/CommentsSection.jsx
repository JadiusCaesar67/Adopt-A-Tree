import "./commentsSection.css";
import React, { useState, useEffect } from "react";
import { 
  Form, Button, FormControl, Spinner } 
  from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane  } from '@fortawesome/free-solid-svg-icons';
import Comment from "./Comment";

const CommentSection = ({ postId, ownId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPosting, setIsPosting] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [deleteReloadComments, setDeleteReloadComments] = useState(false)
  const [limit, setLimit] = useState(1);
  // console.log(comments)

    
  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `http://localhost:8000/comments?postId=${postId}`
        );
        const parsedResponse = await response.json();
        setComments(parsedResponse);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    // const interval = setInterval(() => {
    //   fetchComments();
    // }, 1000);
    // return () => clearInterval(interval);
    setDeleteReloadComments(false)
    fetchComments();
  }, [postId, isPosting, deleteReloadComments]);
  
  //loading comments w/ effect
  if (isLoading) {
    return (
      <Button variant="secondary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading Comment Section...
      </Button>
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPosting(true);
    try {
      const response = await fetch(`http://localhost:8000/comments`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token'),
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ postId: postId, text: newComment }),
      });
      const parsedResponse = await response.json();
      setComments([...comments, parsedResponse]);
      setIsPosting(false);
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  //update comment

  //Entering and newline hotkey
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      setNewComment(newComment);
    } else if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  //Show Comments
  const handleToggleShowAll = () => {
    setShowAll(showAll => !showAll);
    setLimit(showAll ? 1 : comments.length);
    // setLimit(showAll ? comments.length : 1);
  };

  return (
    <>
        {comments.slice(0, limit).map((comment, index) => (
          <div key={index} className="d-flex comment-section">
            <Comment 
              comment={comment} 
              index={index} 
              comments={comments} 
              setComments={setComments}
              setDeleteReloadComments={setDeleteReloadComments} 
              ownId={ownId}
            />
            </div>
          ))}
          {
            comments.length && !(comments.length === 1)? (
              <Button variant="success" className="mb-3" onClick={handleToggleShowAll}>
                {showAll ? "View less comments" : "View more comments"}
              </Button>
          ) : null
          }

          {isPosting ? (
            <Button variant="success" disabled>
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
              Placing comment...
          </Button>
          ) : (
            <Form onSubmit={handleSubmit}>
            <Form.Group className="d-flex">
              <FormControl
                as="textarea"
                style={{ resize : "none" }}
                rows="2"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              
                <button type="submit" className="ml-auto btn btn-outline-success">
                  <FontAwesomeIcon icon={faPaperPlane}/>
                </button>
            </Form.Group>
          </Form>
          )}
    
      
    </>
  );
};

export default CommentSection