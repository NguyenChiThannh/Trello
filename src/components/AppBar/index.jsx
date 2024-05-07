//import React from 'react'
import Box from '@mui/material/Box'
import ModeSelect from '~/components/ModeSelect/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import Workspaces from './Menus/Workspaces'
import Recent from './Menus/Recent'
import Starred from './Menus/Starred'
import Templates from './Menus/Templates'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Badge from '@mui/material/Badge'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import Profiles from './Menus/Profiles'
import InputAdornment from '@mui/material/InputAdornment'
import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { createNewBoardAPI, getAllBoardsAPI } from '~/apis/board'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'


function AppBar() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [searchValue, setSearchValue] = useState('')
  const [openDiaLogCreateBoard, setOpenDiaLogCreateBoardpen] = useState(false)
  const [typeBoard, setTypeBoard] = useState('public')
  const [newTitleBoard, setNewTitleBoard] = useState('')
  const [newDescriptionBoard, setNewDescriptionBoard] = useState('')

  const handleClose = () => {
    setOpenDiaLogCreateBoardpen(false)
  }
  const createNewBoard = () => {
    setOpenDiaLogCreateBoardpen(true)
  }

  const handleCreateNewboard = (e) => {
    e.preventDefault()
    handleClose()
    const newBoard = {
      title: newTitleBoard,
      description: newDescriptionBoard,
      type: typeBoard,
    }
    createNewBoardAPI(newBoard, navigate, dispatch)
  }
  const handleGoToHome = () => {
    navigate('/')
    getAllBoardsAPI(dispatch)
  }

  return (
    <Box sx={{
      width:'100%',
      height:(theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent:'space-between',
      gap: 3,
      px: 2,
      overflowX: 'auto',
      borderBottom:(theme) => `1.5px solid ${theme.palette.primary.main}`
    }}>
      <Box sx={{ display:'flex', alignItems:'center', gap :2 }}>
        <AppsIcon sx={{ color:(theme) => theme.palette.primary.main }}/>
        <Box sx={{ display:'flex', alignItems:'center', gap :0.5, cursor:'pointer' }} onClick={handleGoToHome}>
          <SvgIcon component={TrelloIcon} inheritViewBox sx={{ color: (theme) => theme.palette.primary.main }}/>
          <Typography variant="span" sx={{ fontSize:'1.2rem', fontWeight:'bold', color:(theme) => theme.palette.primary.main }}>Trelle</Typography>
        </Box>
        <Box sx={{ display:{ xs:'none', md: 'flex' }, gap: 1 }}>
          <Workspaces/>
          <Recent/>
          <Starred/>
          <Templates/>
          <Button variant="outlined" onClick={createNewBoard}>Create</Button>
        </Box>
      </Box>
      <Box sx={{ display:'flex', alignItems:'center', gap :2 }}>
        <TextField
          id="outlined-search"
          label="Search"
          type="search"
          size='small'
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <ModeSelect/>
        <Tooltip title="Notification">
          <Badge color="error" variant="dot" sx={{ cursor:'pointer' }} >
            <NotificationsNoneIcon sx={{ color: (theme) => theme.palette.primary.main }}/>
          </Badge>
        </Tooltip>
        <Tooltip title="Help">
          <HelpOutlineIcon sx={{ color: (theme) => theme.palette.primary.main }}/>
        </Tooltip>
        <Profiles/>
      </Box>

      {/* DialogCreateNewBoard */}

      <Dialog
        open={openDiaLogCreateBoard}
        onClose={handleClose}
        component="form"
        onSubmit={handleCreateNewboard}
      >
        <DialogTitle>Create a new board</DialogTitle>
        <DialogContent>
          <TextField
            required
            label="Title"
            type='text'
            variant="outlined"
            margin="normal"
            fullWidth
            value={newTitleBoard}
            onChange={(e) => setNewTitleBoard(e.target.value)}
          />
          <TextField
            required
            label="Description"
            type='text'
            variant="outlined"
            margin="normal"
            fullWidth
            value={newDescriptionBoard}
            onChange={(e) => setNewDescriptionBoard(e.target.value)}
          />
          <RadioGroup row
            value={typeBoard}
            onChange={(e) => setTypeBoard(e.target.value)}
          >
            <FormControlLabel value="public" control={<Radio />} label="Public" />
            <FormControlLabel value="private" control={<Radio />} label="Private" />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" >Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default AppBar