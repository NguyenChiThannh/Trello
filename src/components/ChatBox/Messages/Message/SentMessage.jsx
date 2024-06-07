import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { timeAgo } from '~/utils/formatters'

function SentMessage(props) {
  return (
    <Box sx={{
      display: 'flex',
      gap: '8px',
      mt: '4px',
      // alignItems: 'flex-end',
    }}>
      <Box sx={{
        backgroundColor: (theme) => theme.palette.primary.light,
        paddingX: '12px',
        paddingY: '6px',
        borderRadius:'16px',
        maxWidth: '60%',
        marginLeft: 'auto',
      }}>{props.message}
        <Typography variant="span" sx={{ fontSize:'10px', display: 'block' }}>{timeAgo(props.time)}</Typography>
      </Box>
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg"
        sx={{ width: 26, height: 26, verticalAlign:'center' }}
      />
    </Box>
  )
}

export default SentMessage