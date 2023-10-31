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


const MENU_STYLES ={
  color: 'primary.main',
  bgcolor: 'white',
  padding: '4px',
  '& .MuiSvgIcon-root':{
    color: 'primary.main'
  },
  '&:hover':{
    bgcolor: 'primary.50'
  }
}
function BoardBar({board}) {
  // const {board} = props
  // const board = props.board
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
      borderTop:(theme) => `1.5px solid ${theme.palette.primary.main}`
    }}>
      <Box sx={{ display:'flex', alignItems:'center', gap :2 }}>
        <Chip
          sx={MENU_STYLES}
          avatar={<Avatar alt="Natacha" src='https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-6/324591512_1312799499497815_4509213548081146860_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHxw31PKwrgSslZZ2Qdzovzb6ypziWItc1vrKnOJYi1zSQ_Scv0M4oPXA5nhPRHcPRxoZK-RDh2F_1Za0aqgYQv&_nc_ohc=ZNvCY9yGsa8AX8WNCU6&_nc_ht=scontent.fsgn2-8.fna&oh=00_AfB5JBNDZxQdAPilzgABSs5oLHy7UoZ3z98TvAK57mih9Q&oe=65403728'
          />}
          label={board?.title}
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<VpnLockIcon />}
          label={capitalizeFirstLetter(board?.type)}
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<AddToDriveIcon />}
          label="Add To Google Drive"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<BoltIcon />}
          label="Automation"
          clickable
        />
        <Chip
          sx={MENU_STYLES}
          icon={<FilterListIcon />}
          label="Filter"
          clickable
        />
      </Box>
      <Box sx={{ display:'flex', alignItems:'center', gap :2 }}>
        <Button variant="outlined" startIcon={<PersonAddIcon />}>
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
          <Tooltip title="ChiThanh">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title="ChiThanh">
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </Tooltip>
          <Tooltip title="ChiThanh">
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </Tooltip>
          <Tooltip title="ChiThanh">
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
          </Tooltip>
          <Tooltip title="ChiThanh">
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          </Tooltip>
          <Tooltip title="ChiThanh">
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Tooltip>
          <Tooltip title="ChiThanh">
            <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
          </Tooltip>
          <Tooltip title="ChiThanh">
            <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
          </Tooltip>
          <Tooltip title="ChiThanh">
            <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
          </Tooltip>
          <Tooltip title="ChiThanh">
            <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>

  )
}

export default BoardBar