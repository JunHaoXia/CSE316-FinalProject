import React, { useContext } from 'react'
import CommentCard from './CommentCard.js'
import { GlobalStoreContext } from '../store'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';


function CommentTab(){
    const { store } = useContext(GlobalStoreContext);
    let comment = ""
    function handleAddComment(event) {
        if (event.code === "Enter") {
            if (comment != ''){
                store.addComment(comment)
                document.getElementById("comment").value = null;
            }
        }
    }
    function handleUpdateText(event) {
        comment = event.target.value;
    }
    let commentCardo = ""
    let commentName = ""
    if (store.currentList != null){
            commentCardo = store.currentList.comments.map((pair) => (
                <CommentCard
                    user = {pair.name}
                    comment = {pair.comment}
                />
            ))
            commentName = store.currentList.name
    }
    return(
            <Grid sx={{bgcolor: "lightblue"}}>
                    <List sx={{width: "100%", bgcolor: "lightblue",height:"455px", overflow:"scroll"}}>
                        <Typography sx={{color: "blueviolet"}}>
                            {commentName} Comment Section
                        </Typography>
                        {
                            commentCardo
                        }
                    </List>
                    <TextField
                        margin="normal"
                        fullWidth
                        id="comment"
                        label="Comment"
                        name="add-comment"
                        autoComplete="Add Comment"
                        onKeyPress={handleAddComment}
                        onChange={handleUpdateText}
                    />
            </Grid>
    )
    
}
export default CommentTab;
