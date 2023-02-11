import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  // const [comments, setComments] = useState([
  //   { comment_id: 1, text: 'Awesome post!' },
  //   { comment_id: 2, text: 'I agree' },
  //   { comment_id: 3, text: 'I disagree' },
  // ]);
  const [newComment, setNewComment] = useState("");
// console.log(postId)
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/comments?postId=${postId}`
        );
        const parsedResponse = await response.json();
        console.log(parsedResponse)
        setComments(parsedResponse);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      console.log(parsedResponse)
      setComments([...comments, parsedResponse]);
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <h3>Comment Section</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form> */}
      {/* {comments.map((comment) => (
        <div key={comment.id}>{comment.text}</div>
      ))} */}
    <Container>
      <Row>
        <Col>
          <h4>Comments</h4>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <ListGroup>
            {comments.map((comment) => (
              <ListGroup.Item key={comment.comment_id}>{comment.text}</ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Row className="my-3">
        <Col md={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </Form.Group>
            <Button type="submit">Post Comment</Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default CommentSection