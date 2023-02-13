import React from 'react';
import Posts from "./Posts";
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import BlankImage from '../../assets/blank-image.svg';

const PostPage = ({ posts, loading, ownId }) => {
  if (loading) {
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
        <Placeholder.Button variant="info" xs={6} style={{ width: '100px' }} />
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
        <Card.Img src={BlankImage} style={{ width: '240px' }}/>
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
        <Placeholder.Button variant="info" xs={6} style={{ width: '100px' }} />
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
        <Card.Img src={BlankImage} style={{ width: '240px' }}/>
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
        <Placeholder.Button variant="info" xs={6} style={{ width: '100px' }} />
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
        <Card.Img src={BlankImage} style={{ width: '240px' }}/>
        <Placeholder as={Card.Footer} animation="glow">
            <Placeholder xs={3} />
          </Placeholder>
        </Card.Body>
      </Card>
    )
  }

  return (
    <>
    {posts.map ( (post, index) => (
        <div key={index} className="card my-3 p-3 bg-body rounded shadow-sm">
            <Posts posts={post} own_id={ownId} />
        </div>
    ))}
    </>
  )
}

export default PostPage