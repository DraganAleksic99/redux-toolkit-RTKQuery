import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Paper, styled } from '@mui/material'
import { selectUserById } from './usersSlice'
import { useGetPostsByUserIdQuery } from '../posts/postsSlice'

const StyledPaper = styled(Paper)({
  padding: '1em'
})

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
    <StyledPaper>
      <section>
        <h2>{user?.name}</h2>
        <ol>{content}</ol>
      </section>
    </StyledPaper>
  )
}

export default UserPage
