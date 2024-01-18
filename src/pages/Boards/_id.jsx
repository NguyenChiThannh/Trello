// Board details
//import React from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI } from '~/apis'

function Board() {
  // const [board, setBoard] = useState(null)

  // useEffect(() => {
  //   //react-route-dom
  //   const boardId = '65a81664d2b32a44fa07fc9b'
  //   //Call API
  //   fetchBoardDetailsAPI(boardId)
  //     .then(board => {
  //       setBoard(board)
  //     })
  // }, [])
  const board = mockData.board
  return (
    <Container disableGutters maxWidth={true} sx={{ height:'100vh' }}>
      <AppBar/>
      <BoardBar board ={board}/>
      <BoardContent board ={board}/>
    </Container>
  )
}

export default Board