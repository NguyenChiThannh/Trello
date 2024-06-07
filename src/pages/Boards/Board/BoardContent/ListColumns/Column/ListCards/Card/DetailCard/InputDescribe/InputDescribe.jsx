import Dialog from '@mui/material/Dialog'
import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import TextField from '@mui/material/TextField'
import ImageIcon from '@mui/icons-material/Image'
import LinkIcon from '@mui/icons-material/Link'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import FormatBoldIcon from '@mui/icons-material/FormatBold'
import FormatItalicIcon from '@mui/icons-material/FormatItalic'
import AddIcon from '@mui/icons-material/Add'
import { updateDescriptionAPI } from '~/apis/card'
import { toast } from 'react-toastify'
import { getBoardDetailAPI } from '~/apis/board'
import { useDispatch } from 'react-redux'


function InputDescribe({ card, description, setDescription, setIsEditingDescription }) {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState(null)
  const [link, setLink] = useState('')
  const [fontSize, setFontSize] = useState('16')

  const handleTextChange = (event) => {
    setDescription(event.target.value)
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }


  const handleLinkChange = (event) => {
    const file = event.target.files[0]
    setLink(event.target.value)
  }

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value)
  }
  const handleCancelEditingDescription = () => {
    setIsEditingDescription(false)
  }

  const handleSaveDescription = async () => {
    try {
      const data = {
        cardId: card._id,
        description,
        boardId: card.boardId,
      }
      await updateDescriptionAPI(data)
      await getBoardDetailAPI(card.boardId, dispatch, null, setIsLoading)
      await setIsEditingDescription(false)
    } catch (error) {
      toast(error)
    }
  }

  return (
    <Box sx={{ border: '1px solid #ccc', borderRadius: '8px', mt: '16px', ml:'32px' }}>
      <TextField
        value={description}
        onChange={handleTextChange}
        variant="outlined"
        defaultValue={description}
        multiline
        rows={4}
        fullWidth
        sx={{
          fontSize: `${fontSize}px`,
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              border: 'none',
            },
          },
        }}
        InputProps={{ style: { fontSize: `${fontSize}px` } }}
      />
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', m: '12px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControl variant="standard" sx={{ minWidth: 80, mr: 2 }}>
            <Select
              value={fontSize}
              onChange={handleFontSizeChange}
              displayEmpty
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem value="">
                <em>Aa</em>
              </MenuItem>
              <MenuItem value="12">12</MenuItem>
              <MenuItem value="14">14</MenuItem>
              <MenuItem value="16">16</MenuItem>
              <MenuItem value="18">18</MenuItem>
              <MenuItem value="20">20</MenuItem>
            </Select>
          </FormControl>
          <Tooltip title="Bold">
            <IconButton>
              <FormatBoldIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Italic">
            <IconButton>
              <FormatItalicIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Bulleted List">
            <IconButton>
              <FormatListBulletedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add Link">
            <IconButton>
              <LinkIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add Image">
            <IconButton component="label">
              <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
              <ImageIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="More Options">
            <IconButton>
              <AddIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <Box>
          <Button variant="outlined" sx={{ mr: 2 }} onClick={handleCancelEditingDescription}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleSaveDescription}>Save</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default InputDescribe