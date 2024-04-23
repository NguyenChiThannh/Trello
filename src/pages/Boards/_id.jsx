// Board details
//import React from 'react'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

import { mockData } from '~/apis/mock-data'
import { useEffect, useState } from 'react'
import { fetchBoardDetailsAPI,
  createNewColumnAPI,
  createNewCardAPI,
  updatedAtBoardDetailsAPI,
  updatedAtColumnDetailsAPI,
  moveCardToDifferentColumnAPI,
  deleteColumnDetailsAPI,
} from '~/apis'
import { generatePlaceholderCard } from '~/utils/formatters'
import { isEmpty } from 'lodash'
import { mapOrder } from '~/utils/sorts'
import { toast } from 'react-toastify'
import CircularProgress from '@mui/material/CircularProgress'
import Box from '@mui/material/Box'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    //react-route-dom
    const boardId = '65a81664d2b32a44fa07fc9b'
    //Call API
    fetchBoardDetailsAPI(boardId)
      .then(board => {

        //Sắp xếp dữ liệu trước khi truyền xuống component con
        board.columns = mapOrder(board?.columns, board?.columnOrderIds, '_id')

        board.columns.forEach(column => {
          if (isEmpty(column.cards)) {
            column.cards = [generatePlaceholderCard(column)]
            column.cardOrderIds = [generatePlaceholderCard(column)._id]
          }
          else {
            column.cards = mapOrder(column?.cards, column?.cardOrderIds, '_id')
          }
        })
        setBoard(board)
      })
      // .then(board => {
      //   setBoard(board)
      // })
  }, [])

  // Tạo API tạo mới column và làm lại dữ liệu State Board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId : board._id
    })
    // Xử lý card trống khi mới tạo
    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    // Cập nhật state board
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  // Tạo API tạo mới column và làm lại dữ liệu State Board
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId : board._id
    })

    // Cập nhật state board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      // Nếu column rỗng: bản chất là đang chứa một cái Placeholder card
      if (columnToUpdate.cards.some(card => card.FE_PlaceholderCard)) {
        columnToUpdate.cards = [createdCard]
        columnToUpdate.cardOrderIds = [createdCard._id]
      }
      else {
        // Ngược lại Column đã có data thì push vào cuối mảng
        columnToUpdate.cards.push(createdCard)
        columnToUpdate.cardOrderIds.push(createdCard._id)
      }
    }
    setBoard(newBoard)
  }
  // Gọi API và xử lý khi kéo thả Column khi kéo thả xong
  const moveColumns = async (dndOrderedColumns) => {
    // Cập nhật State Board
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    //Gọi API update Board
    await updatedAtBoardDetailsAPI(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })
  }
  // Gọi API để cập nhật cardOrderIds của Column chứa nó
  const moveCardInTheSameColumn = async (dndOrderedCards, dndOrderedCardIds, columnId) => {
    // Cập nhật state board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }

    //Gọi API update Board
    await updatedAtColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }
  // Khi di chuyển sang column khác:
  // Bước 1: Cập nhật mảng cardOrderIds của column ban đầu chứa nó (xóa cái _id của Card ra khỏi mảng)
  // Bước 2: Cập nhật mảng cardOrderIds của column tiếp theo ( thêm _id của Card vào mảng)
  // Bước 3: Cập nhật lại trường columnId mới của cái Card đã kéo
  const moveCardToDifferentColumn = async (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    // console.log('currentCardId:', currentCardId)
    // console.log('prevColumnId:', prevColumnId)
    // console.log('nextColumnId:', nextColumnId)
    // console.log('dndOrderedColumns:', dndOrderedColumns)

    // Update cho chuẩn dữ liệu state Board
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
    // Xử lý vấn đề khi Card cuối cùng ra khỏi Column, Column rỗng sẽ có placeholder card, cần xóa nó đi trước đi gửi lên BE
    if ( prevCardOrderIds[0].includes('placeholder-card')) {
      prevCardOrderIds = []
    }

    //Gọi API xử lý phía BE
    await moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds: prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds,
    })
  }
  const deleteColumnDetails = async (columnId) => {
    // Update xử lý boardState

    const newBoard = { ...board }
    newBoard.columns = newBoard.columns.filter(c => c._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== columnId)
    setBoard(newBoard)
    // Gọi API phía BE
    deleteColumnDetailsAPI(columnId).then(() => {
      toast.success('Delete Column Success')
    })
  }
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
      <BoardBar board ={board}/>
      <BoardContent
        board ={board}

        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
        moveColumns={moveColumns}
        moveCardInTheSameColumn={moveCardInTheSameColumn}
        moveCardToDifferentColumn={moveCardToDifferentColumn}
        deleteColumnDetails={deleteColumnDetails}
      />
    </Container>
  )
}

export default Board