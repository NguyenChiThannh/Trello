import Box from '@mui/material/Box'
import Column from './Column/Column'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import Button from '@mui/material/Button'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { useState } from 'react'
import { TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import { useColorScheme } from '@mui/material'

function ListColumns({ columns, createNewColumn, createNewCard, deleteColumnDetails }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)
  const [newColumnTitle, setNewColumnTitle] = useState('')
  const { mode } = useColorScheme()

  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error('Please Enter Column Title', { theme: mode })
      return
    }
    // Tạo dữ liệu Column để gọi API
    const newColumnData = {
      title: newColumnTitle,
    }

    // Sử dụng redux thì sẽ chuẩn chỉnh ở chỗ này hơn
    await createNewColumn(newColumnData)

    //Đóng trạng thái thêm column và clear input
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }

  // SortableContext yêu cầu items là một mảng dạng ['id-1','id-2'] chứ không phải [{id: 'id-1'}, {id: 'id-2'}]
  // Nếu không đúng thì kh có animation
  // https://github.com/clauderic/dnd-kit/issues/183#issuecomment-812569512
  return (
    <SortableContext items={columns?.map(c => c._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        bgcolor: 'inherit',
        width:'100%',
        height:(theme) => theme.trello.boardContentHeight,
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden'
      }}>
        {columns?.map((column) => {
          return (<Column
            key={column._id}
            column={column}
            createNewCard={createNewCard}
            deleteColumnDetails={deleteColumnDetails}
          />)
        })}
        {/* Box Add new column */}
        {!openNewColumnForm
          ? <Box onClick={toggleOpenNewColumnForm}
            sx={{
              minWidth: '250px',
              maxWidth: '250px',
              height: 'fit-content',
              borderRadius: '8px',
              mx: 2,
              bgcolor: (theme) => theme.palette.secondary.main
            }}
          >
            <Button
              startIcon={<NoteAddIcon />}
              sx={{
                width: '100%',
                justifyContent: 'flex-start',
                pl: 2.5,
                py: 1

              }}
            >
            Add new column
            </Button>
          </Box>
          : <Box sx={{
            minWidth: '250px',
            maxWidth: '250px',
            mx: 2,
            p: 1,
            borderRadius: '6px',
            height: 'fit-content',
            bgcolor: (theme) => theme.palette.secondary.main,
            display: 'flex',
            flexDirection: 'column',
            gap:1,
          }}>
            <TextField
              id="outlined-search"
              label="Enter column title..."
              type="search"
              size='small'
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
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
                onClick={addNewColumn}
                variant='contained'
                size='small'
                sx={{
                  color: (theme) => theme.palette.secondary.main,
                  'boxShadow':'none'
                }}
              >Add Column</Button>
              <CloseIcon
                sx={{ cursor: 'pointer' }}
                onClick={toggleOpenNewColumnForm}
              />
            </Box>
          </Box>
        }
      </Box>
    </SortableContext>
  )
}

export default ListColumns