import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'

// component re-renders when return value from useSelector changes

// react router pass in match object
export const SinglePostPage =({ match }) => {
  const { postId } = match.params

  // extract the post that matches the ID from store
  const post = useSelector( state =>
    state.posts.find(post => post.id === postId)
    )

    if(!post){
      return (
        <section>
          <h2>Post not found! :(</h2>
        </section>
      )
    }
    return (
      <section>
        <article className="post">
          <h2>{post.title}</h2>
          <p className="post-content">{post.content}</p>
          <Link to={`/editPost/${post.id}`} className="button">
            Edit Post
          </Link>
        </article>
      </section>
    )

}