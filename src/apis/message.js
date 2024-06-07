import { axiosInstance } from './config'

export const sendMessageAPI = async (message, boardId, receiverId) => {
  const res = await axiosInstance.post(`/v1/messages/send/${boardId}/${receiverId}`, message)
  return res
}

export const getMessageAPI = async (boardId, receiverId) => {
  const res = await axiosInstance.get(`/v1/messages/${boardId}/${receiverId}`)
  return res
}