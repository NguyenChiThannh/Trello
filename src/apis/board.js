import { toast } from 'react-toastify'
import { axiosInstance } from './config'
import { getAllBoardsSuccess, getBoardDetailSuccess } from '~/redux/boardSlice'
import { mapOrder } from '~/utils/sorts'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'


export const getAllBoardsAPI = async (dispatch, page = 1) => {
  const res = await axiosInstance.get(`/v1/boards/?page=${page}`)
  if (res) {
    dispatch(getAllBoardsSuccess(res.data))
  }
}

export const createNewBoardAPI = async (newBoard, navigate, dispatch) => {
  const res = await axiosInstance.post('/v1/boards/', newBoard)
  if (res) {
    toast.success('Create new board successful')
    navigate('/')
    getAllBoardsAPI(dispatch)
  }
}

export const getBoardDetailAPI = async (boardId, dispatch, navigate) => {
  const res = await axiosInstance.get(`/v1/boards/${boardId}`)
  const board = res.data
  if (board) {
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
    navigate(`/board/${boardId}`)
    dispatch(getBoardDetailSuccess(board))
  }
}

export const updatedAtBoardDetailsAPI = async (boardId, updateData) => {
  await axiosInstance.put(`/v1/boards/${boardId}`, updateData)
}


export const moveCardToDifferentColumnAPI = async (updateData) => {
  await axiosInstance.put('/v1/boards/supports/moving_card', updateData)
}