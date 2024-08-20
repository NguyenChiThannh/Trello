import axios from 'axios'
import { toast } from 'react-toastify'
import { API_ROOT } from '~/utils/constants'

export const axiosInstance = axios.create({
  baseURL: API_ROOT,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const err = error.response?.data?.message
    const originalRequest = error.config

    if (error.response && error.response.status === 401 && !originalRequest._retry && err === 'jwt expired') {
      originalRequest._retry = true

      try {
        await requestTokenAPI()
        return axiosInstance(originalRequest)
      } catch (refreshError) {
        localStorage.clear()
        window.location.href = '/'
        toast.error('Please log in again.')
      }
    } else {
      localStorage.clear()
      location.href = '/'
      toast.error('Please log in again.')
    }

    return Promise.reject(error)
  }
)

const requestTokenAPI = async () => {
  await axiosInstance.post('/v1/auth/refresh')
}

export const axiosMultipart = axios.create({
  baseURL: API_ROOT,
  timeout: 30000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true
})

// Add a response interceptor
axiosMultipart.interceptors.response.use(function (response) {
  return response
}, function (error) {
  const err = error.response?.data?.message
  toast.error(err)
})

