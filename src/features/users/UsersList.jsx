import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Paper, styled } from '@mui/material'
import { selectAllUsers } from './usersSlice'

const StyledPaper = styled(Paper)({
  padding: '1em'
})

function UsersList() {
  const users = useSelector(selectAllUsers)

  return (
    <StyledPaper elevation={3}>
      <section>
        <h2>Users</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              <Link to={`/user/${user.id}`}>{user.name}</Link>
            </li>
          ))}
        </ul>
      </section>
    </StyledPaper>
  )
}

export default UsersList
