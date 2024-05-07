// Board details
//import React from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getBoardDetailAPI } from '~/apis/board'
import { useNavigate, useParams } from 'react-router-dom'

function Board() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const boardId = useParams()
  useEffect(() => {
    getBoardDetailAPI(boardId.id, dispatch, navigate)
  }, [])
  // Xử lý xóa column và cards bên trong nó
  // Progress
  // if (!board) {
  //   return (
  //     <Box sx={{ display: 'flex' }}>
  //       <CircularProgress />
  //     </Box>
  //   )
  // }

  // const board = mockData.board
  return (
    <Container disableGutters maxWidth={true} sx={{ height:'100vh' }}>
      <AppBar/>
      <BoardBar/>
      <BoardContent/>
    </Container>
  )
}

export default Board