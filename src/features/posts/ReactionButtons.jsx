import { useAddReactionMutation } from './postsSlice'

const reactionEmojis = {
  thumbsUp: '👍',
  wow: '😮',
  heart: '❤️',
  rocket: '🚀',
  coffee: '☕'
}

function ReactionButtons({ post }) {
  const [addReaction] = useAddReactionMutation()

  const reactionButtons = Object.entries(reactionEmojis).map(([name, emoji]) => (
    <button
      key={name}
      type="button"
      className="reactionButton"
      onClick={() => {
        const newReaction = post.reactions[name] + 1
        addReaction({ postId: post.id, reactions: { ...post.reactions, [name]: newReaction } })
      }}
    >
      {emoji} {post.reactions[name]}
    </button>
  ))

  return <span>{reactionButtons}</span>
}

export default ReactionButtons
