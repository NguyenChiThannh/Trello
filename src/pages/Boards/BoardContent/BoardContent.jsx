//import React from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  MouseSensor,
  //PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep } from 'lodash'

const ACTIVE_DRAG_ITEM_TYPE ={
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent({ board }) {
  // const pointerSensor = useSensor(PointerSensor, {
  //   // Require the mouse to move by 10 pixels before activating
  //   activationConstraint: {
  //     distance: 10
  //   }
  // })
  const mouseSensor = useSensor(MouseSensor, {
    // Require the mouse to move by 10 pixels before activating
    activationConstraint: {
      distance: 10
    }
  })
  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5
    }
  })
  const mySensors = useSensors(touchSensor, mouseSensor)
  const [orderedColumnsState, setOrderedColumnsState] = useState([])

  const [activeDragItemId, setactiveDragItemId] = useState(null)
  const [activeDragItemType, setactiveDragItemType] = useState(null)
  const [activeDragItemData, setactiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)


  useEffect(() => {
    setOrderedColumnsState(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId) => {
    // Hàm dùng map trả về 1 mảng card_id => tìm kiếm phần tử có trùng với cardId => tìm column chứa cái cardId đó
    return orderedColumnsState.find(column =>
      column?.cards?.map(card => card._id)?.includes(cardId))
  }

  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    active,
    over,
    activeColumn,
    activeDragingCardId,
    activeDraggingCardData
  ) => {
    setOrderedColumnsState(prevColumns => {
      const overCardIndex = overColumn?.cards?.findIndex(card => card._id === overCardId)

      // Logic tính toán "cardIndex mới" (trên hoặc dưới của overCard) - Lấy từ docs
      // https://github.com/clauderic/dnd-kit/blob/master/stories/2%20-%20Presets/Sortable/MultipleContainers.tsx
      let newCardIndex
      const isBelowOverItem = active.rect.current.translated &&
        active.rect.current.translated.top > over.rect.top + over.rect.height
      const modifier = isBelowOverItem ? 1 : 0
      newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards?.length + 1

      // Clone mản OrderedColumnsState cũ ra một cái mới để xử lý data rồi return - cập nhật lại OrderedColumnsState mới
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      //nextActiveColumn: Column cũ
      if (nextActiveColumn) {
        // Xóa card ở cái column active (xóa card ở column cũ, để nó sang column khác)
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDragingCardId)

        // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }
      //nextOverColumn: Column mới
      if (nextOverColumn) {
        // Kiểm tra xem card đang kéo có tồn tại ở overColumn chưa, nếu có cần xóa nó trước
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDragingCardId)
        // Đối với trường dragEnd thì phải cập nhật lại chuẩn dữ liệu columnId trong card sau khi kéo card giữa 2 column khác nhau(Kéo xong mà cái id vẫn ở column cũ)
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }
        //Tiếp theo là thêm cái card vào overColum theo vị trí mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)
        // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }

      return nextColumns
    })
  }
  const handleDragStart = (event) => {
    setactiveDragItemId(event?.active?.id)
    setactiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setactiveDragItemData(event?.active?.data?.current)

    // Nếu kéo card thì mới thực hiện hành động kéo oldColumn
    if (event?.active?.data?.current?.columnId) {
      setOldColumnWhenDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  const handleDragOver = (event) => {
    // Kéo column => Không làm gì cả
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return
    // Kéo card thì xử lý thêm phần qua lại giữa các card giữa các column
    const { active, over } =event

    // Kiểm tra nếu over không tồn tại (Kéo linh tinh ra ngoài thì return luôn tránh lỗi)
    if (!over || !active) return
    // activeDraggingCardData: Là cái card được kéo
    const { id: activeDragingCardId, data: { current: activeDraggingCardData } } = active
    // overCard: là cái card đanng tương tác trên hoặc dưới so với cái card được kéo ở trên
    const { id: overCardId } = over
    // Tìm 2 cái column theo cardId
    const activeColumn = findColumnByCardId(activeDragingCardId)
    const overColumn = findColumnByCardId(overCardId)


    if (!overColumn || !activeColumn) return
    // Xử lý khi kéo card qua column khác, còn khi card ở cùng 1 column thì đã xử lý ở handleDragEnd
    if (activeColumn._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(overColumn,
        overCardId,
        active,
        over,
        activeColumn,
        activeDragingCardId,
        activeDraggingCardData)
    }

  }
  const handleDragEnd = (event) => {

    const { active, over } =event

    // Kiểm tra nếu over không tồn tại (Kéo linh tinh ra ngoài thì return luôn tránh lỗi)
    if (!over) return

    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      // activeDraggingCardData: Là cái card được kéo
      const { id: activeDragingCardId, data: { current: activeDraggingCardData } } = active
      // overCard: là cái card đanng tương tác trên hoặc dưới so với cái card được kéo ở trên
      const { id: overCardId } = over
      // Tìm 2 cái column theo cardId
      const activeColumn = findColumnByCardId(activeDragingCardId)
      const overColumn = findColumnByCardId(overCardId)


      if (!overColumn || !activeColumn) return
      // Hàm động kéo thả card giữa 2 column khác nhau
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(overColumn,
          overCardId,
          active,
          over,
          activeColumn,
          activeDragingCardId,
          activeDraggingCardData)
      }
      else {
        // lấy vị trí cũ (từ thằng active)
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDragItemId)
        // lấy vị trí mới (từ thằng active)
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId )
        // Dùng arrayMove vì logic tương tự như kéo column, vì card kéo cùng 1 column
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)

        setOrderedColumnsState(prevColumns => {
          // Clone mản OrderedColumnsState cũ ra một cái mới để xử lý data rồi return - cập nhật lại OrderedColumnsState mới
          const nextColumns = cloneDeep(prevColumns)
          //Tìm tới column đang thả.
          const targetColumn = nextColumns.find(column => column._id ===overColumn._id)

          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCards.map(card => card._id)
          return nextColumns

        })

      }

    }
    // Xử lý kéo thả Columns
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // Kiểm tra nếu vị trí sau khi kéo khác với vị trí ban đầu
      if (active.id !== over.id) {
      // lấy vị trí cũ (từ thằng active)
        const oldColumnIndex = orderedColumnsState.findIndex(c => c._id === active.id)
        // lấy vị trí mới (từ thằng active)
        const newColumnIndex = orderedColumnsState.findIndex(c => c._id === over.id)
        // Dùng arrayMove của dnd-kit sắp xếp lại Columns ban đầu
        const dndOrderedColumns = arrayMove(orderedColumnsState, oldColumnIndex, newColumnIndex)
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
        // Cập nhật ví trí sau khi kéo
        setOrderedColumnsState(dndOrderedColumns)
      }
    }

    setactiveDragItemId(null)
    setactiveDragItemType(null)
    setactiveDragItemData(null)
    setOldColumnWhenDraggingCard(null)
  }

  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
          border:'none'
        }
      }
    })
  }
  return (
    <DndContext
      sensors={mySensors}
      //https://docs.dndkit.com/api-documentation/context-provider/collision-detection-algorithms
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}>
      <Box sx={{
        backgroundImage: 'url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bcdbac5b-cdc4-410e-8020-c863a7210f66/dds3mtw-e054f664-62bd-4330-936b-31d55fa97224.jpg/v1/fill/w_1600,h_900,q_75,strp/why_s_it_not_going__by_neytirix_dds3mtw-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTAwIiwicGF0aCI6IlwvZlwvYmNkYmFjNWItY2RjNC00MTBlLTgwMjAtYzg2M2E3MjEwZjY2XC9kZHMzbXR3LWUwNTRmNjY0LTYyYmQtNDMzMC05MzZiLTMxZDU1ZmE5NzIyNC5qcGciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.bzEbHgY146m_aNzZLEpUg3vSy4Gqf6mKZYqlebCU96E")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width:'100%',
        height:(theme) => theme.trello.boardContentHeight,
        p: '10px 0px'
      }}>
        <ListColumns columns={orderedColumnsState}/>
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/> }
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData}/> }
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent