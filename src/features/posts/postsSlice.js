import { createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
import apiSlice from '../api/apiSlice'

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = postsAdapter.getInitialState()

export const postsSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => '/posts',
      transformResponse: responseData => {
        let min = 1
        const loadedPosts = responseData.map(post => {
          if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString()
          if (!post?.reactions)
            post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0
            }
          return post
        })
        postsAdapter.setAll(initialState, loadedPosts)
      },
      providesTags: result => [
        { type: 'Post', id: 'LIST' },
        ...result.ids.map(id => ({ type: 'Post', id }))
      ]
    }),
    getPostsByUserId: builder.query({
      query: id => `/posts/?userid=${id}`,
      transformResponse: responseData => {
        let min = 1
        const loadedPosts = responseData.map(post => {
          if (!post?.date) post.date = sub(new Date(), { minutes: min++ }).toISOString()
          if (!post?.reactions)
            post.reactions = {
              thumbsUp: 0,
              wow: 0,
              heart: 0,
              rocket: 0,
              coffee: 0
            }
          return post
        })
        postsAdapter.setAll(initialState, loadedPosts)
      },
      providesTags: result => [...result.ids.map(id => ({ type: 'Post', id }))]
    }),
    addNewPost: builder.mutation({
      query: post => ({
        url: '/posts',
        method: 'POST',
        body: {
          ...post,
          userId: Number(post.userId),
          date: new Date().toISOString(),
          reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
          }
        }
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }]
    }),
    updatePost: builder.mutation({
      query: post => ({
        url: `posts/${post.id}`,
        method: 'PUT',
        body: {
          ...post,
          date: new Date().toISOString()
        }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]
    }),
    deletePost: builder.mutation({
      query: id => ({
        url: `/post/${id}`,
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Post', id: arg.id }]
    }),
    addReaction: builder.mutation({
      query: (postId, reactions) => ({
        url: `/posts/${postId}`,
        method: 'PATCH',
        body: { reactions }
      }),
      async onQueryStarted({ postId, reactions }, { dispatch, queryFulfilled }) {
        const pathResult = dispatch(
          postsSlice.util.updateQueryData('getPosts', undefined, draft => {
            const post = draft.entities[postId]
            if (post) post.reactions = reactions
          })
        )
        try {
          await queryFulfilled
        } catch {
          pathResult.undo()
        }
      }
    })
  })
})

export const {
  useGetPostsQuery,
  useGetPostsByUserIdQuery,
  useAddNewPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
  useAddReactionMutation
} = postsSlice

export const selectPostsResult = postsSlice.endpoints.getPosts.select()

export const selectPostsData = createSelector(selectPostsResult, postsResult => postsResult.data)

// getSelectors creates selectors that we rename with aliases using destructuring
export const {
  selectAll: selectAllPosts,
  selectById: selectPostById,
  selectIds: selectPostIds
} = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState)
