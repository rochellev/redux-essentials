import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'

// posts slice only knows about the data it's responsible for

// might have to add date thing
const initialState = [
  { id: '1', title: 'Oh Hi', content: 'Mark. I didnt see you there', user: '0', reactions: {thumbsUp: 0, hooray: 0, heart: 4, rocket: 0, eyes: 1}},
  { id: '2', title: 'Hello', content: 'Darkness my old friend', user: '1', reactions: {thumbsUp: 2, hooray: 0, heart: 0, rocket: 0, eyes: 0} }
]

// state argument will be array of posts by itself 
// (only data this slice is aware of)

// Note: createSlice allows for mutable change ---it converts to safe immutable changes with Immer library behind scenes

// action object look like {type: 'posts/postUpdated', payload: {id, title, content}}
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(title, content, userId) {
        return {
          payload: {
            id: nanoid(),
            data: new Date().toISOString,
            title,
            content,
            user: userId
          }
        }
      }
    },
    postUpdated(state, action) {
      const { id, title, content } = action.payload
      const existingPost = state.find(post => post.id === id)
      if (existingPost) {
        existingPost.title = title
        existingPost.content = content
      }
    },
    reactionAdded(state, action){
      const { postId, reaction} = action.payload
      const existingPost = state.find(post => post.id === postId)
      if(existingPost){
        existingPost.reactions[reaction]++
      }
    }
  }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions
export default postsSlice.reducer

export const selectAllPosts = state => state.posts

export const selectPostById = (state, postId) =>
  state.posts.find(post => post.id === postId)
