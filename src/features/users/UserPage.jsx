import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectUserById } from './usersSlice'
import { useGetPostsByUserIdQuery } from '../posts/postsSlice'

function UserPage() {
  const { userId } = useParams()
  const intUserId = Number(userId)

  const {
    data: postsForUser,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetPostsByUserIdQuery(intUserId)

  const user = useSelector(state => selectUserById(state, intUserId))

  let content

  if (isLoading) content = <p>Loading...</p>
  if (isError)
    content = (
      <>
        <p>Something went front</p>
        {error}
      </>
    )
  if (isSuccess) {
    const { ids, entities } = postsForUser
    content = ids.map(id => (
      <li key={id}>
        <Link to={`/post/${id}`}>{entities[id].title}</Link>
      </li>
    ))
  }

  return (
    <section>
      <h2>{user?.name}</h2>
      <ol>{content}</ol>
    </section>
  )
}

export default UserPage
