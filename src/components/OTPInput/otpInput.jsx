import { useState } from 'react'
import OtpInput from 'react-otp-input'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { Typography } from '@mui/material'
import Link from '@mui/material/Link'
import { verifyOTP } from '~/apis/otp'
import { useNavigate } from 'react-router-dom'

function OTP_Input({ onClose, email }) {
  const [otp, setOtp] = useState('')
  const [disabled, setDisabled] = useState(true) // Set disable for button verify
  const [open, setOpen] = useState(true)
  const navigate = useNavigate()

  const handleOtpChange = (e) => {
    setOtp(e)
    setDisabled(e.length !== 6)
  }

  const handleClose = () => {
    setOpen(false)
  }


  const verify = () => {
    handleClose()
    const data = {
      email,
      otp,
    }
    verifyOTP(data, navigate)
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault()
          handleClose()
        },
      }}
    >
      <DialogTitle
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
          color: (theme) => theme.palette.primary.main
        }}>Enter OTP</DialogTitle>
      <DialogContent>
        <Typography sx={{
          textAlign: 'center',
          marginBottom: '10px'
        }} >Your code was sent to you via email:</Typography>
        <OtpInput
          value={otp}
          onChange={handleOtpChange}
          numInputs={6}
          renderSeparator={<span style={{ width: '8px' }}></span>}
          isInputNum={true}
          shouldAutoFocus={true}
          inputStyle={{
            border: (theme) => `0.5px solid ${theme.palette.primary.main}`,
            borderRadius: '8px',
            width: '54px',
            height: '54px',
            fontSize: '12px',
            color: '#000',
            fontWeight: '400',
            caretColor: 'blue'
          }}
          focusStyle={{
            border: '1px solid #CFD3DB',
            outline: 'none'
          }}
          renderInput={(props) => <input {...props} />}
        />
        <Button disabled={disabled} onClick={verify}
          sx={{
            display:'flex',
            maxWidth: '100px',
            justifyContent:'center',
            marginTop:'20px',
            fontSize:'20px',
            marginX: 'auto',
            // background:(theme) => theme.palette.primary.main
          }}>
        Verify</Button>
        <Typography variant="body2" sx={{
          textAlign: 'center',
          marginY:'16px'
        }}>
        Didn&apos;t receive code ?  <Link href="#" color="primary">
            Request again
          </Link>
        </Typography>
      </DialogContent>
    </Dialog>

  )
}

export default OTP_Input