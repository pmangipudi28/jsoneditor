import React, { useState } from 'react'
import { AppBar, Toolbar, Grid, Tooltip, InputBase, Badge, IconButton, Typography } from '@material-ui/core';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { withStyles, makeStyles, CssBaseline } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import ExitToAppSharpIcon from '@material-ui/icons/ExitToAppSharp';
import PowerOffSharpIcon from '@material-ui/icons/PowerOffSharp';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import Menu from "@material-ui/core/Menu";
import MenuItem from '@material-ui/core/MenuItem';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({});

const useStyles = makeStyles({
    root: {
        backgroundColor: '#325C05'        
    },
    searchInput: {
        opacity: '0.6',
        padding: '0px 8px',
        fontSize: '0.8rem',
        '&:hover': {
            backgroundColor: 'lightgrey'
        },
        '& .MuiSvgIcon-root' : {
            marginLeft: '5px'
        }
    }
})
export default function Header() {

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
        setOpen(true);
      };
    
      const handleClose = (e) => {
        if (e.currentTarget.localName !== "ul") {
          const menu = document.getElementById("simple-menu").children[2];
          const menuBoundary = {
            left: menu.offsetLeft,
            top: e.currentTarget.offsetTop + e.currentTarget.offsetHeight,
            right: menu.offsetLeft + menu.offsetHeight,
            bottom: menu.offsetTop + menu.offsetHeight
          };
          if (
            e.clientX >= menuBoundary.left &&
            e.clientX <= menuBoundary.right &&
            e.clientY <= menuBoundary.bottom &&
            e.clientY >= menuBoundary.top
          ) {
            return;
          }
        }
    
        setOpen(false);
      };

    theme.props = {
        MuiList: {
          onMouseLeave: (e) => {
            handleClose(e);
          }
        }
      };

    return (
        <AppBar position="static" className = {classes.root}>
            <Toolbar>
                <Grid container alignItems="center">
                    <Grid item>                        
                        <Typography variant="h4" component="h2">
                            JSON Editor
                        </Typography>
                    </Grid>
                    <Grid item sm></Grid>
                    <ThemeProvider theme={theme}>
                        <Grid item>
                             {/* <Tooltip title="Open a JSON file from disk"> */}
                                <IconButton id="OpenJSONFile"
                                            aria-owns={open ? "simple-menu" : null}
                                            aria-haspopup="true"
                                            onMouseOver={handleOpen}
                                            onMouseLeave={handleClose}
                                            style={{ zIndex: 1301 }}>
                                    <Badge>
                                        <FolderOpenOutlinedIcon style={{ color: "white" }} fontSize="medium"/>
                                    </Badge>
                                </IconButton>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "center"
                                    }}
                                    transformOrigin={{
                                        vertical: "top",
                                        horizontal: "center"
                                    }}
                                    >
                                    <MenuItem onClick={handleClose}>Open from disk</MenuItem>                                    
                                    <MenuItem onClick={handleClose}>Open from url</MenuItem>
                                    </Menu>
                            {/* </Tooltip> */}
                        </Grid>
                    </ThemeProvider>
                    <Grid item>
                        <Tooltip title="Save an updated JSON file to a disk">
                            <IconButton>
                                <Badge>
                                    <SaveOutlinedIcon style={{ color: "white" }} fontSize="medium"/>
                                </Badge>
                            </IconButton>
                        </Tooltip>                    
                    </Grid>
                    <Grid item>
                        <Tooltip title="Refresh application">
                            <IconButton>
                                <Badge>
                                    <RefreshOutlinedIcon style={{ color: "white" }} fontSize="medium"/>
                                </Badge>
                            </IconButton>
                        </Tooltip>                    
                    </Grid>
                    <Grid item>
                        <Tooltip title="Close the application">
                            <IconButton>
                                <Badge>
                                    <PowerOffSharpIcon style={{ color: "white" }} fontSize="medium"/>
                                </Badge>
                            </IconButton>
                        </Tooltip>                    
                    </Grid>
                    {/* <Grid item sm></Grid>
                    <Grid item>
                        <IconButton>
                            <Badge badgeContent ={4} color="secondary">
                                <NotificationsNoneIcon fontSize="small"/>
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <Badge badgeContent ={3} color="primary">
                                <ChatBubbleOutlineIcon fontSize="small"/>
                            </Badge>
                        </IconButton>
                        <IconButton>
                            <Badge>
                                <PowerSettingsNewIcon fontSize="small"/>
                            </Badge>
                        </IconButton>
                    </Grid> */}
                </Grid>

            </Toolbar>
        </AppBar>
    )
}