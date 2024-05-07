//import React from 'react'
import Box from '@mui/material/Box'
import Avatar from '@mui/material/Avatar'
import Chip from '@mui/material/Chip'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import FilterListIcon from '@mui/icons-material/FilterList'
import AvatarGroup from '@mui/material/AvatarGroup'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { capitalizeFirstLetter } from '~/utils/formatters'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { inviteMemberAPI } from '~/apis/invitation'
import { useSelector } from 'react-redux'


function BoardBar() {

  const [openDiaLogInviteMember, setOpenDiaLogInviteMember] = useState(false)
  const [email, setEmail] = useState('')
  const board = (useSelector((state) => state.board.board.board))

  const inviteMember = () => {
    setOpenDiaLogInviteMember(true)
  }

  const handleClose = () => {
    setOpenDiaLogInviteMember(false)
  }


  const handleInviteMember = (e) => {
    e.preventDefault()
    const data = {
      boardId: board._id,
      email,
    }
    inviteMemberAPI(data)
    setEmail('')
    handleClose()
  }

  return (
    <Box sx={{
      gap: 3,
      overflowX: 'auto',
      width:'100%',
      height:(theme) => theme.trello.boardBarHeight,
      display: 'flex',
      px: 2,
      alignItems: 'center',
      justifyContent:'space-between',
    }}>
      <Box sx={{ display:'flex', alignItems:'center', gap :2 }}>
        <Tooltip title={board?.description}>
          <Chip
            sx={{}}
            avatar={<Avatar alt="Natacha" src='https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/324591512_1312799499497815_4509213548081146860_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHxw31PKwrgSslZZ2Qdzovzb6ypziWItc1vrKnOJYi1zSQ_Scv0M4oPXA5nhPRHcPRxoZK-RDh2F_1Za0aqgYQv&_nc_ohc=ZNvCY9yGsa8AX8WNCU6&_nc_ht=scontent.fsgn2-8.fna&oh=00_AfB5JBNDZxQdAPilzgABSs5oLHy7UoZ3z98TvAK57mih9Q&oe=65403728'
            />}
            label={board?.title}
            clickable
          />
        </Tooltip>
        <Chip
          sx={{}}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
        />
        <Chip
          sx={{}}
          icon={<AddToDriveIcon />}
          label="Add To Google Drive"
          clickable
        />
        <Chip
          sx={{}}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={{}}
          icon={<FilterListIcon />}
          label="Filter"
          clickable
        />
      </Box>
      <Box sx={{ display:'flex', alignItems:'center', gap :2 }}>
        <Button variant="outlined" startIcon={<PersonAddIcon />}
          onClick={inviteMember}
        >
          Invite
        </Button>
        <AvatarGroup
          max={5}
          sx={{
            '& .MuiAvatar-root':{
              height:30,
              width:30,
              fontSize:16
            }
          }}
        >
          {board.members.map((member) => <Tooltip key={member._id} title={member.displayName }>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Tooltip>)}
        </AvatarGroup>
      </Box>

      {/* Dialog Invite Member To The Board */}
      <Dialog
        open={openDiaLogInviteMember}
        onClose={handleClose}
        component="form"
        onSubmit={handleInviteMember}
      >
        <DialogTitle>Invite Member To The Board</DialogTitle>
        <DialogContent>
          <TextField
            required
            label="Email"
            type='email'
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" >Invite</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default BoardBar