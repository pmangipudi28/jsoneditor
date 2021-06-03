import React, { useState, useRef, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';

import { AppBar, Toolbar, Grid, Badge, IconButton, Typography } from '@material-ui/core';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';

import { makeStyles, CssBaseline } from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import SaveTwoToneIcon from '@material-ui/icons/SaveTwoTone';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';

// Sub-components for each menu items
import OpenFromDisk from '../components/OpenFromDisk'
import OpenFromCloud from '../components/OpenFromCloud'
import Refresh from '../components/Refresh'
import PowerOff from '../components/PowerOff'
import SaveToDisk from '../components/SaveToDisk'
import SaveToURL from '../components/SaveToURL'


import {fetch_json_request, fetch_json_success, fetch_json_failure} from '../actions'

const theme = createMuiTheme({});

const useStyles = makeStyles({
    root: {
        backgroundColor: '#545A61'     // 454749    // 325C05
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

export default function Header() {

    const classes = useStyles();
    const dispatch = useDispatch();

    const currentState = useSelector(state => state.jsonReducer);
    
    const fileInput = useRef(null);
    const [open, setOpen] = useState(false);
        
    const anchorRefOfOpen = useRef(null);

    const handleToggleOfOpen = () => {
      setOpen((prevOpen) => !prevOpen);
    };   
  
    const handleCloseOfOpen = ({ target }) => {  
        if (anchorRefOfOpen.current && anchorRefOfOpen.current.contains(target)) {
            return;
        }        
        setOpen(false);
    };

    const handleChange = e => {
        
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], "UTF-8");
        
        fileReader.onload = e => {         
            
          try{              
            dispatch(fetch_json_success(eval(JSON.parse(JSON.stringify(e.target.result)))));
          }
          catch {
            dispatch(fetch_json_success(JSON.parse(eval(JSON.stringify(unescape(e.target.result))))));
          }          
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
                                                        <OpenFromDisk />
                                                        <OpenFromCloud />
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
                                        className={currentState.updating ? null : classes.disableSave}>
                                    <Badge>
                                        {currentState.updating ? <SaveOutlinedIcon style={{ color: "white" }} fontSize="medium"/> : <SaveTwoToneIcon fontSize="medium" /> }
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
                                                       <SaveToDisk />
                                                       <SaveToURL />
                                                </MenuList> 
                                            </ClickAwayListener>
                                        </Paper>
                                        </Grow>
                                    )}
                                    </Popper>                            
                        </Grid>
                    </ThemeProvider>
                    <Refresh />
                    <PowerOff />                    
                </Grid>

            </Toolbar>
        </AppBar>
       
    )
}