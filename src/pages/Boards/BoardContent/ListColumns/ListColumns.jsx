import Box from '@mui/material/Box'
import Column from './Column/Column'
import NoteAddIcon from '@mui/icons-material/NoteAdd'
import Button from '@mui/material/Button'
import { grey } from '@mui/material/colors'
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'

function ListColumns({ columns }) {
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
          return (<Column key={column._id} column={column}/>)
        })}
        {/* Box Add new column */}
        <Box
          sx={{
            minWidth: '200px',
            maxWidth: '200px',
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
      </Box>
    </SortableContext>
  )
}

export default ListColumns