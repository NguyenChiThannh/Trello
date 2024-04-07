import { createSlice } from '@reduxjs/toolkit'


const initialState ={
  login: {
    currentUser: null,
    isFectching: false,
    erorr: false,
  }
}

const authSlice = createSlice({
  name:'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.login.isFectching = true
    },
    loginSucess: (state, action) => {
      state.login.isFectching = false
      state.login.currentUser = action.payload
      state.login.erorr = false
    },
    loginFailed: (state) => {
      state.login.isFectching = false
      state.login.erorr = true
    },
  }
})

export const { loginStart, loginSucess, loginFailed } = authSlice.actions

export default authSlice.reducer