import { axiosInstance } from './config'

export const createNewCardAPI = async (newCardData) => {
  await axiosInstance.post('/v1/cards/', newCardData)
}