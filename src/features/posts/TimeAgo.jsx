import { parseISO, formatDistanceToNow } from 'date-fns'

function TimeAgo({ timestamp }) {
  const date = parseISO(timestamp)
  const timePeriod = formatDistanceToNow(date)
  const timeAgo = `${timePeriod} ago`

  return (
    <span title={timestamp}>
      &nbsp;<i>{timeAgo}</i>
    </span>
  )
}

export default TimeAgo
