import { useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { selectPostById } from './postsSlice'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'
import ReactionButtons from './ReactionButtons'

function PostPage() {
  const { postId } = useParams()
  const post = useSelector(state => selectPostById(state, Number(postId)))

  if (!post) {
    return (
      <section>
        <p>Post not found</p>
      </section>
    )
  }

  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
        <Link className="routerLink" to={`/post/edit/${postId}`}>
          Edit Post
        </Link>
      </p>
      <ReactionButtons post={post} />
    </article>
  )
}

export default PostPage
