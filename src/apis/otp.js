import { toast } from 'react-toastify'
import { axiosInstance } from './config'

export const sendOTP = async (email) => {
  try {
    const res = await axiosInstance.post('/v1/otp', email)
    toast.success(res.data.message)
  } catch (error) {
    const err = error.response.data.message
    toast.error(err)
  }
}

export const verifyOTP = async (email, navigate) => {
  try {
    const res = await axiosInstance.post('/v1/otp/verify', email)
    toast.success(res.data.message)
    navigate('/')
  } catch (error) {
    const err = error.response.data.message
    toast.error(err)
  }
}