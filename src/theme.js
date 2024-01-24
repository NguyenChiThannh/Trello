import { grey, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

const APP_BAR_HEIGHT = '58px'
const BOARD_BAR_HEIGHT = '60px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'

// Create a theme instance.
const theme = extendTheme({
  trello:{
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight : BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        // primary: {
        //   main: teal[500],
        // }, // nếu dùng main kiểu này thì phải thêm giá trị [] đằng sau
        secondary: {
          main: grey[300]
        }
      }
    },
    dark: {
      palette: {
        primary: {
          main: '#89CFF3' //8FD6E1
        },
        secondary: {
          main: '#31384a' //546e7a
        }
      }
    }
  },
  components: {
    // Name of the component
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar':{
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb':{
            borderRadius: '8px',
            backgroundColor: (theme) => theme.palette.primary.main
          },
          '*::-webkit-scrollbar-thumb:hover':{
            backgroundColor:'white'
          }
        }
      }
    },
    MuiButtonBase:{
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main
        })
      }
    },
    MuiChip:{
      styleOverrides: {
        icon: ({ theme }) => ({
          color: theme.palette.primary.main
        }),
        root: ({ theme }) => ({
          color: theme.palette.primary.main
        })
      }
    },
    MuiSvgIcon:{
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main
        })
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main
        })
      }
    },
    MuiTypography: {
      styleOverrides: {
        root:{
          '&.MuiTypography-body1': { fontSize: '0.875rem' }
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          color: theme.palette.primary.main,
          fontSize: '0.875rem',
          '.MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.light
          },
          '&:hover':{
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.light
            }
          },
          '& fieldset':{
            borderWidth: '1px !important'
          }
        })
      }
    }
  }
  // ...other properties
})
export default theme