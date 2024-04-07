import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/theme'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// Cấu hình MUI Dialog
import { ConfirmProvider } from 'material-ui-confirm'
import { store } from './redux/store'
import { Provider } from 'react-redux'


ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <Provider store={store}>
    <CssVarsProvider theme={theme}>
      <ConfirmProvider>
        <CssBaseline />
        <App />
        <ToastContainer position="bottom-right" autoClose={3000} closeOnClick />
      </ConfirmProvider>
    </CssVarsProvider>
  </Provider>
  //</React.StrictMode>
)
