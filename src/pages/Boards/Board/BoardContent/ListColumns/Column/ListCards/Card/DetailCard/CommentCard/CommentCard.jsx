import Box from '@mui/material/Box'
import { useDispatch, useSelector } from 'react-redux'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { addCommentAPI } from '~/apis/card'
import { toast } from 'react-toastify'
import { getBoardDetailAPI } from '~/apis/board'
import { timeAgo } from '~/utils/formatters'


function CommentCard({ card }) {
  const [cardState, setCardState] = useState(card)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector((state) => state.auth.login.currentUser)
  const [comment, setComment] = useState('')

  const handleAddComment = async () => {
    try {
      const data = {
        displayName: user.displayName,
        avatar: user.avatar,
        content: comment,
        cardId: card._id,
        boardId: card.boardId,
      }
      const res = await addCommentAPI(data)
      setCardState(res)
      await getBoardDetailAPI(card.boardId, dispatch, null, setIsLoading)
      setComment('')
    } catch (error) {
      toast(error)
    }

  }
  return (
    <Box>
      <Box display="flex" alignItems="center" sx={{ mt:'16px' }}>
        <Avatar alt={user.displayName} src={user.avatar} sx={{ mr: '16px' }}/>
        <TextField
          label="Enter Comment..."
          variant="outlined"
          value={comment}
          onChange={(e) => {setComment(e.target.value)}}
          fullWidth
          sx={{
            mr: '16px',
            '& .MuiOutlinedInput-root': {
              alignItems: 'center',
              '& input': {
                padding: '10px 14px',
              },
            },
            '& .MuiInputLabel-root': {
              top: '50%',
              transform: 'translate(14px, -50%) scale(1)',
            },
            '& .MuiInputLabel-shrink': {
              top: 0,
              transform: 'translate(14px, -6px) scale(0.75)',
            },
          }}
          margin="none"
        />
        <Button variant="contained" onClick={handleAddComment}>Save</Button>
      </Box>
      {cardState?.comments?.slice().reverse().map(comment =>
        <Box display="flex" alignItems="center" key={comment._id} sx={{ mt:'16px' }} >
          <Avatar alt={comment.userDisplayName} src={comment.userAvatar} sx={{ mr: '16px' }}/>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 'bold', marginRight: '8px' }}>{comment.userDisplayName}</Typography>
              <Typography variant="body2" component="p" sx={{ fontSize:'12px' }}>{timeAgo(comment.createdAt)}</Typography>
            </Box>
            <Typography >{comment.content}</Typography>
          </Box>
        </Box>)}
    </Box>
  )
}

export default CommentCard