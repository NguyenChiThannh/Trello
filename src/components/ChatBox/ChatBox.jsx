import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import SendIcon from '@mui/icons-material/Send'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import Messages from './Messages/Messages'
import { useSelector } from 'react-redux'
import useSendMessage from '~/customHooks/useSendMessage'
import useGetMessages from '~/customHooks/useGetMessages'
import useListenMessages from '~/customHooks/useListenMessages'


function ChatBox({ open, receiverId, onToggle }) {
  const [newMessage, setNewMessage] = useState()
  const board = (useSelector((state) => state.board.board.board))
  const { sendMessage } = useSendMessage()
  const { getMessage, loading } = useGetMessages()

  useListenMessages()

  useEffect(() => {
    getMessage(board._id, receiverId)
  }, [])

  const handleSendNewMessage = (e) => {
    e.preventDefault()
    if (newMessage) {
      const message = {
        message: newMessage
      }
      sendMessage(message, board._id, receiverId)
      setNewMessage('')
    }
  }

  const handleCloseChatBox =() => {
    // setOpenChatBox(false)
    onToggle(false)
  }

  if (loading) {
    return null
  }
  return (
    <Box sx={{
      position: 'fixed',
      display: open ? 'block' : 'none',
      bottom: '0px',
      right: '100px',
      height:'420px',
      width:'320px',
      borderRadius:'8px 8px 0px 0px',
      backgroundColor: (theme) => theme.palette.natural.main
    }}>
      {/* Chat Info */}
      <Box sx={{
        height:'48px',
        backgroundColor: (theme) => theme.palette.secondary.main,
        alignItems: 'center',
        borderRadius:'7px 7px 0px 0px',
        display:'flex',
        justifyContent:'space-between'
      }}>
        <Box sx={{
          display: 'flex',
          gap: '10px',
          mx:'6px',
        }}>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            variant="dot"
            color='primary'
          >
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg"
              sx={{ width: 32, height: 32 }}
            />
          </Badge>
          <Typography variant="h6" justifyContent={'center'} alignItems={'center'} display={'flex'} fontSize={'16px'}>Nguyễn Chí Thanh</Typography>
        </Box>
        <CloseIcon sx={{ mx:'10px' }} onClick={handleCloseChatBox}/>
      </Box>
      {/* Chat Content */}
      <Messages/>
      {/* Input */}
      <Box sx={{
        height: '100%',
        display:'flex',
        justifyContent:'center'
      }}>
        <FormControl sx={{ width:'90%' }} variant="outlined" component="form"
          onSubmit={handleSendNewMessage}>
          <OutlinedInput
            id="outlined-adornment-weight"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value)
            }}
            endAdornment={
              <IconButton type="submit" sx={{ cursor: 'pointer', mr: '-12px' }}>
                <SendIcon />
              </IconButton>}
            sx={{
              height:'42px',
              justifyContent:'center',
              borderRadius: '32px',
            }}
          />
        </FormControl>
      </Box>
    </Box>
  )
}

export default ChatBox