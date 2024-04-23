import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import CssBaseline from '@mui/material/CssBaseline'
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles'
import theme from '~/theme'

import 'react-toastify/dist/ReactToastify.css'
// Cấu hình MUI Dialog
import { ConfirmProvider } from 'material-ui-confirm'
import { store, persistor } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CssVarsProvider theme={theme}>
        <ConfirmProvider>
          <CssBaseline />
          <App />
        </ConfirmProvider>
      </CssVarsProvider>
    </PersistGate>
  </Provider>
  //</React.StrictMode>
)
