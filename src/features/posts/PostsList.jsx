import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { selectPostIds, fetchPosts, selectPostsError, selectPostsStatus } from './postsSlice'
import PostsExcerpt from './PostsExcerpt'

function PostsList() {
  // const posts = useSelector(selectAllPosts)
  const orderedPostsIds = useSelector(selectPostIds)
  const postsStatus = useSelector(selectPostsStatus)
  const postsError = useSelector(selectPostsError)
  const dispatch = useDispatch()

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts())
    }
  }, [dispatch, postsStatus])

  let content

  if (postsStatus === 'loading') {
    content = <p>Loading...</p>
  } else if (postsStatus === 'success') {
    // const orderedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPostsIds.map(postId => <PostsExcerpt key={postId} postId={postId} />)
  } else if (postsStatus === 'failed') {
    content = <p>{postsError}</p>
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  )
}

export default PostsList
