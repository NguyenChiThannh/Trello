import { logInSuccess, logOutSuccess } from '~/redux/authSlice'
import { toast } from 'react-toastify'
import { axiosInstance } from './config'

// Auth

export const loginUser = async (user, dispatch) => {
  const res = await axiosInstance.post('/v1/auth/login', user)
  if (res) {
    dispatch(logInSuccess(res.data))
    toast.success('Login successful')
  }
}

export const registerUser = async (user) => {
  const res = await axiosInstance.post('/v1/auth/register', user)
  if (res) {
    toast.success('Send code via email. Please confirm your account')
  }
}

export const logoutUserAPI = async (dispatch, navigate) => {
  const res = await axiosInstance.post('/v1/auth/logout')
  if (res) {
    navigate('/')
    dispatch(logOutSuccess())
    toast.success('Logout successful ')
  }
}

