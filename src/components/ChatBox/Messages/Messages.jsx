import Box from '@mui/material/Box'
import ReceivedMessage from './Message/ReceivedMessage'
import SentMessage from './Message/SentMessage'
import useConversation from '~/zustand/useConversation'
import { useSelector } from 'react-redux'
import { useEffect, useRef } from 'react'

function Messages() {
  const { messages } = useConversation()
  const user = useSelector((state) => state.auth.login.currentUser)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'instant' })
  }
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  return (
    <Box sx={{
      height: '312px',
      m: '0px 0px 10px 10px',
      p:'0px 5px 0px 0px',
      overflowY: 'auto',
      overflowX: 'hidden',
      '&::-webkit-scrollbar-thumb':{ borderRadius: '8px' },
      '&::-webkit-scrollbar-thumb:hover':{ backgroundColor: (theme) => theme.palette.secondary.main }
    }}>
      {messages.length !== 0 && messages[0].messages.map((messageObj, index) => {
        const message = messageObj[0]
        if (message.senderId === user._id) {
          return (
            <SentMessage
              key={index}
              message={message.message}
              time = {message.createdAt}
            />
          )
        }
        else if (message.receiverId === user._id) {
          return (
            <ReceivedMessage
              key={index}
              message={message.message}
              time = {message.createdAt}
            />
          )
        }
      })}
      <Box ref={messagesEndRef} />
    </Box>
  )
}

export default Messages