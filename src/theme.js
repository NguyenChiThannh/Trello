import { red, cyan, deepOrange, orange, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'


// Create a theme instance.
const theme = extendTheme({
  trello:{
    appBarHeight: '58px',
    boardBarHeight : '60px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: deepOrange
      }
    }
  },
  dark: {
    palette: {
      primary: red,
      secondary: orange
    }
  },
  components: {
    // Name of the component
    // MuiCssBaseline: {
    //   styleOverrides: {
    //     body: {
    //       '*::-webkit-scrollbars':{
    //         width: '8px',
    //         height: '8px'
    //       },
    //       '*::-webkit-scrollbar-thumb':{
    //         //borderRadius: '8px',
    //         backgroundColor: (theme) => theme.palette.palette.main
    //       },
    //       '*::-webkit-scrollbar-thumb:hover':{
    //         backgroundColor:'#00b894'
    //       }
    //     }
    //   }
    // },
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