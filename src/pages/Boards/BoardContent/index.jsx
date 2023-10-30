//import React from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'



function BoardContent() {
  return (
    <Box sx={{
      bgcolor: 'primary.main',
      width:'100%',
      height:(theme) => theme.trello.boardContentHeight,
      p: '10px 0px'
    }}>
      <ListColumns/>
    </Box>
  )
}

export default BoardContent