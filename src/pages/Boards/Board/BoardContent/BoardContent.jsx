//import React from 'react'
import Box from '@mui/material/Box'
import ListColumns from './ListColumns/ListColumns'
import { mapOrder } from '~/utils/sorts'
import {
  DndContext,
  //PointerSensor,
  //MouseSensor,
  //TouchSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
  closestCorners
} from '@dnd-kit/core'
import { MouseSensor, TouchSensor } from '~/customLibraries/DndKitSensors'
import { useEffect, useState } from 'react'
import { arrayMove } from '@dnd-kit/sortable'
import Column from './ListColumns/Column/Column'
import Card from './ListColumns/Column/ListCards/Card/Card'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatters'
import Fab from '@mui/material/Fab'
import MessageIcon from '@mui/icons-material/Message'
import Drawer from '@mui/material/Drawer'
import Badge from '@mui/material/Badge'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import ChatBox from '~/components/ChatBox/ChatBox'
import { useSelector } from 'react-redux'
import { moveCardToDifferentColumnAPI, updatedAtBoardDetailsAPI } from '~/apis/board'
import { updatedAtColumnDetailsAPI } from '~/apis/column'

const ACTIVE_DRAG_ITEM_TYPE ={
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD'
}

function BoardContent() {
  // https://docs.dndkit.com/api-documentation/sensors
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
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnWhenDraggingCard, setOldColumnWhenDraggingCard] = useState(null)
  const [openDraw, setOpenDraw] = useState(false)
  const [openChat, setOpenChat] = useState(false)
  const [receiverId, setReceiverId] = useState('')

  const board = (useSelector((state) => state.board.board.board))

  const toggleDrawer = (newOpen) => () => {
    setOpenDraw(newOpen)
  }
  const handleCloseDraw = () => {
    setOpenDraw(false)
  }

  const handleChat = (id) => {
    setReceiverId(id)
    setOpenChat(true)
    handleCloseDraw()
  }

  useEffect(() => {
    setOrderedColumnsState(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const findColumnByCardId = (cardId) => {
    // Hàm dùng map trả về 1 mảng card_id => tìm kiếm phần tử có trùng với cardId => tìm column chứa cái cardId đó
    return orderedColumnsState.find(column =>
      column?.cards?.map(card => card._id)?.includes(cardId))
  }

  // Gọi API để cập nhật cardOrderIds của Column chứa nó
  const moveCardInTheSameColumn = async (dndOrderedCards, dndOrderedCardIds, columnId) => {
    // Cập nhật state board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }

    //Gọi API update Board
    await updatedAtColumnDetailsAPI(columnId, { cardOrderIds: dndOrderedCardIds })
  }

  // Gọi API và xử lý khi kéo thả Column khi kéo thả xong
  const moveColumns = async (dndOrderedColumns) => {
    // Cập nhật State Board
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds

    //Gọi API update Board
    await updatedAtBoardDetailsAPI(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })
  }

  // Khi di chuyển sang column khác:
  // Bước 1: Cập nhật mảng cardOrderIds của column ban đầu chứa nó (xóa cái _id của Card ra khỏi mảng)
  // Bước 2: Cập nhật mảng cardOrderIds của column tiếp theo ( thêm _id của Card vào mảng)
  // Bước 3: Cập nhật lại trường columnId mới của cái Card đã kéo
  const moveCardToDifferentColumn = async (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    // console.log('currentCardId:', currentCardId)
    // console.log('prevColumnId:', prevColumnId)
    // console.log('nextColumnId:', nextColumnId)
    // console.log('dndOrderedColumns:', dndOrderedColumns)

    // Update cho chuẩn dữ liệu state Board
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds

    let prevCardOrderIds = dndOrderedColumns.find(c => c._id === prevColumnId)?.cardOrderIds
    // Xử lý vấn đề khi Card cuối cùng ra khỏi Column, Column rỗng sẽ có placeholder card, cần xóa nó đi trước đi gửi lên BE
    if ( prevCardOrderIds[0].includes('placeholder-card')) {
      prevCardOrderIds = []
    }

    //Gọi API xử lý phía BE
    await moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds: prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds: dndOrderedColumns.find(c => c._id === nextColumnId)?.cardOrderIds,
    })
  }
  const moveCardBetweenDifferentColumns = (
    overColumn,
    overCardId,
    over,
    active,
    activeColumn,
    activeDraggingCardId,
    activeDraggingCardData,
    triggerFrom,
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

      // Clone mảng OrderedColumnsState cũ ra một cái mới để xử lý data rồi return - cập nhật lại OrderedColumnsState mới
      const nextColumns = cloneDeep(prevColumns)
      const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
      const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

      //nextActiveColumn: Column cũ
      if (nextActiveColumn) {
        // Xóa card ở cái column active (xóa card ở column cũ, để nó sang column khác)
        nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

        // Thêm Placeholder Card nếu Column rỗng: Bị kéo hết card đi, không còn cái nào nữa
        if (isEmpty(nextActiveColumn.cards)) {
          nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
        }

        // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
        nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
      }

      //nextOverColumn: Column mới
      if (nextOverColumn) {
        // Kiểm tra xem card đang kéo có tồn tại ở overColumn chưa, nếu có cần xóa nó trước
        nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)
        // Đối với trường dragEnd thì phải cập nhật lại chuẩn dữ liệu columnId trong card sau khi kéo card giữa 2 column khác nhau(Kéo xong mà cái id vẫn ở column cũ)
        const rebuild_activeDraggingCardData = {
          ...activeDraggingCardData,
          columnId: nextOverColumn._id
        }

        //Tiếp theo là thêm cái card vào overColum theo vị trí mới
        nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)

        // Xóa cái Placeholder Card đi nếu nó đang tồn tại
        nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_PlaceholderCard)

        // Cập nhật lại mảng cardOrderIds cho chuẩn dữ liệu
        nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
      }
      if (triggerFrom === 'handleDragEnd') {
        // Nếu là handleDragEnd thì gọi APIs
        moveCardToDifferentColumn(
          activeDraggingCardId,
          oldColumnWhenDraggingCard._id,
          nextOverColumn._id,
          nextColumns,
        )
      }

      return nextColumns
    })
  }
  const handleDragStart = (event) => {
    // Set dữ liệu mình đang kéo
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)

    // Nếu kéo card thì mới thực hiện hành động setOldColumnWhenDraggingCard
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
    const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
    // overCard: là cái card đanng tương tác trên hoặc dưới so với cái card được kéo ở trên
    const { id: overCardId } = over
    // Tìm 2 cái column theo cardId
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    // Nếu không có 1 trong 2 column thì return tránh sập web
    if (!overColumn || !activeColumn) return

    // Hành động kéo thả card giữa 2 column khác nhau
    // Xử lý khi kéo card qua column khác, còn khi card ở cùng 1 column thì đã xử lý ở handleDragEnd
    if (activeDraggingCardData._id !== overColumn._id) {
      moveCardBetweenDifferentColumns(
        overColumn,
        overCardId,
        over,
        active,
        activeColumn,
        activeDraggingCardId,
        activeDraggingCardData,
        'handleDragOver'
      )
    }
  }

  const handleDragEnd = (event) => {

    const { active, over } =event

    // Kiểm tra nếu over không tồn tại (Kéo linh tinh ra ngoài mà không bỏ lại chỗ nào thì return luôn tránh lỗi)
    if (!over) return

    // Xử lý kéo thả Card
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) {
      const { id: activeDraggingCardId, data: { current: activeDraggingCardData } } = active
      const { id: overCardId } = over
      // Tìm 2 cái column theo cardId
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)


      if (!overColumn || !activeColumn) return
      // Hàm động kéo thả card giữa 2 column khác nhau
      if (oldColumnWhenDraggingCard._id !== overColumn._id) {
        moveCardBetweenDifferentColumns(
          overColumn,
          overCardId,
          over,
          active,
          activeColumn,
          activeDraggingCardId,
          activeDraggingCardData,
          'handleDragEnd'
        )
      }
      else { // Kéo thả trong cùng 1 column
        // Lấy vị trí Card cũ
        const oldCardIndex = oldColumnWhenDraggingCard?.cards?.findIndex(c => c._id === activeDraggingCardId)
        // Lấy vị trí Card mới
        const newCardIndex = overColumn?.cards?.findIndex(c => c._id === overCardId )
        // Dùng arrayMove vì logic tương tự như kéo column, vì card kéo cùng 1 column
        const dndOrderedCards = arrayMove(oldColumnWhenDraggingCard?.cards, oldCardIndex, newCardIndex)
        const dndOrderedCardIds = dndOrderedCards.map(card => card._id)

        // Vẫn gọi update State để tránh bị Flickering giao diện lúc kéo thả cần chờ API
        setOrderedColumnsState(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)
          //Tìm tới Column cần kéo thả
          const targetColumn = nextColumns.find(column => column._id ===overColumn._id)

          // Cập nhật lại 2 vị trí mới là card và cardOrderIds trong cái targetColumn
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCardIds

          // Trả về State mới
          return nextColumns
        })
        moveCardInTheSameColumn(dndOrderedCards, dndOrderedCardIds, oldColumnWhenDraggingCard._id)
      }

    }
    // Xử lý kéo thả Columns
    if (activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) {
      // Kiểm tra nếu vị trí sau khi kéo khác với vị trí ban đầu
      if (active.id !== over.id) {
        // Lấy vị trí Column Cũ
        const oldColumnIndex = orderedColumnsState.findIndex(c => c._id === active.id)
        // Lấy vị trí Column Mới
        const newColumnIndex = orderedColumnsState.findIndex(c => c._id === over.id)
        // Dùng arrayMove của dnd-kit sắp xếp lại Columns ban đầu
        const dndOrderedColumns = arrayMove(orderedColumnsState, oldColumnIndex, newColumnIndex)
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

        // Cập nhật ví trí sau khi kéo (state ở đây có thêm tác dụng là khi gọi API nếu dữ liệu chưa cập nhật thì nó kh bị khó chịu cho người dùng)
        setOrderedColumnsState(dndOrderedColumns)

        // Xử dụng Redux sẽ chuẩn hơn
        moveColumns(dndOrderedColumns)
      }
    }

    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
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
      // Thuật toán phát hiện va chạm (nếu không có nó thì card có cover kéo qua column khác không được vì lúc này nó bị conflic giữa card và column), dùng closetCorners thay vì dùng closetCenter
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <Box sx={{
        backgroundImage: 'url("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bcdbac5b-cdc4-410e-8020-c863a7210f66/dds3mtw-e054f664-62bd-4330-936b-31d55fa97224.jpg/v1/fill/w_1600,h_900,q_75,strp/why_s_it_not_going__by_neytirix_dds3mtw-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9OTAwIiwicGF0aCI6IlwvZlwvYmNkYmFjNWItY2RjNC00MTBlLTgwMjAtYzg2M2E3MjEwZjY2XC9kZHMzbXR3LWUwNTRmNjY0LTYyYmQtNDMzMC05MzZiLTMxZDU1ZmE5NzIyNC5qcGciLCJ3aWR0aCI6Ijw9MTYwMCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.bzEbHgY146m_aNzZLEpUg3vSy4Gqf6mKZYqlebCU96E")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width:'100%',
        height:(theme) => theme.trello.boardContentHeight,
        p: '10px 0px'
      }}>
        <ListColumns
          columns={orderedColumnsState}
        />
        {/* Nếu kiểm tra activeDragItem là false thì trả về null còn không phải thì kiểm tra xem trường hợp đó là Card hay column rồi sẽ set Overlay là đối tượng đó  */}
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/> }
          {(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData}/> }
        </DragOverlay>

        {/* Float Button Message */}
        <Fab aria-label="add" onClick={toggleDrawer(true)} sx={{ position: 'fixed', bottom: '20px', right: '20px' }}>
          <MessageIcon />
        </Fab>
        <ChatBox open={openChat} receiverId={receiverId}></ChatBox>
        <Drawer open={openDraw} onClose={handleCloseDraw} anchor={'right'} sx={{
        }}>
          <Typography variant="h6" justifyContent={'center'} alignItems={'center'} display={'flex'} fontSize={'32px'} color={'primary'}>Member</Typography>
          <Divider />
          <Box sx={{
            width: '400px',
            gap: '16px',
            m:'8px',
          }}>
            {board.members.map((member) =>
              <Box key={member._id} sx={{
                display: 'flex',
                gap: '16px',
                m:'16px',
              }}
              onClick={() => {handleChat(member._id)}}
              >
                <Badge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                  color='primary'
                >
                  <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                </Badge>
                <Typography variant="h6" justifyContent={'center'} alignItems={'center'} display={'flex'} fontSize={'16px'}>{member.displayName}</Typography>
              </Box>)}
          </Box>
        </Drawer>
      </Box>
    </DndContext>
  )
}

export default BoardContent