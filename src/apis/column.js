import { axiosInstance } from './config'

export const createNewColumnAPI = async (newColumnData) => {
  await axiosInstance.post('/v1/columns/', newColumnData)

}

export const updatedAtColumnDetailsAPI = async (columnId, updateData) => {
  await axiosInstance.put(`/v1/columns/${columnId}`, updateData)

}

export const deleteColumnDetailsAPI = async (columnId) => {
  await axiosInstance.delete(`/v1/columns/${columnId}`)
}