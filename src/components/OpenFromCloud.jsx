import React, { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux';

import { Tooltip, Typography,Button, TextField } from '@material-ui/core';
import CloudOutlinedIcon from '@material-ui/icons/CloudOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import {fetch_json_request, fetch_json_success, fetch_json_failure} from '../actions'

function validURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
}

function OpenFromCloud() {

    const dispatch = useDispatch();
    const [openDialog, setOpenDialog] = useState(false);    

    const [value, setValue] = React.useState(null);
    const [json, setJson] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [length, setLength] = React.useState(0);

    const currentState = useSelector(state => state.jsonReducer);

    const getJsonData = React.useCallback((value) => {
        
        if (validURL(value)) {
          setLoading(true);
          try {
            fetch(value)
              .then((res) => {
                return res.json();
              })
              .then((data) => {                
                setLoading(false);
                setLength(Object.keys(data).length);

                return dispatch(fetch_json_success(eval(data)));
                  
              });
          } catch (error) {
            console.error("Unable to fetch JSON:", error);
          }
        }
        else
        {
          console.log("Not a valid URL")
        }
      }, [value]);

      const handleClickOpen = () => {        
        setOpenDialog(true);
      };
    
      const handleDialogClose = () => {
        setOpenDialog(false);
      };

      const handleDialogGo = () => {
        getJsonData(value);
        setOpenDialog(false);
      };

      const handleChange = (e) => { 
        setValue(e.target.value);
        // getJsonData(e.target.value);
      }      

    return (
        <>
            <Tooltip title="Open a JSON file from Cloud">
                <>                                                                
                    <MenuItem onClick={handleClickOpen} >
                        <ListItemIcon>
                            <CloudOutlinedIcon fontSize="small" />
                        </ListItemIcon>
                        <Typography variant="inherit">Open from URL</Typography>
                    </MenuItem>
                    {openDialog ? <Dialog id="dialogURL" open={openDialog} onClose={handleDialogClose} aria-labelledby="form-dialog-title">
                        <DialogTitle id="form-dialog-title">Open url</DialogTitle>
                        <DialogContent>
                                <DialogContentText>
                                    Enter a public url. Urls which need authentication or do not have CORS enabled cannot be loaded.
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="url"
                                    label="URL"                                                                                
                                    fullWidth
                                    onChange={handleChange}
                                />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDialogClose} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={handleDialogGo} color="primary">
                                GO
                            </Button>
                        </DialogActions>
                    </Dialog>: null}
                </>
            </Tooltip>
        </>
    )
}

export default OpenFromCloud
