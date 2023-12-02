import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersSlice'
import { selectPostsByUser } from '../posts/postsSlice'

function UserPage() {
  const { userId } = useParams()
  const intUserId = Number(userId)
  const user = useSelector(state => selectUserById(state, intUserId))

  const postsForUser = useSelector(state => selectPostsByUser(state, intUserId))

  const postTitles = postsForUser.map(post => (
    <li key={post.id}>
      <Link to={`/post/${post.id}`}>{post.title}</Link>
    </li>
  ))
  return (
    <section>
      <h2>{user?.name}</h2>
      <ol>{postTitles}</ol>
    </section>
  )
}

export default UserPage
