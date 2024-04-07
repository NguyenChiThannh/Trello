import axios, { formToJSON } from 'axios'
import { loginStart, loginSucess } from '~/redux/authSlice'
import { API_ROOT } from '~/utils/constants'
import { axiosRes, axiosReq } from './config'
// Auth
export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart())
  const res = await axios.post(`${API_ROOT}/v1/auth/login`, user)
  dispatch(loginSucess(res.data))
  navigate('/')
}