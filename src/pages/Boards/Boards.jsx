// Boards list
import Box from '@mui/material/Box'
import DashboardIcon from '@mui/icons-material/Dashboard'
import Grid from '@mui/material/Unstable_Grid2'
import Container from '@mui/material/Container'
import AppBar from '~/components/AppBar'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import { useEffect, useState } from 'react'
import Collapse from '@mui/material/Collapse'
import BackupTableIcon from '@mui/icons-material/BackupTable'
import HomeIcon from '@mui/icons-material/Home'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import { Button, CardActionArea, CardActions } from '@mui/material'
import Pagination from '@mui/material/Pagination'
import { useSelector } from 'react-redux'
import { getAllBoardsAPI, getBoardDetailAPI } from '~/apis/board'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function BoardList() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [selectedIndex, setSelectedIndex] =useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const boards = (useSelector((state) => state.board.board.boards))
  const countBoards = (useSelector((state) => state.board.board.count))
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)
  }

  const [open, setOpen] = useState(true)
  const handleClick = (e, index) => {
    setOpen(!open)
    handleListItemClick(e, index)
  }
  const handleChangePage = (e, page) => {
    setCurrentPage(page)
    const queryParams = new URLSearchParams(window.location.search)
    queryParams.set('page', page)
    navigate(`?${queryParams.toString()}`)
    getAllBoardsAPI(dispatch, page)
  }
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const page = searchParams.get('page')
    setCurrentPage(page || 1)
    getAllBoardsAPI(dispatch, page || 1)
  }, [])

  const handleClickBoard = (boardId) => {
    getBoardDetailAPI(boardId, dispatch, navigate)
  }
  return (
    <Container disableGutters maxWidth={true} sx={{ height:'100%' }}>
      <AppBar/>
      {/* Board Detail */}
      <Grid container spacing={2} mx={6} mt={2} >
        {/* Left Bar */}
        <Grid xs={3} mb={3} >
          <Box sx={{ width: '100%', maxWidth: 360 }}>
            <List component="nav" aria-label="main mailbox folders">
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <ListItemIcon>
                  <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Board" />
              </ListItemButton>
              <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleClick(event, 1)}
              >
                <ListItemIcon>
                  <BackupTableIcon/>
                </ListItemIcon>
                <ListItemText primary="Templete" />
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton >
                    <ListItemIcon>
                    </ListItemIcon>
                    <ListItemText primary="Business" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton >
                    <ListItemIcon>
                    </ListItemIcon>
                    <ListItemText primary="Education" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton >
                    <ListItemIcon>
                    </ListItemIcon>
                    <ListItemText primary="Design" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton >
                    <ListItemIcon>
                    </ListItemIcon>
                    <ListItemText primary="Personally" />
                  </ListItemButton>
                </List>
              </Collapse>


              <ListItemButton
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItemButton>
            </List>
            <Divider />
            <List component="nav" aria-label="secondary mailbox folder">
              <ListItemButton
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
              >
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="Person" />
              </ListItemButton>
            </List>
          </Box>
        </Grid>
        {/* Content Area */}
        <Grid xs={9} spacing={3}>
          <Typography variant="h4" fontWeight={'bold'} color={'primary'}>
            Your Board:
          </Typography>
          <Box padding={0} mt={1}>
            <Grid container xs={12} sx={{ width: '100%', display:'flex' }} spacing={2} padding={0}>
              {boards?.map(board =>
                <Grid xs={3} key={board._id}>
                  <Card onClick={() => handleClickBoard(board._id)}>
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height="100"
                        image= {board.background}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{ display:'flex', overflow: 'hidden', height: '35px' }}>
                          {board.title}
                        </Typography>
                        <Typography variant="text" color="text.secondary" sx={{ display:'flex', overflow: 'hidden', height: '32px', width:'216px' }}>
                          {board.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <Button size="small" color="primary">
                        Go to the Board
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>)}
            </Grid>

          </Box>
          <Box style={{ display: 'flex', justifyContent: 'flex-end' }} mt={3}>
            <Pagination count={Math.ceil(countBoards/8)} color="primary" onChange={handleChangePage} page={parseInt(currentPage)}/>
          </Box>

        </Grid>
      </Grid>
    </Container>
  )
}

export default BoardList