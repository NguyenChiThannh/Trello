import { toast } from 'react-toastify'
import { axiosMultipart } from './config'
import { logInSuccess } from '~/redux/authSlice'

export const uploadProfileAPI = async (formData, dispatch, setIsLoading) => {
  setIsLoading(true)
  try {
    const res = await axiosMultipart.patch('/v1/user/upload', formData)
    if (res) {
      dispatch(logInSuccess(res.data))
      toast.success('Upload successful')
    }
  } catch (error) {
    // Error handling is already done in the interceptor
  } finally {
    setIsLoading(false)
  }
}
