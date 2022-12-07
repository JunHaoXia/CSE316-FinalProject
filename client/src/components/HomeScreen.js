import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import CommentTab from './CommentTab.js'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Box from '@mui/material/Box'
import SearchBanner from './SearchBanner.js';
import YouTubePlayerExample from './YouTube.js';
import YouTubeTab from './YouTubeTab.js';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    
    useEffect(() => {
        store.loadIdNamePairs();
    }, []);
    function handleCreateNewList() {
        store.createNewList();
    }
    let youtubeDisplay = <YouTubeTab />
    const [screenState, setScreenState] = useState(youtubeDisplay);
    let buttonsAble = true;
    if(store.currentList != null){
        buttonsAble = false;
    }
    let commentCard = ""
    if (store.currentList != null){
        commentCard = <CommentTab />
    }
    function handleComment(){
        setScreenState(commentCard)
        console.log("Pressed Comment Button")
    }
    function handleYouTube(){
        setScreenState(youtubeDisplay)
        console.log("Pressed YouTube Button")
        console.log(store.idNamePairs)
        console.log(store.currentList.updatedAt)
    }
    let listCard = ""
    if (store) {
        listCard = 
            <List sx={{width: '100%', bgcolor: 'background.paper', mb:"20px" }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                    />
                ))
                
            }
            <Fab sx={{transform:"translate(800%, 10%)"}}
                    color="primary" 
                    aria-label="add"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                    disabled={!buttonsAble}
                    >
                    <AddIcon />
            </Fab>
            </List>;
    }
    return (
        <div id="playlist-selector">
            <div id="list-selector-heading">
            <Fab sx={{transform:"translate(-20%, 0%)"}}
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
                Your Playlists
            </div>
            <SearchBanner />
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        overflow:"scroll",
                        height: "100%",
                        backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    }}
                >
                    {
                        listCard
                    }
                        <MUIDeleteModal />
                </Grid>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    onClick={handleYouTube}
                                    fullWidth
                                    variant="contained"
                                >
                                Youtube Player
                                </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Button
                                    onClick={handleComment}
                                    fullWidth
                                    disabled={buttonsAble}
                                    variant="contained"
                                >
                                Comments
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                    <Box>
                        {
                            //screenDisplay
                            screenState
                        }
                    </Box>
                </Grid>
            </Grid>
            
        </div>)
}

export default HomeScreen;