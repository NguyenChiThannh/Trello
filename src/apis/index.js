import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

// Không try catch bởi vì bắt lỗi tập trung trong Interceptors của axios

export const fetchBoardDetailsAPI = async (boardId) => {
  const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
  return response.data
}