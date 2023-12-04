import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useAddNewPostMutation } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'

function PostsForm() {
  const [addNewPost, { isLoading }] = useAddNewPostMutation()
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState(1)

  const users = useSelector(selectAllUsers)
  const navigate = useNavigate()

  const handleTitleChange = e => setTitle(e.target.value)
  const handleContentChange = e => setContent(e.target.value)
  const handleAuthorChange = e => setUserId(Number(e.target.value))

  const canSave = [title, content, userId].every(Boolean) && !isLoading

  const handleSubmit = async e => {
    e.preventDefault()
    if (canSave) {
      try {
        await addNewPost({ title, userId, body: content })
        setTitle('')
        setContent('')
        setUserId(1)
        navigate('/')
      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Title:</label>
        <input
          type="text"
          name="postTitle"
          id="postTitle"
          onChange={handleTitleChange}
          value={title}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select name="postAuthor" id="postAuthor" onChange={handleAuthorChange} value={userId}>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <label htmlFor="postContent">Content:</label>
        <input
          type="text"
          name="postContent"
          id="postContent"
          onChange={handleContentChange}
          value={content}
        />
        <button type="submit" onClick={e => handleSubmit(e)}>
          Save Post
        </button>
      </form>
    </section>
  )
}

export default PostsForm
