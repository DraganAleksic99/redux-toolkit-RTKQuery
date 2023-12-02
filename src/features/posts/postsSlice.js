import {
  createSlice,
  createAsyncThunk,
  createSelector,
  createEntityAdapter
} from '@reduxjs/toolkit'
import axios from 'axios'
import { sub } from 'date-fns'

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts'

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState({
  // posts: []
  status: 'idle', // | 'loading' | 'success' | 'failed'
  error: null
})

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => (await axios.get(POSTS_URL)).data
)

export const addNewPost = createAsyncThunk('posts/addNewPost', async post => {
  try {
    return (await axios.post(POSTS_URL, post)).data
  } catch (error) {
    return error.message
  }
})

export const updatePost = createAsyncThunk('posts/updatePost', async post => {
  try {
    return (await axios.put(`${POSTS_URL}/${post.id}`, post)).data
  } catch (error) {
    // return error.message

    /* When new post is created the change doesn't persist on the server (jsonplaceholder)
       When updating the post after we create it we get an error since the post doesn't exist on the server
       So I just return the post to simulate server response */

    return post
  }
})

export const deletePost = createAsyncThunk('posts/deletePost', async postId => {
  try {
    const response = await axios.delete(`${POSTS_URL}/${postId}`)
    if (response?.status === 200) return postId
    return `${response?.status} ${response?.statusText}`
  } catch (error) {
    return error.message
  }
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addReaction(state, action) {
      const { postId, reaction } = action.payload
      // const existingpost = state.posts.find(post => post.id === postId)
      const existingpost = state.entities[postId]
      if (existingpost) existingpost.reactions[reaction] += 1
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'success'
        let min = 1
        const loadedPosts = action.payload.map(post => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString()
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
          }
          return post
        })
        // state.posts = [...state.posts, ...loadedPosts]
        postsAdapter.upsertMany(state, loadedPosts)
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        const newPost = action.payload
        newPost.date = new Date().toISOString()
        newPost.reactions = {
          thumbsUp: 0,
          wow: 0,
          heart: 0,
          rocket: 0,
          coffee: 0
        }
        // state.posts.push(newPost)
        postsAdapter.addOne(state, newPost)
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        action.payload.date = new Date().toISOString()
        // state.posts = [...state.posts.filter(post => post.id !== updatedPost.id), updatedPost]
        postsAdapter.upsertOne(state, action.payload)
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        // state.posts = state.posts.filter(post => post.id !== action.payload)
        postsAdapter.removeOne(state, action.payload)
      })
  }
})

// export const selectAllPosts = state => state.posts.posts
// export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId)

// getSelectors creates selectors that we rename with aliases using destructuring

export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
  // pass in a selector that returns the posts slice of state
} = postsAdapter.getSelectors(state => state.posts)

export const selectPostsStatus = state => state.posts.status
export const selectPostsError = state => state.posts.error
export const selectCounter = state => state.posts.count

export const selectPostsByUser = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (posts, userId) => posts.filter(post => post.userId === userId)
)

export const { addReaction } = postsSlice.actions

export default postsSlice.reducer
