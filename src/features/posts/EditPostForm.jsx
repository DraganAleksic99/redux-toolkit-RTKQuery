import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useRef } from 'react'
import { selectPostById, updatePost, deletePost } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'

function EditPostForm() {
  const { postId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const post = useSelector(state => selectPostById(state, Number(postId)))
  const users = useSelector(selectAllUsers)
  const inputRef = useRef(null)

  const [title, setTitle] = useState(post?.title || '')
  const [content, setContent] = useState(post?.body || '')
  const [userId, setUserId] = useState(post?.userId || '')
  const [requestStatus, setRequestStatus] = useState('idle')

  const handleTitleChange = e => setTitle(e.target.value)
  const handleContentChange = e => setContent(e.target.value)
  const handleAuthorChange = e => setUserId(Number(e.target.value))

  const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle'

  const handleSubmit = e => {
    e.preventDefault()
    if (canSave) {
      try {
        setRequestStatus('pending')
        dispatch(
          updatePost({
            userId,
            title,
            id: Number(postId),
            body: content,
            reactions: post.reactions
          })
        ).unwrap()
        navigate(`/post/${postId}`)
        setTitle('')
        setContent('')
        setUserId('')
      } catch (error) {
        console.error('Failed to save a post', error)
      } finally {
        setRequestStatus('idle')
      }
    }
  }

  const handleDeletePost = () => {
    try {
      setRequestStatus('pending')
      dispatch(deletePost(Number(postId))).unwrap()
      navigate('/')
    } catch (error) {
      console.error('Failed to delete a post', error)
    } finally {
      setRequestStatus('idle')
    }
  }

  const handleInputClick = () => {
    inputRef.current.select()
  }

  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    )
  }

  return (
    <section>
      <h2>Edit Post</h2>
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
        <select
          name="postAuthor"
          id="postAuthor"
          onChange={handleAuthorChange}
          defaultValue={userId}
        >
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
          ref={inputRef}
          onClick={handleInputClick}
        />
        <button type="submit" onClick={e => handleSubmit(e)}>
          Save Post
        </button>
        <button className="deleteButton" type="button" onClick={handleDeletePost}>
          Delete Post
        </button>
      </form>
    </section>
  )
}

export default EditPostForm
