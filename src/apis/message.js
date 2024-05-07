import { toast } from 'react-toastify'
import { axiosInstance } from './config'

export const sendMessageAPI = async (data, receiverId) => {
  await axiosInstance.post(`/v1/messages/post/${receiverId}`, data)
}

export const getMessageAPI = async (boardId, receiverId) => {
  await axiosInstance.get(`/v1/messages/${boardId}/${receiverId}`)
}