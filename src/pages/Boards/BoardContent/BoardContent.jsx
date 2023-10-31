//import React from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  MouseSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'

function BoardContent({ board }) {
  const pointerSensor = useSensor(PointerSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10
    }
  })
  const mySensors = useSensors(pointerSensor)
  const [orderedColumnsState, setOrderedColumnsState] = useState([])

  useEffect(() => {
    setOrderedColumnsState(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])
  const handleDragEnd = (event) => {

    const { active, over } =event

    // Kiểm tra nếu over không tồn tại (Kéo linh tinh ra ngoài thì return luôn tránh lỗi)
    if (!over) return
    // Kiểm tra nếu vị trí sau khi kéo khác với vị trí ban đầu
    if (active.id !== over.id) {
      // lấy vị trí cũ (từ thằng active)
      const oldIndex = orderedColumnsState.findIndex(c => c._id === active.id)
      // lấy vị trí cũ (từ thằng active)
      const newIndex = orderedColumnsState.findIndex(c => c._id === over.id)
      // Dùng arrayMove của dnd-kit sắp xếp lại Columns ban đầu
      const dndOrderedColumns = arrayMove(orderedColumnsState, oldIndex, newIndex)
      // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
      // Cập nhật ví trí sau khi kéo
      setOrderedColumnsState(dndOrderedColumns)

    }
  }
  return (
    <DndContext onDragEnd={handleDragEnd} sensors={mySensors}>
      <Box sx={{
        backgroundImage: 'url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bcdbac5b-cdc4-410e-8020-c863a7210f66/dds3mtw-e054f664-62bd-4330-936b-31d55fa97224.jpg/v1/fill/w_1600,h_900,q_75,strp/why_s_it_not_going__by_neytirix_dds3mtw-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTAwIiwicGF0aCI6IlwvZlwvYmNkYmFjNWItY2RjNC00MTBlLTgwMjAtYzg2M2E3MjEwZjY2XC9kZHMzbXR3LWUwNTRmNjY0LTYyYmQtNDMzMC05MzZiLTMxZDU1ZmE5NzIyNC5qcGciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.bzEbHgY146m_aNzZLEpUg3vSy4Gqf6mKZYqlebCU96E")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width:'100%',
        height:(theme) => theme.trello.boardContentHeight,
        p: '10px 0px'
      }}>
        <ListColumns columns={orderedColumnsState}/>
      </Box>
    </DndContext>
  )
}

export default BoardContent