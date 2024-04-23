import { createSlice } from '@reduxjs/toolkit'


const initialState ={
  login: {
    currentUser: null,

  },
}

const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers: {
    logInSuccess: (state, action) => {
      state.login.currentUser = action.payload
    },
    registerSuccess: () => {
    },
    logOutSuccess: (state) => {
      state.login.currentUser = null
    },
  }
})

export const { registerSuccess, logInSuccess, logOutSuccess } = authSlice.actions

export default authSlice.reducer