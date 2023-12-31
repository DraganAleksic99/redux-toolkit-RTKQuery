import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import store from './app/store'
import App from './App'
import { postsSlice } from './features/posts/postsSlice'
import { fetchUsers } from './features/users/usersSlice'

store.dispatch(postsSlice.endpoints.getPosts.initiate())
store.dispatch(fetchUsers())

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </Provider>
)
