import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import { useColorScheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Identify() {
  const [email, setEmail] = useState('')
  const [colorBoxShadow, setColorBoxShadow] = useState('')
  const { mode } = useColorScheme()
  const navigate = useNavigate()
  useEffect(() => {
    setColorBoxShadow(mode =='light' ? 'rgba(17, 17, 26, 0.1)' : 'rgba(250, 250, 250, 0.1)')
  }, [mode])


  const handleSubmit = (e) => {
    e.preventDefault()
    navigate(`${email}`)
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
          // bgcolor: mode =='light' ? 'white' : 'black',
          // width: '25%',
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
          <Typography>
            Enter your email to reset your password
          </Typography>
          <Box component="form" onSubmit={handleSubmit} fullWidth>
            <TextField
              label="Email"
              type='email'
              variant="outlined"
              margin="normal"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              onClick={handleSubmit}
              sx={{ mt: 3 }}
            >
            Next
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center', color: 'white' }}>
              <Link href="/login/identify">Go to login</Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Identify