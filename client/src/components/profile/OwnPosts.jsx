import React from "react";
import Posts from '../posts/Posts.jsx'
import { Card, Placeholder } from 'react-bootstrap';
import BlankImage from '../../assets/blank-image.svg';

const OwnPosts = ({ posts, avatar, setDeleteReloadPosts, id }) => {
  if (!posts) {
      return (
        <Card >
          <Card.Body>
            <div className='d-flex my-3 p-3'>
              <div className='me-auto'>
                <Card.Img src={BlankImage} style={{ width: '32px' }} /> 
              </div>
              <div className='d-flex'>
                <Placeholder.Button variant="success" xs={6} style={{ width: '60px', height: '20px' }} />
              </div>
            </div>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
              <Placeholder xs={6} /> <Placeholder xs={8} />
            </Placeholder>
          <Placeholder as={Card.Footer} animation="glow">
              <Placeholder xs={3} />
            </Placeholder>
          </Card.Body>
  
          <Card.Body>
            <div className='d-flex my-3 p-3'>
              <div className='me-auto'>
                <Card.Img src={BlankImage} style={{ width: '32px' }} /> 
              </div>
              <div className='d-flex'>
                <Placeholder.Button variant="success" xs={6} style={{ width: '60px', height: '20px' }} />
              </div>
            </div>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
              <Placeholder xs={6} /> <Placeholder xs={8} />
            </Placeholder>
          <Placeholder as={Card.Footer} animation="glow">
              <Placeholder xs={3} />
            </Placeholder>
          </Card.Body>
  
          <Card.Body>
            <div className='d-flex my-3 p-3'>
              <div className='me-auto'>
                <Card.Img src={BlankImage} style={{ width: '32px' }} /> 
              </div>
              <div className='d-flex'>
                <Placeholder.Button variant="success" xs={6} style={{ width: '60px', height: '20px' }} />
              </div>
            </div>
            <Placeholder as={Card.Title} animation="glow">
              <Placeholder xs={6} />
            </Placeholder>
            <Placeholder as={Card.Text} animation="glow">
              <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
              <Placeholder xs={6} /> <Placeholder xs={8} />
            </Placeholder>
          <Placeholder as={Card.Footer} animation="glow">
              <Placeholder xs={3} />
            </Placeholder>
          </Card.Body>
        </Card>
      )
    }

    return (
        <>
        {
            posts.map ( (post, index) => (
            <div key={index}>
                <Posts post={post} avatar={avatar} setDeleteReloadPosts={setDeleteReloadPosts} own_id={id}/>
            </div>
            
        ))}
        </>
        // <Posts post={post} avatar={avatar} own_id={id}/>
    )
}

export default OwnPosts