import { toast } from 'react-toastify'
import { axiosInstance, axiosMultipart } from './config'

export const createNewCardAPI = async (newCardData) => {
  await axiosInstance.post('/v1/cards/', newCardData)
}

export const updateCoverAPI = async (formData) => {
  const res = await axiosMultipart.patch('/v1/cards/uploadCover', formData)
  if (res) {
    toast.success('Upload successful')
  }
}

export const updateDescriptionAPI = async (data) => {
  await axiosInstance.patch('/v1/cards/updateDescription', data)
}

export const addCommentAPI = async (data) => {
  const res = await axiosInstance.post('/v1/cards/comment', data)
  return res.data
}