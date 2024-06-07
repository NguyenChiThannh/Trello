import { useEffect } from 'react'
import { API_ROOT } from '~/utils/constants'
import useConversation from '~/zustand/useConversation'
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux'

const useListenMessages = () => {
  const user = useSelector((state) => state.auth.login.currentUser)
  const socket = io(API_ROOT, {
    query: {
      userId: user._id,
    },
  })
  const { messages, setMessages } = useConversation()

  useEffect(() => {
    socket.on('newMessage', (newMessage) => {
      newMessage.shouldShake = true
      if (messages.length !== 0 ) {
        const updateMessage = [...messages]
        updateMessage[0] = {
          ...updateMessage[0],
          messages:[... messages[0].messages, [newMessage]]
        }
        setMessages(updateMessage)
      }
      else {
        const updateMessage = [...messages]
        updateMessage[0] = {
          ...updateMessage[0],
          messages:[[newMessage]]
        }
        setMessages(updateMessage)
      }

    })

    return () => socket?.off('newMessage')
  }, [socket, setMessages, messages])
}
export default useListenMessages