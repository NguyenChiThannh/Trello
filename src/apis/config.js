import axios from 'axios'
import { toast } from 'react-toastify'
import { API_ROOT } from '~/utils/constants'

export const axiosInstance = axios.create({
  baseURL: API_ROOT,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache'
  },
  withCredentials: true
})

let refreshPromise = null

axiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {

    const originalRequest = error.config

    if (error.response?.status === 401) {
      await logoutUserAPI()
      toast.error('Please log in again.')
    }

    if (error.response?.status === 410 && !originalRequest._retry) {
      // Chi goi 1 lan tai 1 thoi diem
      originalRequest._retry = true
      if (!refreshPromise) {
        // Thiết lập refreshPromise trước khi gọi requestTokenAPI
        refreshPromise = requestTokenAPI()
          .then((res) => {
            return axiosInstance(originalRequest);  // Thực hiện lại request ban đầu
          })
          .catch(async (error) => {
            await logoutUserAPI();
            localStorage.clear();
            window.location.href = '/';
            toast.error('Please log in again.');
            return Promise.reject(error);
          })
          .finally(() => {
            // Đặt lại refreshPromise về null dù thành công hay thất bại
            refreshPromise = null;
          });
      }
    }

    return refreshPromise.then(() => {
      return axiosInstance(originalRequest)
    })
  }
)

const requestTokenAPI = async () => {
  console.log('code chay vào refersh')
  return await axiosInstance.post('/v1/auth/refresh')
}

const logoutUserAPI = async () => {
  await axiosInstance.post('/v1/auth/logout')
}

export const axiosMultipart = axios.create({
  baseURL: API_ROOT,
  timeout: 30000,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true
})

axiosMultipart.interceptors.response.use(function (response) {
  return response
}, function (error) {
  const err = error.response?.data?.message
  toast.error(err)
})

