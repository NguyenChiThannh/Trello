import { useState } from 'react'
import useConversation from '../zustand/useConversation'
import { toast } from 'react-toastify'
import { getMessageAPI } from '~/apis/message'

const useGetMessages = () => {
  const [loading, setLoading] = useState(true)
  const { messages, setMessages } = useConversation()

  const getMessage = async (boardId, receiverId) => {
    setLoading(true)
    try {
      const res = await getMessageAPI(boardId, receiverId)
      setMessages(res?.data)
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
    return { messages, loading }
  }
  return { getMessage, loading }
}
export default useGetMessages