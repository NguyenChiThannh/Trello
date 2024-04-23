import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import AddCardIcon from '@mui/icons-material/AddCard'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import ListCards from './ListCards/ListCards'
import { mapOrder } from '~/utils/sorts'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useState } from 'react'
import { TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import { useConfirm } from 'material-ui-confirm'

function Column({ column, createNewCard, deleteColumnDetails }) {
  // drag
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: column._id,
    data: { ...column }
  })

  const dndKitColumnStyle = {
    //touchAction: 'none',
    // Nếu dùng CSS.Transform như docs sẽ bị lỗi
    // https://github.com/clauderic/dnd-kit/issues/117
    transform: CSS.Translate.toString(transform), // Transform nó bị méo khi kéo cột, nên dùng Translate
    transition,
    height:'100%',
    opacity: isDragging ? 0.5 : undefined
  }
  // Drop down menu
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  // Sort Card
  const orderedCards = mapOrder(column?.cards, column?.cardOrderIds, '_id')

  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenNewCardForm = () => setOpenNewCardForm(!openNewCardForm)
  const [newCardTitle, setNewCardTitle] = useState('')

  const addNewCard = async () => {
    if (!newCardTitle) {
      toast.error('Please Enter Column Title')
      return
    }
    //Gọi API
    const newCardData = {
      title: newCardTitle,
      columnId: column._id
    }

    //console.log(newCardTitle)
    // Sử dụng redux thì sẽ chuẩn chỉnh ở chỗ này hơn
    await createNewCard(newCardData)

    //Đóng trạng thái thêm column và clear input
    toggleOpenNewCardForm()
    setNewCardTitle('')
  }

  // Xử lý xóa 1 column và Cards bên trong nó
  const confirmDeleteColumn = useConfirm()
  const handleDeleteColumn = () => {
    confirmDeleteColumn({
      title: 'Delete column',
      description: 'You want to delete this column ?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel',
      cancellationButtonProps: { color: 'inherit' }
    })
      .then(() => {
        deleteColumnDetails(column._id)
      })
      .catch(() => {})
  }
  return (
    <div
      ref={setNodeRef}
      style={dndKitColumnStyle}
      {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) => theme.palette.secondary.main,
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`

        }}>
        {/* Box Header */}
        <Box sx={{
          height:(theme) => theme.trello.columnHeaderHeight,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography sx={{
            fontWeight: 'bold',
            cursor: 'pointer'
          }}>
            {column?.title}
          </Typography>
          <Box>
            <Tooltip title='More Option'>
              <ExpandMoreIcon
                id="basic-column-dropdown"
                aria-controls={open ? 'basic-menu-column-dropdown' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              />
            </Tooltip>
            <Menu
              id="basic-menu-column-dropdown"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-column-dropdown'
              }}
            >
              <MenuItem
                onClick={toggleOpenNewCardForm}
              >
                <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={handleDeleteColumn}
              >
                <ListItemIcon><DeleteIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Delete this column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><Cloud fontSize="small" /></ListItemIcon>
                <ListItemText>Archive this column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        {/* Box ListCards */}
        <ListCards cards={orderedCards}/>

        {/* Box Footer */}
        {!openNewCardForm
          ?
          <Box sx={{
            height: (theme) => theme.trello.columnFooterHeight,
            p:2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Button startIcon={<AddCardIcon/>} onClick={toggleOpenNewCardForm}>Add new card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: 'pointer ' }}/>
            </Tooltip>
          </Box>
          :
          <Box
            sx={{
              minWidth: 'px',
              maxWidth: '300px',
              p: 1,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: (theme) => theme.palette.secondary.main,
              display: 'flex',
              flexDirection: 'column',
              gap:1,
            }}
          >
            <TextField
              id="outlined-search"
              label="Enter card title..."
              type="search"
              size='small'
              autoFocus
              data-no-dnd='true'
              value={newCardTitle}
              onChange={(e) => setNewCardTitle(e.target.value)}
              sx={{
                '& .MuiFormLabel-root': {
                  'fontSize': '14px'
                }
              }}
            />
            <Box
              sx={{
                'display': 'flex',
                'alignItems': 'center',
                gap: 1
              }}>
              <Button
                onClick={addNewCard}
                variant='contained'
                size='small'
                data-no-dnd='true'
                sx={{
                  color: (theme) => theme.palette.secondary.main,
                  'boxShadow':'none'
                }}
              >Add Card</Button>
              <CloseIcon
                sx={{ cursor: 'pointer' }}
                onClick={toggleOpenNewCardForm}
              />
            </Box>
          </Box>
        }
      </Box>
    </div>
  )
}

export default Column