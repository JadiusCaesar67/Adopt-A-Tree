import { format } from "timeago.js";
import "./commentsSection.css";
import React, { useState } from "react";
import { Card, Dropdown, Form, FormControl, Button, Spinner } 
  from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const Comment = ({ comment, index, comments, setComments, setDeleteReloadComments, ownId }) => {
  const [username, setUsername] = useState(comment.username)
  const [text, setText] = useState(comment.text);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [sureDelete, setSureDelete] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false);

//   update comment
  const handleEdit = () => {
    setIsEditing(true);
    setText(comment.text);
  };

  const handleSave = async () => {
    console.log(text)
    setIsSaving(true);
    // if (event.key === 'Enter' || event.type === 'click') {
    //   const updatedComments = [...comments];
    //   updatedComments[index].text = newComment;
    //   setComments(updatedComments);
    //   setEditing(false);
    // }
    try {
        const response = await fetch(
            "http://localhost:8000/comments?commentId=" + comment.comment_id,
            {
                method: "PUT",
                headers: {
                  Authorization: "Bearer " + localStorage.getItem('token'),
                  "Content-type" : "application/json"
                },
                body: JSON.stringify({ text })
            })
            const parsedResponse = await response.json();
            console.log(parsedResponse)
            setUsername(comment.username);
            const updatedComments = [...comments];
            updatedComments[index] = parsedResponse.text;
            setComments(updatedComments);
            setIsEditing(false);
            setIsSaving(false);
      } catch (error) {
          console.log(error.message)
      }
    };

    const handleDelete = () => {
        setSureDelete(true);
    }
    
  const handleCancel = () => {
    setIsEditing(false);
    setSureDelete(false);
    setText(comment.text);
  };

  const handleSureDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await fetch(
          "http://localhost:8000/comments?commentId=" + comment.comment_id,
          {
              method: "DELETE",
              headers: {
                Authorization: "Bearer " + localStorage.getItem('token'),
                "Content-type" : "application/json"
              },
          })
          
      if (response.ok) {
        setComments(comments.filter((c) => c.comment_id !== comment.comment_id));
        setIsDeleting(false);
        setDeleteReloadComments(true)
      }
      // const parseRes = await response.json()
    } catch (error) {
        console.log(error.message)
    }
  };

  return(
    <>
      <Card className="m-2">
        <Card.Body>
          <strong>{username}</strong>: <br/>
        {isEditing ? (
          <Form>
            <FormControl
              as="textarea"
              rows="2"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className={ 
              ownId === comment.user_id ? 
              "d-flex " : ""
            }>
              {isSaving ? (
                <Button variant="success" disabled>
                  <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                  Saving...
                </Button>
              ) : (
                <>
                  <Button variant="success" className="ml-auto" onClick={handleSave}>
                    <FontAwesomeIcon icon={faCheck} />
                  </Button>
                  <Button variant="danger" onClick={handleCancel}>
                    <FontAwesomeIcon icon={faTimes} />
                  </Button>
                </>
              )}
            </div>
          </Form>
        ) : ( 
          <>
            <Card.Text>{text}</Card.Text>
          </>
        )}
        
        {isDeleting ? (
          <Button variant="danger" disabled>
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Deleting...
          </Button>
        ) : ( 
            sureDelete ? (
              <>
              <strong>Are you sure you want to delete this comment?</strong>
              <Button variant="success" className="ml-auto" onClick={handleSureDelete}>
                <FontAwesomeIcon icon={faCheck} /> Yes
              </Button>
              <Button variant="danger" onClick={handleCancel}>
                <FontAwesomeIcon icon={faTimes} /> No
              </Button>
            </>
            ) : null
        )}
        
      </Card.Body>
          <Card.Footer className="text-muted">{format(comment.date_commented)}</Card.Footer>
    </Card>

      {
        ownId === comment.user_id && 
        <Dropdown>
            <Dropdown.Toggle variant="light" id="dropdown-basic" className="float-right comment-options-button">
                <FontAwesomeIcon icon={faEllipsisH} className="float-right comment-options-button-svg"/>
            </Dropdown.Toggle>

            <Dropdown.Menu as="h6" variant="flush" style={{ border: "none" }}>
              <Dropdown.Item className="popover-item" onClick={handleEdit}>
                  Edit
              </Dropdown.Item>
              <Dropdown.Item className="popover-item" onClick={handleDelete}>
                  Delete
              </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
      }  
    </>
  );
}

export default Comment