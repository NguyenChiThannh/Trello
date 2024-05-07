import { createSlice } from '@reduxjs/toolkit'


const initialState ={
  board: {
    boards: null,
    board: null,
    count: 1,
  },
}

const boardSlice = createSlice({
  name:'board',
  initialState,
  reducers: {
    getAllBoardsSuccess: (state, action) => {
      state.board.boards = action.payload.boards
      state.board.count = action.payload.count
    },
    getBoardDetailSuccess: (state, action) => {
      state.board.board = action.payload
    },
  }
})

export const { getAllBoardsSuccess, getBoardDetailSuccess } = boardSlice.actions

export default boardSlice.reducer