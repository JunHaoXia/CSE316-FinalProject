import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import EditToolbar from './EditToolbar'

import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SongCard from './SongCard.js';
import List from '@mui/material/List';
import WorkspaceScreen from './WorkspaceScreen.js';
import KeyboardDoubleArrowUpRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowUpRounded';
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded';
import ThumbUpRoundedIcon from '@mui/icons-material/ThumbUpRounded';

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const [open, setOpen] = useState(false);
    const { idNamePair, selected } = props;
    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    // function handleLoadList(event, id) {
    //     console.log("handleLoadList for " + id);
    //     if (!event.target.disabled) {
    //         let _id = event.target.id;
    //         if (_id.indexOf('list-card-text-') >= 0)
    //             _id = ("" + _id).substring("list-card-text-".length);

    //         console.log("load " + event.target.id);

    //         // CHANGE THE CURRENT LIST
    //         store.setCurrentList(id);
    //     }
    // }
    //////////////////////////////////////////////////////////////////////
    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
            handleClose();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    /////////////////////////////////////////
    function handleOpen(event, id){
        setOpen(true)
        store.setCurrentList(id)
    }
    function handleClose(){
        store.closeCurrentList()
        setOpen(false)
        handleAddView()
    }
    function handleLike(){
        store.addListLikes(idNamePair._id)
        // store.increaseLikes()
    }
    function handleDislike(){
        store.addListDislikes(idNamePair._id)
    }
    function handlePublishList() {
        store.publishList(idNamePair._id);
        store.setPublishedDate(idNamePair._id)
        console.log(store.currentList.publishedDate)
    }
    function handleDuplicateList(){
        store.duplicateList();
        handleClose();
    }
    function handleAddView(){
        if (idNamePair.published){
            store.addListView(idNamePair._id)
        }
    }
    ///////////////////////////////////////
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }
    //////////////////////////////////////
    let wkspace = ""
    if(store.currentList != null){
        wkspace =
            store.currentList.songs.map((song, index) => (
                <SongCard
                    id={'playlist-song-' + (index)}
                    key={'playlist-song-' + (index)}
                    index={index}
                    song={song}
                />                
            ))         
    }
    let editToolbar = "";
    let publishText = ""
    let buttonsAble = true;
    if (store.currentList) {
        if(!idNamePair.published){
            editToolbar = <EditToolbar />;
        }
        buttonsAble = false;
    }
    if (idNamePair.published) {
        publishText = <Typography sx={{ color: "limegreen"}}>Published Date: {idNamePair.publishedDate[0].display}</Typography>
    }    
    ////////////////////////////////////////////////
    let openCardElement=
        <Grid container 
        id={idNamePair._id}
        key={idNamePair._id}
        sx={{borderRadius: '15px', backgroundColor: 'lightblue', marginTop: '10px', display: 'flex' , p: 1}}>
            <Grid item xs={12} sm={10}>
                <Typography sx={{ height: 1/2 ,fontSize: '15px', fontWeight: 'bold'}}>
                    Title: {idNamePair.name}
                </Typography>
                <Typography sx={{ height: 1/2 ,fontSize: '10px'}}>
                    By: {idNamePair.owner}
                    <br />
                    Listens: {idNamePair.views}
                </Typography>
            </Grid>
            <Grid item xs={12} sm={1}>
                <IconButton disabled={!idNamePair.published} aria-label='like'>
                    <ThumbUpRoundedIcon onClick={handleLike} style={{fontSize:'20pt'}} /> {idNamePair.likes}
                </IconButton>
                <IconButton disabled={!idNamePair.published} aria-label='dislike'>
                    <ThumbDownAltRoundedIcon onClick={handleDislike} style={{fontSize:'20pt'}} /> {idNamePair.dislikes}
                </IconButton>
            </Grid>
            <Grid item sx={{width: "100%"}}>
                {  
                    wkspace
                }
            </Grid>
            <Grid item xs={12} sm={8}>
                <Box></Box>
            </Grid>
            <Grid item xs={12} sm={4}>
                <IconButton sx={{fontSize: '15px'}} disabled={idNamePair.published} onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                    Delete
                </IconButton>
                <IconButton sx={{fontSize: '15px'}} onClick={(event) => {
                        handleDuplicateList()
                    }} aria-label='duplicate'>
                    Duplicate
                </IconButton>
                <IconButton sx={{fontSize: '15px'}} disabled={idNamePair.published} onClick={(event) => {
                        handlePublishList()
                    }} aria-label='publish'>
                    Publish
                </IconButton>
            </Grid>
            <Grid item>
                {editToolbar}
                <IconButton aria-label='close'>
                    <KeyboardDoubleArrowUpRoundedIcon onClick={handleClose} style={{fontSize:'32pt'}} />
                </IconButton>
            </Grid>
            {modalJSX}
        </Grid>

    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{borderRadius:"25px", p: "10px", bgcolor: '#8000F00F', marginTop: '15px', display: 'flex', p: 1 }}
            style={{transform:"translate(1%,0%)", width: '98%', fontSize: '32pt' }}
            button
            // onClick={(event) => {
            //     handleLoadList(event, idNamePair._id)
            // }}
            onClick={(event) => {
                if(store.currentList == null) {
                    handleOpen(event, idNamePair._id);
                }
            }}
        >
            <Box sx={{ p: 1, flexGrow: 1 }}>
                <Typography varient='h3'>{idNamePair.name}</Typography>
                <Typography sx={{fontSize:"12px"}}>Listens: {idNamePair.views}</Typography>
                {publishText}
                <IconButton disabled={!idNamePair.published} aria-label='like'>
                    <ThumbUpRoundedIcon onClick={handleLike} style={{fontSize:'20pt'}} /> {idNamePair.likes}
                </IconButton>
                <IconButton disabled={!idNamePair.published} aria-label='dislike'>
                    <ThumbDownAltRoundedIcon onClick={handleDislike} style={{fontSize:'20pt'}} /> {idNamePair.dislikes}
                </IconButton>
            </Box>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={handleToggleEdit} aria-label='edit' disabled={!buttonsAble || idNamePair.published}>
                    <EditIcon style={{fontSize:'32pt'}} />
                </IconButton>
            </Box>
            <Box sx={{ p: 1 }}>
                <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete' disabled={!buttonsAble}>
                    <DeleteIcon style={{fontSize:'32pt'}} />
                </IconButton>
            </Box>
        </ListItem>

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    ////////////////////////////////////////////////////////////
    let listStatus = cardElement
    if(open){
        listStatus = openCardElement
    }
    else if(!open){
        listStatus = cardElement
    }
    return (
        //cardElement
        //openCardElement
        listStatus
    );
}

export default ListCard;