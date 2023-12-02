import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import PostsList from './features/posts/PostsList'
import PostsForm from './features/posts/PostsForm'
import PostPage from './features/posts/PostPage'
import Layout from './components/Layout'
import EditPostForm from './features/posts/EditPostForm'
import UsersList from './features/users/UsersList'
import UserPage from './features/users/UserPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostsList />} />
        <Route path="post">
          <Route index element={<PostsForm />} />
          <Route path="edit/:postId" element={<EditPostForm />} />
          <Route path=":postId" element={<PostPage />} />
        </Route>
        <Route path="user">
          <Route index element={<UsersList />} />
          <Route path=":userId" element={<UserPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
