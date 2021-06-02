import React, {useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';

import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
// import PageHeader from '../../components/PageHeader'
import { Grid, Button, Tooltip, Icon, Paper, makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import ChevronRightRoundedIcon from '@material-ui/icons/ChevronRightRounded';


import Tree from "./Tree";
import TreeUpdate from "./TreeUpdate";
import { CircularProgress } from "@material-ui/core";

import {updating_json} from '../actions'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    pageContent: {
        margin: theme.spacing(2),
        padding: theme.spacing(2),
        backgroundColor: "#B7BEBB"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: "500px",
        overflow: 'auto',
        elevation: 1,
      },
    button: {
        margin: theme.spacing(1),
      },
    buttonDisable: {
        margin: theme.spacing(1),
        backgroundColor: 'red',
    },  
    centerGridItem: {
        display: "grid",
        // justifyContent: "center",
        alignContent: "center"
    }  
}))



function Editor() {
    
    const classes = useStyles();
    const dispatch = useDispatch();

    const currentState = useSelector(state => state.jsonReducer);

    const [btnDisabled, setBtnDisabled] = useState(true);
    const [updateClicked, setUpdateClicked] = React.useState(false);

     const handleUpdate = () => {  
         setUpdateClicked(true);
         dispatch(updating_json());
     }
    
    // const handleClear = () => {        
    //     setJson(json);
    //     setJsonLength(length);
    //     setForwardClicked(false);
    // }

    useEffect(() => {        
        //setUpdateClicked(true);
        setBtnDisabled(true);
    }, [currentState.jsonData]);

    return (
        <> 
            <Paper className={classes.pageContent}>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <Paper variant="elevation" className={classes.paper}>
                                {/* <JSONFileRead data={currentState.jsonData} length={Object.keys(currentState.jsonData).length}/> */}
                                {Object.keys(currentState.jsonData).length > 0 ? <Tree data={currentState.jsonData} length={Object.keys(currentState.jsonData).length} /> : null }
                            </Paper>
                        </Grid>
                        <Grid item xs={2} className={classes.centerGridItem}>
                            <Tooltip title="Update the contents in the right panel">
                                
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    className={classes.button}
                                    endIcon={<ArrowForwardIosIcon>send</ArrowForwardIosIcon>}
                                    disabled={Object.keys(currentState.jsonData).length > 0 ? false : true}
                                    onClick={handleUpdate}
                                    className={classes.button}>
                                    Update
                                </Button>
                                
                            </Tooltip>
                            <Tooltip title="Undo">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        className={classes.button}
                                        disabled={Object.keys(currentState.jsonData).length > 0 ? false : true}>
                                        {/* endIcon={<ArrowForwardIosIcon>send</ArrowForwardIosIcon>} */}
                                        {/* onClick={handleClear} */}
                                        Undo
                                    </Button>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={5}>
                            <Paper variant="elevation" className={classes.paper}>
                                {/* <JSONFileUpdate></JSONFileUpdate> */}
                                {updateClicked ? <TreeUpdate data={eval(currentState.jsonData)} length={Object.keys(eval(currentState.jsonData)).length} /> : null }
                            </Paper>
                        </Grid>
                    </Grid>
                </form>
            </Paper>              
        </>
        
    )
}

export default Editor