import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'

// posts slice only knows about the data it's responsible for

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!', user: '0'},
  { id: '2', title: 'Second Post', content: 'More text', user: '1' }
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
    }
  }
})

export const { postAdded, postUpdated } = postsSlice.actions
export default postsSlice.reducer
