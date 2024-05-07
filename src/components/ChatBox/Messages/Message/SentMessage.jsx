import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'

function SentMessage() {
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
      }}>Nội dung dài ơi là dài vẫn chưa đủ dài
        <Typography variant="span" sx={{ fontSize:'10px', display: 'block' }}>2 minute ago</Typography>
      </Box>
      <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg"
        sx={{ width: 26, height: 26, verticalAlign:'center' }}
      />
    </Box>
  )
}

export default SentMessage