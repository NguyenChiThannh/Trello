import { useDispatch } from 'react-redux'
import Loading from '~/components/Loading/loading'
import { axiosInstance } from '~/apis/config'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { logInSuccess } from '~/redux/authSlice'
import { useEffect } from 'react'

const LoginSuccess = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  async function sendRequest () {
    try {
      const res = await axiosInstance.get('/v1/auth/login-success')
      dispatch(logInSuccess(res.data))
      toast.success('Login successful')
      navigate('/')
    } catch (error) {
      const err = error.response.data.message
      toast.error(err)
      navigate('/')
    }
  }

  useEffect(() => {
    sendRequest()
  }, [])
  return (
    <Loading/>
  )
}

export default LoginSuccess