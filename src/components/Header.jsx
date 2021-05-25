import React, { useState, useRef, useEffect } from 'react'
import { AppBar, Button, Toolbar, Grid, Tooltip, InputBase, Badge, IconButton, Typography } from '@material-ui/core';
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
import SaveTwoToneIcon from '@material-ui/icons/SaveTwoTone';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ComputerOutlinedIcon from '@material-ui/icons/ComputerOutlined';
import CloudOutlinedIcon from '@material-ui/icons/CloudOutlined';

const theme = createMuiTheme({});

const useStyles = makeStyles({
    root: {
        backgroundColor: '#325C05'        
    },
    paper: {
        marginRight: theme.spacing(2),
    },
    file: {
        display: 'none'
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
    },
    disableSave : {
        cursor: 'not-allowed',
        pointerEvents: 'none'
    }
})

export default function Header({ setFileJSON }) {

    const classes = useStyles();
    
    const fileInput = useRef(null);
    const [open, setOpen] = useState(false);    
    const anchorRefOfOpen = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [files, setFiles] = useState({});    
    

    const handleToggleOfOpen = () => {
      setOpen((prevOpen) => !prevOpen);
    };   
  
    const handleCloseOfOpen = ({ target }) => {  
        if (anchorRefOfOpen.current && anchorRefOfOpen.current.contains(target)) {
            return;
        }
        
        setOpen(false);
    };

    const handleCapture = ({ target }) => {  
        setSelectedFile(target.files[0]);
        console.log(selectedFile);
    };

    const handleChange = e => {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        fileReader.onload = e => {
          // console.log("e.target.result", e.target.result);
          setFiles(e.target.result);
          setFileJSON(e.target.result);
        };
      };

    function handleListKeyDownOfOpen(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = useRef(open);
    useEffect(() => {
      if (prevOpen.current === true && open === false) {
        
        anchorRefOfOpen.current.focus();
      }
  
      prevOpen.current = open;
    }, [open]);

    //////////////////////////////////////////////////////////////////////
    const [save, setSave] = useState(false);
    const anchorRefOfSave = useRef(null);
  
    const handleToggleOfSave = () => {
      setSave((prevSave) => !prevSave);
    };
  
    const handleCloseOfSave = (event) => {
      if (anchorRefOfSave.current && anchorRefOfSave.current.contains(event.target)) {
        return;
      }
  
      setSave(false);
    };
 
    function handleListKeyDownOfSave(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setSave(false);
      }
    }

    // return focus to the button when we transitioned from !save -> save
    const prevSave = React.useRef(save);
    React.useEffect(() => {
        if (prevSave.current === true && save === false) {
            anchorRefOfSave.current.focus();            
        }
    
        prevSave.current = save;
    }, [save]);

    const refreshApp = () => {
        setFiles([]);
        setFileJSON([]);
    }

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
                                <IconButton ref={anchorRefOfOpen}
                                        aria-controls={open ? 'menu-list-grow' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleToggleOfOpen}>
                                    <Badge>
                                        <FolderOpenOutlinedIcon style={{ color: "white" }} fontSize="medium"/>
                                    </Badge>
                                </IconButton>
                                <Popper open={open} anchorEl={anchorRefOfOpen.current} role={undefined} transition disablePortal>
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                        >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleCloseOfOpen}>
                                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDownOfOpen}>
                                                
                                                    <input
                                                        accept="application/json"
                                                        className={classes.file}
                                                        id="json-file"  
                                                        ref={fileInput}
                                                        onChange={handleChange}                                                  
                                                        type="file"
                                                    />
                                                        <Tooltip title="Open a JSON file from disk">
                                                            <div>
                                                                <label htmlFor="json-file">                                                            
                                                                    <MenuItem>
                                                                        <ListItemIcon>                                                            
                                                                            <ComputerOutlinedIcon fontSize="small"/>
                                                                        </ListItemIcon>
                                                                        <Typography variant="inherit">Open from Disk</Typography>                                                                                                                    
                                                                    </MenuItem>                                                            
                                                                </label>
                                                            </div>
                                                        </Tooltip>
                                                        <Tooltip title="Open a JSON file from Cloud">
                                                            <MenuItem>
                                                                <ListItemIcon>
                                                                    <CloudOutlinedIcon fontSize="small" />
                                                                </ListItemIcon>
                                                                <Typography variant="inherit">Open from URL</Typography>
                                                            </MenuItem>
                                                        </Tooltip>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                        </Grow>
                                    )}
                                    </Popper>
                        </Grid>
                    </ThemeProvider>
                    <ThemeProvider theme={theme}>
                        <Grid item>                             
                                <IconButton ref={anchorRefOfSave}
                                        aria-controls={save ? 'menu-list-grow' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleToggleOfSave}
                                        className={files.length > 0 ? null : classes.disableSave}>
                                            
                                    <Badge>
                                        {files.length > 0 ? <SaveOutlinedIcon style={{ color: "white" }} fontSize="medium"/> : <SaveTwoToneIcon fontSize="medium" /> }
                                    </Badge>
                                </IconButton>
                                <Popper open={save} anchorEl={anchorRefOfSave.current} role={undefined} transition disablePortal>
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                        >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleCloseOfSave}>
                                                <MenuList autoFocusItem={save} id="menu-list-grow" onKeyDown={handleListKeyDownOfSave}>
                                                    
                                                    <a
                                                        href="example4.json"                                                        
                                                        id="save-as"
                                                        download="example4.json"
                                                    />
                                                        <Tooltip title="Open a JSON file from disk">
                                                            <div>
                                                                <label htmlFor="save-as">
                                                                    <MenuItem>
                                                                        <ListItemIcon>                                                            
                                                                            <SaveOutlinedIcon fontSize="small"/>
                                                                        </ListItemIcon>
                                                                        <Typography variant="inherit">Save to Disk</Typography>
                                                                    </MenuItem>                                                            
                                                                </label>
                                                            </div>
                                                        </Tooltip>
                                                        <Tooltip title="Open a JSON file from Cloud">
                                                            <MenuItem>
                                                                <ListItemIcon>
                                                                    <CloudOutlinedIcon fontSize="small" />
                                                                </ListItemIcon>
                                                                <Typography variant="inherit">Save to URL</Typography>
                                                            </MenuItem>
                                                        </Tooltip>

                                                    {/* <MenuItem onClick={handleCloseOfSave}>
                                                        <ListItemIcon>
                                                            <SaveOutlinedIcon  fontSize="medium"/>
                                                        </ListItemIcon>
                                                        <Typography variant="inherit">Save to Disk</Typography>
                                                    </MenuItem>
                                                    <MenuItem onClick={handleCloseOfSave}>
                                                        <ListItemIcon>
                                                            <CloudOutlinedIcon fontSize="small" />
                                                        </ListItemIcon>
                                                        <Typography variant="inherit">Save to URL</Typography>
                                                    </MenuItem>*/ }
                                                </MenuList> 
                                            </ClickAwayListener>
                                        </Paper>
                                        </Grow>
                                    )}
                                    </Popper>                            
                        </Grid>
                    </ThemeProvider>
                    <Grid item>
                        <Tooltip title="Refresh application">
                            <IconButton>
                                <Badge>
                                    <RefreshOutlinedIcon style={{ color: "white" }} fontSize="medium" onClick={refreshApp}/>
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
                </Grid>

            </Toolbar>
        </AppBar>
       
    )
}