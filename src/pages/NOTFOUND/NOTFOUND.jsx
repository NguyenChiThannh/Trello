import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'


function NOTFOUND() {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/')
  }


  return (
    <Box sx={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      // flexDirection: 'column',
      justifyContent: 'center', // Center vertically
    }}>
      <Box sx={{
        width: '600px',
        height: '100%',
      }}>
        <Box
          sx={{
            marginTop:'20px',
            height:'100px',
            fontSize: '100px',
            display:'flex',
            justifyContent:'center',
            letterSpacing:'24px',
            fontWeight:'1000',
            opacity:0.8
          }}
        >
          404
        </Box>
        <Box sx={{
          width:'100%',
          height:'450px',
          backgroundImage: 'url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)',
          backgroundSize: 'contain',
        }}
        >
        </Box>
        <Box sx={{
          width:'100%',
          display:'flex',
          justifyContent:'center',
          flexDirection: 'column',
        }}
        >
          <Typography variant="h6" align="center">The page you are looking for not avaible!</Typography>
          <Button sx={{ width:'200px', margin:'auto' }} onClick={handleClick}>GO TO HOME</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default NOTFOUND