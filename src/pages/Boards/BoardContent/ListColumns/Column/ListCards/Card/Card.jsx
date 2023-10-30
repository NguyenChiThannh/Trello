import React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

function TrelloCard({ temporaryHidenMedia }) {
  if (temporaryHidenMedia)
    return ( <Card sx={{
      cursor:'pointer',
      boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
      overflow: 'unset'
    }}>
      <CardContent
        sx={{
          p: 1.5,
          '&:last-child':{ p :1.5 }
        }}>
        <Typography >Thanh</Typography>
      </CardContent>
    </Card>)
  return (
    <Card sx={{
      cursor:'pointer',
      boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
      overflow: 'unset'
    }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent sx={{
        p: 1.5,
        '&:last-child':{ p :1.5 }
      }}>
        <Typography>Dev Thanh</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" startIcon= {<GroupIcon/>}>20</Button>
        <Button size="small" startIcon= {<CommentIcon/>}>20</Button>
        <Button size="small" startIcon= {<AttachmentIcon/>}>20</Button>
      </CardActions>
    </Card>
  )
}

export default TrelloCard