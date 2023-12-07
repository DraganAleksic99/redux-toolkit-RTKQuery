import * as Yup from 'yup'

const schema = Yup.object({
  title: Yup.string().max(255).required(),
  author: Yup.string().max(255).required(),
  content: Yup.string().max(4000).required()
}).required()

export default schema
