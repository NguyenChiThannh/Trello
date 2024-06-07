// Board details
//import React from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { getBoardDetailAPI } from '~/apis/board'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '~/components/Loading/Loading'

function Board() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const boardId = useParams()
  useEffect(() => {
    getBoardDetailAPI(boardId.id, dispatch, navigate, setIsLoading)
  }, [])

  // const board = mockData.board
  return (
    <Container disableGutters maxWidth={true} sx={{ height:'100vh' }}>
      <AppBar/>
      <BoardBar/>
      <BoardContent/>
      <Loading open={isLoading} />
    </Container>
  )
}

export default Board