import Dialog from '@mui/material/Dialog'
import { useRef, useState } from 'react'
import Box from '@mui/material/Box'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Grid from '@mui/material/Grid'
import EditIcon from '@mui/icons-material/Edit'
import DashboardIcon from '@mui/icons-material/Dashboard'
import Typography from '@mui/material/Typography'
import SubjectIcon from '@mui/icons-material/Subject'
import TextField from '@mui/material/TextField'
import InputDescribe from './InputDescribe/InputDescribe'
import Button from '@mui/material/Button'
import ImageIcon from '@mui/icons-material/Image'
import AttachFileIcon from '@mui/icons-material/AttachFile'
import CommentIcon from '@mui/icons-material/Comment'
import CommentCard from './CommentCard/CommentCard'
import { updateCoverAPI } from '~/apis/card'
import { getBoardDetailAPI } from '~/apis/board'
import { useDispatch } from 'react-redux'
import Loading from '~/components/Loading/Loading'
import { toast } from 'react-toastify'

function DetailCard({ card, openDetailCard, setOpenDetailCard }) {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [title, setTitle] = useState(card.title)
  const fileInputRef = useRef(null)
  const [imageSrc, setImageSrc] = useState(card.cover)
  const [description, setDescription] = useState(card.description)
  const [isEditingDescription, setIsEditingDescription] = useState(false)


  const handleTitleClick = () => {
    setIsEditingTitle(true)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleBlur = () => {
    setIsEditingTitle(false)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleBlur()
    }
  }

  const handleClose = () => {
    setOpenDetailCard(false)
  }
  const hanleEditDescription = () => {
    setIsEditingDescription(true)
  }

  const handleChangeCover = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    if (file) {
      const formData = new FormData()
      const reader = new FileReader()
      reader.onloadend = () => {
        setImageSrc(reader.result)
      }
      reader.readAsDataURL(file)
      formData.append('cover', file)
      formData.append('cardId', card._id)
      formData.append('boardId', card.boardId)
      try {
        await updateCoverAPI(formData)
        await getBoardDetailAPI(card.boardId, dispatch, null, setIsLoading)
      } catch (error) {
        toast(error)
      }
    }
  }

  return (
    <Dialog
      open={openDetailCard}
      onClose={handleClose}
      fullWidth
      maxWidth='md'
      scroll="body"
      PaperProps={{
        style: {
          height: '100%',
        },
      }}
    >
      {imageSrc && <DialogTitle sx={{ position: 'relative', padding: 0 }}>
        <img
          src={imageSrc}
          alt="Card"
          style={{ width: '100%', height: '30vh', objectFit: 'cover' }}
        />
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.common.white,
          }}
        >
          <CloseIcon sx={{ color: (theme) => theme.palette.natural.main }} />
        </IconButton>
        <Box
          onClick={handleChangeCover}
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 8,
            backgroundColor: (theme) => theme.palette.natural.main,
            p: '8px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '12px',
          }}
        >
          Edit background
          <EditIcon sx={{ ml: 1, fontSize: '16px' }} />
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </Box>
      </DialogTitle>}
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={9}>
            <Box display="flex" alignItems="center" mb={'50px'}>
              <DashboardIcon />
              {isEditingTitle ? (
                <TextField
                  value={title}
                  onChange={handleTitleChange}
                  onBlur={handleBlur}
                  onKeyPress={handleKeyPress}
                  autoFocus
                  variant="standard"
                  size="small"
                  sx={{
                    ml: 1,
                    '& .MuiInputBase-input': {
                      fontSize: '1.25rem',
                      fontWeight: 400,
                    },
                  }}
                  InputProps={{
                    disableUnderline: true,
                  }}
                />
              ) : (
                <Typography variant="h6" sx={{ ml: 1 }} onClick={handleTitleClick}>
                  {title}
                </Typography>
              )}
            </Box>
            <Box display="flex" alignItems="center" mt={'8px'}>
              <SubjectIcon />
              <Typography variant="body1" sx={{ ml: 1, fontWeight:'bold' }}>
                Description
              </Typography>
            </Box>
            {description && !isEditingDescription && <Box onClick={hanleEditDescription}>
              <Typography sx={{ ml:'32px' }}>
                {description}
              </Typography>
            </Box>}
            {!description && !isEditingDescription && <Box
              onClick={hanleEditDescription}
              sx={{
                ml:'32px',
                mt:'16px',
                backgroundColor: (theme) => theme.palette.secondary.main,
                p:'16px',
                borderRadius:'6px',
                fontSize:'14px',
                fontWeight:'bold',
                cursor:'pointer'
              }}>
              Add a more detailed description
            </Box>}
            {isEditingDescription && <InputDescribe card={card} description={description} setDescription={setDescription} setIsEditingDescription={setIsEditingDescription}/>}
            <Box display="flex" alignItems="center" mt={'16px'}>
              <CommentIcon />
              <Typography variant="body1" sx={{ ml: 1, fontWeight:'bold' }} >
                Comment
              </Typography>
            </Box>
            <CommentCard card={card}/>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="subtitle2" mb={'16px'}>
              Add to card
            </Typography>
            <Button variant="outlined" onClick={handleChangeCover} startIcon={<ImageIcon />} sx={{

              width:'100%',
              p:'4px',
              justifyContent: 'flex-start',
              pl:'12px',
              mb:'8px'
            }}>
              Add Image
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </Button>
            <Button variant="outlined" startIcon={<AttachFileIcon />} sx={{
              width:'100%',
              p:'4px',
              justifyContent: 'flex-start',
              pl:'12px',
              mb:'8px'
            }}>
              Add File
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
      <Loading open={isLoading} />
    </Dialog>
  )
}

export default DetailCard