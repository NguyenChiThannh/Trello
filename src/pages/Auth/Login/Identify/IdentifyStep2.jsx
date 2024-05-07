import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import { useColorScheme } from '@mui/material'
import OTP_Input from '~/components/OTPInput/OTPInput'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useParams } from 'react-router-dom'
import { sendOTP } from '~/apis/otp'

function IdentifyStep2() {
  const [openDialogOTP, setOpenDialogOTP] = useState(false)
  const [openDialogTelephoneNumber, setOpenDialogTelephoneNumber] = useState(false)
  const [colorBoxShadow, setColorBoxShadow] = useState('')
  const [telephoneNumber, setTelephoneNumber] = useState('')
  const { mode } = useColorScheme()
  const email = useParams()
  useEffect(() => {
    setColorBoxShadow(mode =='light' ? 'rgba(17, 17, 26, 0.1)' : 'rgba(250, 250, 250, 0.1)')
  }, [mode])

  const handleSendCodeToEmail = (e) => {
    e.preventDefault()
    setOpenDialogOTP(true)
    sendOTP(email)


    // Gọi API đăng nhập với email và password

    // Sau khi nhận được phản hồi từ API:

    // Xử lý kết quả đăng nhập (thành công/thất bại)
  }
  const handleSendCodeToTelephoneNumber = (e) => {
    e.preventDefault()
    setOpenDialogTelephoneNumber(false)
    console.log(telephoneNumber)
    setTelephoneNumber('')
    // Gọi API đăng nhập với email và password

    // Sau khi nhận được phản hồi từ API:

    // Xử lý kết quả đăng nhập (thành công/thất bại)
  }
  return (
    <Box sx={{
      // backgroundColor: (theme) => theme.palette.secondary.main,
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
    }}>

      <Box
        sx={{
          margin: '0 auto',
          padding: '2rem',
          borderRadius: '1rem',
          display: 'flex',
          alignItems: 'center',
          // eslint-disable-next-line quotes
          boxShadow: `${colorBoxShadow} 0px 1px 0px, ${colorBoxShadow} 0px 0px 8px`,
        }}
      >
        <Box >
          <Typography variant="h5"
            sx={{ textAlign: 'center',
              color: (theme) => theme.palette.primary.main,
              fontWeight: 'medium',
              my:'15px'
            }}>
              Forget PassWord
          </Typography>
          <Typography sx={{
            textAlign: 'center',
          }}>
          Receive authentication code via:
          </Typography>
          <Box fullWidth>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              onClick={handleSendCodeToEmail}
              sx={{ mt: 3 }}
            >
            Email
            </Button>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              onClick={() => {setOpenDialogTelephoneNumber(true)}}
              sx={{ mt: 3 }}
            >
            Phone number
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center', color: 'white' }}>
              <Link href="">Go to login</Link>
            </Box>
          </Box>
        </Box>
      </Box>
      {openDialogOTP && <OTP_Input email={email.email} onClose={() => setOpenDialogOTP(false)} />}

      {/* DiaLog To Enter Telephone Number */}
      <Dialog
        open={openDialogTelephoneNumber}
        onClose={() => {setOpenDialogTelephoneNumber(false)}}
      >
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: (theme) => theme.palette.primary.main
          }}>Telephone Number</DialogTitle>
        <DialogContent>
          <Typography sx={{
            textAlign: 'center',
            marginBottom: '10px'
          }} >Enter your phone number</Typography>
          <TextField
            fullWidth
            autoFocus
            label="Telephone Number"
            value={telephoneNumber}
            onChange={(e) => setTelephoneNumber(e.target.value)}
          >

          </TextField>

          <Button
            onClick={handleSendCodeToTelephoneNumber}
            sx={{
              display:'flex',
              maxWidth: '100px',
              justifyContent:'center',
              marginTop:'20px',
              fontSize:'16px',
              marginX: 'auto',
            }}>
            Send
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default IdentifyStep2