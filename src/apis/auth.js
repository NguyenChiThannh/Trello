import axios, { formToJSON } from 'axios'
import { logInSuccess, logOutSuccess } from '~/redux/authSlice'
import { toast } from 'react-toastify'
import { axiosInstance } from './config'

// Auth

export const loginUser = async (user, dispatch) => {
  try {
    const res = await axiosInstance.post('/v1/auth/login', user)
    if (res) {
      dispatch(logInSuccess(res.data))
    }
    toast.success('Login successful')
  } catch (error) {
    const err = error.response.data.message
    toast.error(err)
  }
}

export const registerUser = async (user) => {
  try {
    await axiosInstance.post('/v1/auth/register', user)
    toast.success('Send code via email. Please confirm your account')
  } catch (error) {
    const err = error.response.data.message
    toast.error(err)
  }
}


export const logoutUser = async (dispatch) => {
  try {
    await axiosInstance.post('/v1/auth/logout')
    dispatch(logOutSuccess())
    toast.success('Logout successful ')
  } catch (error) {
    const err = error.response.data.message
    toast.error(err)
  }
}


export const getAllBoard = async (user, dispatch, navigate) => {
  const res = await axios.get('/v1/user/${user.id}')
  if (res) {
    dispatch(logInSuccess(res.data))
    navigate(`/${res.data.id}`)
  }
}

