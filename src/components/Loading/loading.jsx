import CircularProgress from '@mui/material/CircularProgress'
import Backdrop from '@mui/material/Backdrop'

function Loading({ open }) {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default Loading