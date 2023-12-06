import { useSelector } from 'react-redux'
import { Paper, styled } from '@mui/material'
import { selectPostIds, useGetPostsQuery } from './postsSlice'
import PostsExcerpt from './PostsExcerpt'

const StyledPaper = styled(Paper)({
  padding: '1em'
})

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
    <StyledPaper elevation={3}>
      <section>
        <h2>Posts</h2>
        <div className="content">{content}</div>
      </section>
    </StyledPaper>
  )
}

export default PostsList
