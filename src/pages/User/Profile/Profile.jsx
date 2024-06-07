import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import AppBar from '~/components/AppBar'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { uploadProfileAPI } from '~/apis/user'
import { useDispatch } from 'react-redux'
import Loading from '~/components/Loading/Loading'

function Profile() {
  const user = useSelector((state) => state.auth.login.currentUser)

  const [isLoading, setIsLoading] = useState(false)
  const [avatar, setAvatar] = useState(user.avatar)
  const [background, setBackground] = useState(user.background)
  const [displayName, setDisplayName] = useState(user.displayName)
  const [backgroundFile, setBackgroundFile] = useState(null)
  const [avatarFile, setAvatarFile] = useState(null)
  const dispatch = useDispatch()

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0]
    if (file) {
      setAvatar(URL.createObjectURL(file))
      setAvatarFile(file)
    }
  }

  const handleBackgroundChange = async (event) => {
    const file = event.target.files[0]
    if (file) {
      setBackground(URL.createObjectURL(file))
      setBackgroundFile(file)
    }
  }

  const handleAvatarClick = () => {
    document.getElementById('avatarInput').click()
  }

  const handleBackgroundClick = () => {
    document.getElementById('backgroundInput').click()
  }

  const handleSave = async () => {
    const formData = new FormData()
    if (avatarFile) {
      formData.append('avatar', avatarFile)
    }
    if (backgroundFile) {
      formData.append('background', backgroundFile)
    }
    formData.append('displayName', displayName)
    uploadProfileAPI(formData, dispatch, setIsLoading)
  }

  return (
    <Container disableGutters maxWidth={true} sx={{ height:'100vh' }}>
      <AppBar/>
      <Box sx={{
        height: (theme) => theme.trello.appContentHeight,
        width: '100%',
      }}>
        {/* Background */}
        <Box sx={{
          position: 'relative',
          height: '30%',
          width: '100%',
          bgcolor: background ? 'none' : (theme) => theme.palette.secondary.main,
          backgroundImage: background ? `url(${background})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center' }}>
          <Box
            onClick={handleBackgroundClick}
            sx={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              backgroundColor: (theme) => theme.palette.natural.main,
              p: '10px',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize:'14px'
            }}
          >
            Edit background
            <EditIcon sx={{ ml: 1, fontSize:'18px' }} />
          </Box>
          <input
            type="file"
            name="file"
            id="backgroundInput"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleBackgroundChange}
          />
        </Box>
        <Box sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: '-60px',
        }}>
          <Box
            onClick={handleAvatarClick}
            sx={{
              borderRadius: '50%',
              height: '120px',
              width: '120px',
              mb: '4px',
              backgroundImage: avatar ? `url(${avatar})` : 'none',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              cursor: 'pointer',
              zIndex: 1,
            }}
          >
            <input
              type="file"
              name="file"
              id="avatarInput"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleAvatarChange}
            />
          </Box>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 'bold',
              fontSize: '18px'
            }}>{user.displayName}</Typography>
        </Box>
        <Box sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <Box
            sx={{
              width: '50%',
            }}
          >
            <Typography variant="body2"
              sx={{
                fontWeight: 'bold',
                fontSize: '16px',
                mb:'8px',
              }}>Email</Typography>
            <TextField
              disabled
              label={user.email}
              type='email'
              variant="outlined"
              fullWidth
              sx={{
                mb:'16px'
              }}
            />
            <Typography variant="body2"
              sx={{
                fontWeight: 'bold',
                fontSize: '16px',
                mb:'10px',
              }}>Full Name</Typography>
            <TextField
              required
              type='text'
              onChange={(e) => {setDisplayName(e.target.value)}}
              defaultValue={displayName}
              fullWidth
              sx={{
                mb:'16px'
              }}
            />
            <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={handleSave}
                // disabled={isLoading}
              > Save </Button>
            </Box>
          </Box>

        </Box>
      </Box>
      <Loading open={isLoading} />
    </Container>
  )
}

export default Profile