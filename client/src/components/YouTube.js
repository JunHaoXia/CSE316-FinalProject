import React, { useContext, useRef } from 'react';
import YouTube from 'react-youtube';

import { GlobalStoreContext } from '../store'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';

import FastRewindRoundedIcon from '@mui/icons-material/FastRewindRounded';
import FastForwardRoundedIcon from '@mui/icons-material/FastForwardRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import AuthContext from '../auth'

export default function YouTubePlayerExample() {
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT

    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const playerRef = useRef(null);

    let playlist = ["iOjfSAQvV6Y"]
    let titles = []
    let artists = []
    if(auth.loggedIn && store.currentList != null) {
        playlist = []
        store.currentList.songs.map((song) => (
            playlist.push(song.youTubeId)  
        ))  
        store.currentList.songs.map((song) => (
            artists.push(song.artist)
        ))  
        store.currentList.songs.map((song) => (
            titles.push(song.title)
        ))   
    }
    console.log("Titles:")
    console.log(titles)
    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    let currentSong = store.currentSongIndex;
    let currentTitle = "Don't Abandon me"
    let currentArtist = "Me"
    let currNum = "Infinity"

    const playerOptions = {
        height: '390',
        width: '421',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let song = playlist[currentSong];
        // currentTitle = titles[currentSong]
        // currentArtist = artists[currentSong]
        // currNum = currentSong + 1
        player.loadVideoById(song);
        player.playVideo();
    }
    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        currentSong++;
        currentSong = currentSong % playlist.length;
        store.setCurrentSong(currentSong, store.currentList.songs[currentSong])
        
    }
    function decSong() {
        currentSong--;
        currentSong = currentSong % playlist.length;
        store.setCurrentSong(currentSong, store.currentList.songs[currentSong])
    }

    function onPlayerReady(event) {
        playerRef.current = event.target
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }
    function prevSong() {
        decSong()
        loadAndPlayCurrentSong(playerRef.current)
        console.log("now playing song#:" + currentSong)
    }
    function pauseSong() {
        playerRef.current.pauseVideo()
    }
    function playSong(){
        playerRef.current.playVideo()
    }
    function nextSong() {
        incSong()
        loadAndPlayCurrentSong(playerRef.current)
        console.log("now playing song#:" + currentSong)
    }
    let playListTitle = "This is a cry for help"
    if (store.currentList != null){
        playListTitle = store.currentList.name
        currentTitle = titles[currentSong]
        currentArtist = artists[currentSong]
        currNum = currentSong + 1
    }
    let videoInfo = 
    <Typography>
        Playlist: {playListTitle}
        <br></br>
        Song #: {currNum}
        <br></br>
        Title: {currentTitle}
        <br></br>
        Artist: {currentArtist}
        <br></br>
    </Typography>
    return (
        <Grid>
            <YouTube
            videoId={playlist[currentSong]}
            opts={playerOptions}
            ref={playerRef}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange} />
            {videoInfo}
            <Box>
                <Grid container sx={{background: 'black'}}>
                    <Grid item xs={12} sm={3}>
                        <Button onClick={prevSong} style={{ align:"center", textDecoration: 'none', width: .03, color:"white"}}><FastRewindRoundedIcon/></Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button onClick={pauseSong} style={{ align:"center", textDecoration: 'none', width: .03, color:"white"}}><StopRoundedIcon/></Button>    
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button onClick={playSong} style={{ align:"center", textDecoration: 'none', width: .03, color:"white"}}><PlayArrowRoundedIcon/></Button> 
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button onClick={nextSong} style={{ align:"center", textDecoration: 'none', width: .03, color:"white"}}><FastForwardRoundedIcon/></Button>
                    </Grid>
                </Grid>            
            </Box>
        </Grid>);
}