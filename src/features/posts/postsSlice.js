import { createSlice } from '@reduxjs/toolkit'

// posts slice only knows about the data it's responsible for

const initialState = [
  { id: '1', title: 'First Post!', content: 'Hello!' },
  { id: '2', title: 'Second Post', content: 'More text' }
]

// state argument will be array of posts by itself 
// (only data this slice is aware of)

// Note: createSlice allows for mutable change ---it converts to safe immutable changes with Immer library behind scenes
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded(state, action){
      state.push(action.payload)
    }
  }
})

export default postsSlice.reducer
export const { postAdded } = postsSlice.actions