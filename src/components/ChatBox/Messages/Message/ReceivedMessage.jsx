import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { timeAgo } from '~/utils/formatters'

function ReceivedMessage(props) {
  return (
    <Box sx={{
      display: 'flex',
      gap: '8px',
      mt: '4px',
      // alignItems: 'flex-end',
    }}>
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg"
        sx={{ width: 26, height: 26, verticalAlign:'center' }}
      />
      <Box sx={{
        backgroundColor: (theme) => theme.palette.secondary.main,
        paddingX: '12px',
        paddingY: '6px',
        borderRadius:'16px',
        maxWidth: '60%',
      }}>{props.message}
        <Typography variant="span" sx={{ fontSize:'10px', display: 'block' }}>{timeAgo(props.time)}</Typography></Box>

    </Box>
  )
}

export default ReceivedMessage