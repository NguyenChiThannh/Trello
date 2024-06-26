import React, { useState } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import useDetailCardStore from '~/zustand/useDetailCard'

function TrelloCard({ card }) {
  const openDetailCard = useDetailCardStore((state) => state.openDetailCard)
  const updateCard = useDetailCardStore((state) => state.updateCard)
  const setOpenDetailCard = useDetailCardStore((state) => state.setOpenDetailCard)
  // drag
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card._id,
    data: { ...card },
    disabled: openDetailCard,
  })

  const dndKitCardStyle = {
    //touchAction: 'none',
    // Nếu dùng CSS.Transform như docs sẽ bị lỗi
    // https://github.com/clauderic/dnd-kit/issues/117
    transform: CSS.Translate.toString(transform), // Transform nó bị méo khi kéo cột, nên dùng Translate
    transition,
    opacity: isDragging ? 0.5 : undefined

  }

  const handleClickCard = () => {
    setOpenDetailCard(true)
    updateCard(card)
  }

  const shouldShowCardActopms = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }
  return (
    <Card
      ref={setNodeRef}
      style={dndKitCardStyle}
      {...attributes}
      {...listeners}
      onClick={handleClickCard}
      sx={{
        cursor:'pointer',
        boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
        overflow: 'unset',
        opacity: card.FE_PlaceholderCard ? '0' : '1',
        minWidth: card.FE_PlaceholderCard ? '280px' : 'unset',
        pointerEvents: card.FE_PlaceholderCard ? 'none' : 'unset',
        position: card.FE_PlaceholderCard ? 'fixed' : 'unset',
        border: '1px solid transparent',
        '&:hover': { borderColor: (theme) => theme.palette.primary.main }

      }}>
      {card?.cover &&
      <CardMedia
        sx={{ height: 140 }}
        image={card?.cover}
        title="green iguana"
      />
      }
      <CardContent sx={{
        p: 1.5,
        '&:last-child':{ p :1.5 }
      }}>
        <Typography>{card?.title}</Typography>
      </CardContent>
      {shouldShowCardActopms() &&
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        {!!card?.memberIds?.length &&
          <Button size="small" startIcon= {<GroupIcon/>}>{card?.memberIds?.length}</Button>}
        {!!card?.comments?.length &&
          <Button size="small" startIcon= {<CommentIcon/>}>{card?.comments?.length}</Button>}
        {!!card?.attachments?.length &&
          <Button size="small" startIcon= {<AttachmentIcon/>}>{card?.attachments?.length}</Button>}
      </CardActions>
      }
    </Card>
  )
}

export default TrelloCard