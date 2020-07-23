import React from 'react'
import { useSelector } from 'react-redux'

// component takes in a user ID as prop and looks up the right user object
// returns formatted user name


export const PostAuthor = ({ userId }) => {
  const author = useSelector(state =>
    state.users.find(user => user.id === userId)
  )

  return <span>by {author ? author.name : 'Unknown author'}</span>
}