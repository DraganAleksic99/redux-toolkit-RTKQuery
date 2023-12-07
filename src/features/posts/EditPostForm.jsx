import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Paper, styled } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import validationSchema from './yupValidationSchema'
import { selectAllUsers } from '../users/usersSlice'
import { useUpdatePostMutation, useDeletePostMutation, selectPostById } from './postsSlice'

const StyledPaper = styled(Paper)({
  padding: '1em'
})

const StyledSection = styled('section')({
  '&&': {
    maxWidth: '500px',
    margin: 'auto'
  }
})

function EditPostForm() {
  const [deletePost] = useDeletePostMutation()
  const [updatePost] = useUpdatePostMutation()

  const { postId } = useParams()
  const navigate = useNavigate()

  const post = useSelector(state => selectPostById(state, Number(postId)))
  const users = useSelector(selectAllUsers)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: post?.title || '',
      author: post?.userId || '',
      content: post?.body || 'dfsdf'
    },
    resolver: yupResolver(validationSchema)
  })

  const onHandleSubmit = async data => {
    const { title, author, content } = data
    try {
      await updatePost({
        userId: Number(author),
        title,
        id: Number(postId),
        body: content,
        reactions: post.reactions
      }).unwrap()
      navigate(`/post/${postId}`)
    } catch (error) {
      console.error('Failed to save a post', error)
    }
  }

  const handleDeletePost = async () => {
    try {
      deletePost(Number(postId)).unwrap()
      navigate('/')
    } catch (error) {
      console.error('Failed to delete a post', error)
    }
  }

  if (!post) {
    return (
      <section>
        <h2>Post not found</h2>
      </section>
    )
  }

  return (
    <StyledPaper>
      <StyledSection>
        <h2>Edit Post</h2>
        <form onSubmit={handleSubmit(data => onHandleSubmit(data))}>
          <label htmlFor="title">Title:</label>
          <input type="text" {...register('title')} id="title" />
          <p>{errors?.title?.message}</p>
          <label htmlFor="author">Author:</label>
          <select {...register('author')} id="author">
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          <p>{errors?.author?.message}</p>
          <label htmlFor="content">Content:</label>
          <textarea type="text" {...register('content')} id="content" />
          <p>{errors?.content?.message}</p>
          <button type="submit">Save Post</button>
          <button className="deleteButton" type="submit" onClick={handleDeletePost}>
            Delete Post
          </button>
        </form>
      </StyledSection>
    </StyledPaper>
  )
}

export default EditPostForm
