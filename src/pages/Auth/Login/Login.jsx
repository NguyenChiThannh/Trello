import { useEffect, useState } from 'react'
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
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import OutlinedInput from '@mui/material/OutlinedInput'
import Box from '@mui/material/Box'
import { useColorScheme } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '~/apis/auth'


function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [colorBoxShadow, setColorBoxShadow] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { mode } = useColorScheme()

  useEffect(() => {
    setColorBoxShadow(mode =='light' ? 'rgba(17, 17, 26, 0.1)' : 'rgba(250, 250, 250, 0.1)')
  }, [mode])


  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const user = {
      username,
      password,
    }
    loginUser(user, dispatch, navigate)
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
          // bgcolor: mode =='light' ? 'white' : 'black',
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
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}> {/* Added this Box */}
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </Box>
          <Typography variant="h5"
            sx={{ textAlign: 'center',
              color: (theme) => theme.palette.primary.main,
              fontWeight: 'medium',
              my:'15px'
            }}>Login</Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Username"
              variant="outlined"
              margin="normal"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormControl variant="outlined" fullWidth sx={{ mt: '10px' }}>
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
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
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={isLoading}
              sx={{ mt: 3 }}
            >
            Login
              {isLoading && <CircularProgress size={24} sx={{ ml: 1 }} />}
            </Button>
            <Box sx={{ mt: 2, textAlign: 'center', color: 'white' }}>
              <Link href="#">Forgot password?</Link>
            </Box>
            <Box color="primary" sx={{ my: 2, textAlign: 'center' }}>
              <Typography variant="body1" gutterBottom>Don&apos;t have an account&nbsp;
                <Link href="/register" >Sign up</Link>
              </Typography>
            </Box>
            <Divider>or connect with</Divider>
            <Stack direction="row" spacing={3} justifyContent="center" alignItems="center" sx={{ my: 2 }}>
              <FacebookIcon fontSize="large"/>
              <GoogleIcon fontSize="large"/>
              <GitHubIcon fontSize="large"/>
            </Stack>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}


export default Login