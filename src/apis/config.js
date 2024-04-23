import axios from 'axios'
import { toast } from 'react-toastify'
import { API_ROOT } from '~/utils/constants'

export const axiosInstance = axios.create({
  baseURL: API_ROOT,
  timeout: 30000, // timeout in 3s
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // Cho phép gửi cokiee cùng với http
})

