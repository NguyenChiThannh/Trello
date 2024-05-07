import { toast } from 'react-toastify'
import { axiosInstance } from './config'

export const sendOTP = async (email) => {
  const res = await axiosInstance.post('/v1/otp', email)
  if (res) {
    toast.success('Send code via email')
  }
}

export const verifyOTP = async (email, navigate) => {
  const res = await axiosInstance.post('/v1/otp/verify', email)
  if (res) {
    toast.success('Send new password via email')
    navigate('/')
  }
}