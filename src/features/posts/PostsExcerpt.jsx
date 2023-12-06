import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Paper, styled } from '@mui/material'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'
import { selectPostById } from './postsSlice'

const StyledPaper = styled(Paper)({
  flex: '1 1 500px',
  borderRadius: '15px'
})

function PostsExcerpt({ postId }) {
  const post = useSelector(state => selectPostById(state, postId))

  return (
    <StyledPaper elevation={5}>
      <article>
        <h3>{post.title}</h3>
        <p className="excerpt">{post.body.substring(0, 150)}...</p>
        <p className="postCredit">
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
          <br />
          <Link className="routerLink" to={`/post/${post.id}`}>
            View Post
          </Link>
          <ReactionButtons post={post} />
        </p>
      </article>
    </StyledPaper>
  )
}

export default PostsExcerpt
