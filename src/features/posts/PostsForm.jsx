import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Paper, styled } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAddNewPostMutation } from './postsSlice'
import { selectAllUsers } from '../users/usersSlice'
import validationSchema from './yupValidationSchema'

const StyledPaper = styled(Paper)({
  padding: '1em'
})

const StyledSection = styled('section')({
  '&&': {
    maxWidth: '500px',
    margin: 'auto'
  }
})

function PostsForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      author: '1',
      content: ''
    },
    resolver: yupResolver(validationSchema)
  })
  const [addNewPost] = useAddNewPostMutation()

  const users = useSelector(selectAllUsers)
  const navigate = useNavigate()

  const onHandleSubmit = async data => {
    const { title, content, author } = data
    try {
      await addNewPost({ title, userId: author, body: content })
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <StyledPaper elevation={3}>
      <StyledSection>
        <h2>Add a New Post</h2>
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
        </form>
      </StyledSection>
    </StyledPaper>
  )
}

export default PostsForm
