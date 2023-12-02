import { useDispatch } from 'react-redux'
import { addReaction } from './postsSlice'

const reactionEmojis = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕'
}

function ReactionButtons({ post }) {
  const dispatch = useDispatch()

  const reactionButtons = Object.entries(reactionEmojis).map(([name, emoji]) => (
    <button
      key={name}
      type="button"
      className="reactionButton"
      onClick={() => {
        dispatch(addReaction({ postId: post.id, reaction: name }))
      }}
    >
      {emoji} {post.reactions[name]}
    </button>
  ))

  return <div>{reactionButtons}</div>
}

export default ReactionButtons
