import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import ReceivedMessage from './Message/ReceivedMessage'
import SentMessage from './Message/SentMessage'

function Messages() {
  return (
    <Box sx={{
      height: '304px',
      m: '10px',
      overflowY: 'auto',
    }}>
      <ReceivedMessage></ReceivedMessage>
      <SentMessage></SentMessage>
    </Box>
  )
}

export default Messages