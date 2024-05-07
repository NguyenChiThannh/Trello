import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { io } from 'socket.io-client'
import { API_ROOT } from '~/utils/constants'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import SendIcon from '@mui/icons-material/Send'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import { Padding } from '@mui/icons-material'
import Messages from './Messages/Messages'
import { useSelector } from 'react-redux'


function ChatBox({ open, receiverId }) {
  const [newMessage, setNewMessage] = useState()
  const [openChatBox, setOpenChatBox] = useState(open ? 'block' : 'none')
  const board = (useSelector((state) => state.board.board.board))
  const receiverInfo = board.user[0]
  const findMemberInBoard = (members, receiverId) => {
    for (let i = 0; i < members.length; i++) {
      if (members[i]._id == receiverId) {
        return members[i]
      }
    }
    // Nếu không tìm thấy đối tượng nào có id trùng khớp, trả về null
    return null
  }
  // console.log('🚀 ~ ChatBox ~ receiverInfo:', receiverInfo)
  const senderInfo = findMemberInBoard(board.members, receiverId)
  // console.log('🚀 ~ ChatBox ~ senderInfo:', senderInfo)
  const socket = io(API_ROOT)
  const handleSendNewMessage = (e) => {
    e.preventDefault()
    console.log('Code chay vao day')
    console.log('🚀 ~ handleSendNewMessage ~ newMessage:', newMessage)
    socket.emit('message', newMessage)
    setNewMessage('')
  }

  const handleCloseChatBox =() => {
    open = false
  }

  useEffect(() => {
    board
    receiverId
  }, [receiverId])
  // useEffect(() => {
  //   socket.on('connect', () => {
  //     console.log('connected')
  //     console.log('🚀 ~ socket.on ~ socket:', socket.id)
  //   })
  //   socket.on('welcome', (s) => {
  //     console.log(s)
  //   })
  //   socket.on('receive-message', (data) => {
  //     console.log('🚀 ~ socket.on ~ data:', data)
  //   })
  //   return () => {
  //     socket.disconnect()
  //   }
  // }, [])


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