import { toast } from 'react-toastify'
import { axiosInstance } from './config'

export const inviteMemberAPI = async (data) => {
  const res = await axiosInstance.post('/v1/invitations/', data)
  if (res) {
    toast.success('Send code via email. Please confirm your account')
  }
}