import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'

import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function SearchBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    let search_text = ''
    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        auth.logoutUser();
    }

    const handleHouseClick = () => {
        store.closeCurrentList();
    }
    const handleSortAlpha = () => {
        store.sortListAlpha();
        handleMenuClose();
    }
    const handleSortLikes = () => {
        store.sortListLikes()
        handleMenuClose();
    }
    const handleSortDislikes = () => {
        store.sortListDislikes()
        handleMenuClose();
    }
    const handleSortViews = () => {
        store.sortListViews()
        handleMenuClose();
    }
    const handleSortDate = () => {
        store.sortListDate()
        handleMenuClose();
    }
    const handleSearch = (event) => {
        if (event.code === "Enter") {
            if (search_text != ''){
                store.searchList(search_text)
                document.getElementById("search-song-textfield").value = null;
            }
            else store.loadIdNamePairs()
        }
    }
    const handleChange = (event) => {
        search_text = event.target.value

    }
    const menuId = 'primary-search-account-menu';
    const loggedInMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleSortAlpha}>Name(A-Z)</MenuItem>
            <MenuItem onClick={handleSortDate}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={handleSortViews}>Listens (High-Low)</MenuItem>
            <MenuItem onClick={handleSortLikes}>Likes (High-Low)</MenuItem>
            <MenuItem onClick={handleSortDislikes}>Dislikes (High-Low)</MenuItem>
        </Menu>        
    let menu = loggedInMenu;

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar style={{height:"65px"}}position="sticky">
                <Toolbar>
                    <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ width: 0.03, display: { xs: 'none', sm: 'block' } }}                        
                    >
                        <Link onClick={handleHouseClick} style={{ textDecoration: 'none', color: 'white' }} to='/'>⌂</Link>
                    </Typography>
                    <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ width: 0.03, display: { xs: 'none', sm: 'block' } }}                        
                    >
                        <Link onClick={handleHouseClick} style={{ textDecoration: 'none', color: 'white' }} to='/'><GroupsRoundedIcon/></Link>
                    </Typography>
                    <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ width: 0.03, display: { xs: 'none', sm: 'block' } }}                        
                    >
                        <Link onClick={handleHouseClick} style={{ textDecoration: 'none', color: 'white' }} to='/'><PersonRoundedIcon/></Link>
                    </Typography>
                    Search: 
                    <Typography sx={{margin: .5, mt: "10px", fontWeight:"bold", fontSize:"15px"}} id="modal-modal-title" variant="h6" component="h2">
                        <input id="search-song-textfield" className='search-textfield' type="text" onChange={handleChange} onKeyPress={handleSearch}/>
                    </Typography>
                    Sort by
                    <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ margin: 0.5, width: 0.03, display: { xs: 'none', sm: 'block' } }}                        
                    >
                            <Link onClick={handleProfileMenuOpen} style={{ textDecoration: 'none', color: 'white' }} to='/'><SortRoundedIcon/></Link>
                    </Typography>
                </Toolbar>
            </AppBar>
            {
                menu
            }
        </Box>
    );
}