import { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Link from '@mui/material/Link'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import FacebookIcon from '@mui/icons-material/Facebook'
import GoogleIcon from '@mui/icons-material/Google'
import GitHubIcon from '@mui/icons-material/GitHub'
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useColorScheme } from '@mui/material'


import Box from '@mui/material/Box'
import { registerUser } from '~/apis/auth'
import { API_ROOT } from '~/utils/constants'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [colorBoxShadow, setColorBoxShadow] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState({})
  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const { mode } = useColorScheme()

  useEffect(() => {
    setColorBoxShadow(mode =='light' ? 'rgba(17, 17, 26, 0.1)' : 'rgba(250, 250, 250, 0.1)')
  }, [mode])

  const validateEmail = (email) => {
    return email.match(
      // eslint-disable-next-line no-useless-escape
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  }
  const google = () => {
    window.open(`${API_ROOT}/v1/auth/google`, '_self')
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    const newUser= {
      email,
      password,
      repeatPassword,
    }
    setFormError({
      email:!email,
      emailType: !validateEmail(email),
      password: !password,
      repeatPassword: newUser.password !== newUser.repeatPassword,
    })
    if (newUser.password === newUser.repeatPassword) {
      registerUser({
        email: newUser.email,
        password: newUser.password,
      })
    }
    setIsLoading(true)

    // Gọi API đăng nhập với username và password

    // Sau khi nhận được phản hồi từ API:
    setIsLoading(false)

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
          // backgroundColor: 'blue',
          width: '25%',
          margin: '0 auto',
          padding: '2rem',
          borderRadius: '1rem',
          display: 'flex',
          alignItems: 'center',
          // eslint-disable-next-line quotes
          boxShadow: `${colorBoxShadow} 0px 1px 0px, ${colorBoxShadow} 0px 0px 8px`,
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </Box>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>Sign up</Typography>
          <Box>
            <TextField
              required
              label="Email"
              type="email"
              variant="outlined"
              margin="normal"
              value={email}
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
            />
            { formError?.email && <Typography sx={{ color: 'error.main', fontWeight: 'bold' }}>Email not be empty</Typography> }
            { !formError?.email && formError?.emailType && <Typography sx={{ color: 'error.main', fontWeight: 'bold' }}>Please enter the correct email type</Typography> }
            <FormControl variant="outlined" fullWidth sx={{ my: '15px' }}>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                required
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              { formError?.password && <Typography sx={{ color: 'error.main', fontWeight: 'bold', mt:'10px' }}>Password not be empty</Typography> }

            </FormControl>
            <FormControl variant="outlined" fullWidth sx={{ my: '10px' }}>
              <InputLabel htmlFor="outlined-adornment-repeat-password">Confirm Password</InputLabel>
              <OutlinedInput
                required
                id="outlined-adornment-repeat-password"
                type={showPassword ? 'text' : 'password'}
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm Password"
              />
              { formError?.repeatPassword && !formError?.password && <Typography sx={{ color: 'error.main', fontWeight: 'bold', mt:'10px' }}>Password don&apos;t match</Typography> }
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={isLoading}
              sx={{ mt: 3 }}
            >
            Sign up
              {isLoading && <CircularProgress size={24} sx={{ ml: 1 }} />}
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center', color: 'white' }}>
              <Link href="/login/identify">Forgot password?</Link>
            </Box>
            <Box color="primary" sx={{ my: 2, textAlign: 'center' }}>
              <Typography variant="body1" gutterBottom>Already have an account?&nbsp;
                <Link href="/" >Login</Link>
              </Typography>
            </Box>
            <Divider>or connect with</Divider>
            <Stack direction="row" spacing={3} justifyContent="center" alignItems="center" sx={{ my: 2 }}>
              <FacebookIcon fontSize="large"/>
              <GoogleIcon fontSize="large" onClick={google}/>
              <GitHubIcon fontSize="large"/>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}


export default Register