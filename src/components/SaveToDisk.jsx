import React from 'react'
import { Tooltip, Typography } from '@material-ui/core';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

function SaveToDisk() {
    return (
        <>
            <Tooltip title="Open a JSON file from disk">
                <>
                    <MenuItem>
                        <ListItemIcon>
                            <SaveOutlinedIcon fontSize="small"/>
                        </ListItemIcon>
                        <Typography variant="inherit">Save to Disk</Typography>
                    </MenuItem>
                </>
            </Tooltip>
        </>
    )
}

export default SaveToDisk
