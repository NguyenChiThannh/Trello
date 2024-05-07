import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { axiosInstance } from '~/apis/config'
import Loading from '~/components/Loading/Loading'

function AcceptInvite() {
  const { token1, token2, token3 } = useParams()
  const Token = {
    token: `${token1}.${token2}.${token3}`
  }
  const navigate = useNavigate()
  async function getData () {
    try {
      await axiosInstance.post('/v1/invitations/accpect-invitation', Token)
      toast.success('You have successfully joined the board')
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

export default AcceptInvite