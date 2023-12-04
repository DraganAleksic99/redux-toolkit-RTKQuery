import { useSelector } from 'react-redux'
import { selectPostIds, useGetPostsQuery } from './postsSlice'
import PostsExcerpt from './PostsExcerpt'

function PostsList() {
  // const posts = useSelector(selectAllPosts)
  const orderedPostsIds = useSelector(selectPostIds)
  const { isLoading, isSuccess, isError, error } = useGetPostsQuery()

  let content

  if (isLoading) {
    content = <p>Loading...</p>
  } else if (isSuccess) {
    // const orderedPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date))
    content = orderedPostsIds.map(postId => <PostsExcerpt key={postId} postId={postId} />)
  } else if (isError) {
    content = <p>{error}</p>
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  )
}

export default PostsList
