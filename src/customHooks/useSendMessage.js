import { toast } from 'react-toastify'
import { sendMessageAPI } from '~/apis/message'
import useConversation from '~/zustand/useConversation'

const useSendMessage = () => {
  const { messages, setMessages } = useConversation()

  const sendMessage = async (message, boardId, receiverId) => {
    try {
      const res = await sendMessageAPI(message, boardId, receiverId)
      const updateMessage = [...messages]
      updateMessage[0] = {
        ...updateMessage[0],
        messages:[... messages[0].messages, [res.data]]
      }
      setMessages(updateMessage)
    } catch (error) {
      toast.error(error.message)
    }
  }
  return { sendMessage }
}
export default useSendMessage