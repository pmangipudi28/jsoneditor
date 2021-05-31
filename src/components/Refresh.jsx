import React from 'react'
import { Grid, Tooltip, Badge, IconButton } from '@material-ui/core';
import RefreshOutlinedIcon from '@material-ui/icons/RefreshOutlined';
import {useSelector, useDispatch} from 'react-redux';

import {clear_json} from '../actions'

function Refresh() {
    
    const dispatch = useDispatch();
    const currentState = useSelector(state => state.jsonReducer);

    const refreshApp = () => {
        dispatch(clear_json());
    }

    return (
        <>
            <Grid item>
                <Tooltip title="Refresh application">
                    <IconButton>
                        <Badge>
                            <RefreshOutlinedIcon style={{ color: "white" }} fontSize="medium" onClick={refreshApp}/>
                        </Badge>
                    </IconButton>
                </Tooltip>                    
            </Grid>
        </>
    )
}

export default Refresh
