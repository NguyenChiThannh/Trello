import Box from '@mui/material/Box'
import Column from './Column/Column'


function ListColumns() {

  return (
    <Box sx={{
      bgcolor: 'inherit',
      width:'100%',
      height:(theme) => theme.trello.boardContentHeight,
      display: 'flex',
      overflowX: 'auto',
      overflowY: 'hidden'
    }}>
      <Column/>
    </Box>
  )
}

export default ListColumns