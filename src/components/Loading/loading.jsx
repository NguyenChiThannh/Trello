import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

function Loading() {
  return (
    <Box sx={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent:'center',
    }}>
      <CircularProgress/>
    </Box>
  )
}

export default Loading