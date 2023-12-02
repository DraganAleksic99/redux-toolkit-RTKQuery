import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectCounter, incrementCount } from '../features/posts/postsSlice'

function Header() {
  const dispatch = useDispatch()
  const counter = useSelector(selectCounter)
  return (
    <header className="Header">
      <h1>Redux Blog</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/post">Post</Link>
          </li>
          <li>
            <Link to="/user">Users</Link>
          </li>
        </ul>
        <button type="button" onClick={() => dispatch(incrementCount())}>
          {`-  ${counter}  -`}
        </button>
      </nav>
    </header>
  )
}

export default Header
