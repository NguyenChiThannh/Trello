//import Board from './pages/Boards/_id'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Auth/Login/Login'
import Register from './pages/Auth/Register/Register'
import Board from './pages/Boards/_id'
import BoardList from './pages/Boards'
import Loading from './components/Loading/loading'
import { ToastContainer } from 'react-toastify'
import { useColorScheme } from '@mui/material'
import { useSelector } from 'react-redux'
import OTP_Input from './components/OTPInput/otpInput'
import NOTFOUND from './pages/NOTFOUND/NOTFOUND'
import Identify from './pages/Auth/Login/Identify/Identify'
import IdentifyStep2 from './pages/Auth/Login/Identify/IdentifyStep2'
import VerifyAccount from './pages/Auth/Register/VerifyAccount'
import LoginSuccess from './pages/Auth/Login/LoginSuccess'

function App() {
  const { mode } = useColorScheme()
  const user = useSelector((state) => state.auth.login.currentUser)

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <BoardList /> : <Login />} />
        <Route path="/login/identify" element={<Identify />} />
        <Route path="/login/identify/:email" element={<IdentifyStep2 />} />
        <Route path="/board/:id" element={<Board />} />
        <Route path="/register" element={<Register />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/otp" element={<OTP_Input />} />
        <Route path="/verify-account/:token1/:token2/:token3" element={<VerifyAccount />} />
        <Route path="/login-success" element={<LoginSuccess />} />
        <Route path="*" element={<NOTFOUND />} />
      </Routes>
      <ToastContainer position="bottom-right" autoClose={3000} closeOnClick theme={mode}/>
    </Router>
  )
}

export default App
