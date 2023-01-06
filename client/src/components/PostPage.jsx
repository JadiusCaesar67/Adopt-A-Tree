import React from 'react';
import Posts from "./Posts";

const PostPage = ({ posts, loading, own_id }) => {
  if (loading) {
    return <h2>Loading...</h2>
  }

  return (
    <>
    {posts.map ( (post, index) => (
        <div key={index} className="card my-3 p-3 bg-body rounded shadow-sm">
            <Posts posts={post} own_id={own_id} />
        </div>
    ))}
    </>
  );
};

export default PostPage