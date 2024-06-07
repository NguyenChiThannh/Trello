import { logInSuccess, logOutSuccess } from '~/redux/authSlice'
import { toast } from 'react-toastify'
import { axiosInstance } from './config'

// Auth

export const loginUserAPI = async (user, dispatch, setIsLoading) => {
  setIsLoading(true)
  try {
    const res = await axiosInstance.post('/v1/auth/login', user)
    if (res) {
      dispatch(logInSuccess(res.data))
      toast.success('Login successful')
    }
  } catch (error) {
    // Error handling is already done in the interceptor
  } finally {
    setIsLoading(false)
  }
}

export const registerUserAPI = async (user, setIsLoading) => {
  setIsLoading(true)
  try {
    const res = await axiosInstance.post('/v1/auth/register', user)
    if (res) {
      toast.success('Send code via email. Please confirm your account')
    }
  } catch (error) {
    // Error handling is already done in the interceptor
  } finally {
    setIsLoading(false)
  }
}

export const logoutUserAPI = async (dispatch, navigate, setIsLoading) => {
  setIsLoading(true)
  try {
    const res = await axiosInstance.post('/v1/auth/logout')
    if (res) {
      navigate('/')
      dispatch(logOutSuccess())
      toast.success('Logout successful ')
    }
  } catch (error) {
    // Error handling is already done in the interceptor
  } finally {
    setIsLoading(false)
  }
}

