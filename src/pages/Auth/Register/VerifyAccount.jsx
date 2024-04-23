import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { axiosInstance } from '~/apis/config'
import Loading from '~/components/Loading/loading'

function VerifyAccount() {
  const { token1, token2, token3 } = useParams()
  const infoUserToken = {
    token: `${token1}.${token2}.${token3}`
  }
  const navigate = useNavigate()
  async function getData () {
    try {
      await axiosInstance.post('/v1/auth/verify-account', infoUserToken)
      toast.success('Verify Success. Please log in !!!')
      navigate('/')
    } catch (error) {
      const err = error.response.data.message
      toast.error(err)
      navigate('/')
    }
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <Loading/>
  )
}

export default VerifyAccount
