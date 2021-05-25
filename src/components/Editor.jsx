import React, {useState, useEffect } from 'react'
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
// import PageHeader from '../../components/PageHeader'
import { Grid, Button, Tooltip, Icon, Paper, makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import JSONFileRead from './JSONFileRead';
import JSONFileUpdate from './JSONFileUpdate';
import Tree from "./Tree";
import TreeUpdate from "./TreeUpdate";
import { CircularProgress } from "@material-ui/core";

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
        overflow: 'auto'
      },
    button: {
        margin: theme.spacing(1),
      },
    centerGridItem: {
        display: "grid",
        justifyContent: "center",
        alignContent: "center"
    }  
}))

function Editor({data,length,loading}) {
    
    const classes = useStyles();
    const [json, setJson] = React.useState([]);
    const [lengthJson, setJsonLength] = React.useState(0);
    const [forwardClicked, setForwardClicked] = React.useState(false);

    const handleUpdate = () => {        
        setJson(data);
        setJsonLength(data.length);
        setForwardClicked(true);
    }
    
    const handleClear = () => {        
        setJson(json);
        setJsonLength(length);
        setForwardClicked(false);
    }

    useEffect(() => {
        setJson([]);
        setJsonLength(0);
        setForwardClicked(false);
    }, [data]);

    return (
        <> 
            <Paper className={classes.pageContent}>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={5}>
                            <Paper className={classes.paper}>
                                {/* <JSONFileRead data={data} length={length}/> */}
                                {data.length > 0 ? <Tree data={data} length={length} /> : null }
                            </Paper>
                        </Grid>
                        <Grid item xs={2} className={classes.centerGridItem}>
                            <Tooltip title="Update the contents in the right panel">
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    className={classes.button}
                                    endIcon={<ArrowForwardIosIcon>send</ArrowForwardIosIcon>}
                                    onClick={handleUpdate}>
                                    Update
                                </Button>
                            </Tooltip>
                            <Tooltip title="Clear">
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        className={classes.button}
                                        endIcon={<ArrowForwardIosIcon>send</ArrowForwardIosIcon>}
                                        onClick={handleClear}>
                                        Clear
                                    </Button>
                            </Tooltip>
                        </Grid>
                        <Grid item xs={5}>
                            <Paper className={classes.paper}>
                                {/* <JSONFileUpdate></JSONFileUpdate> */}
                                {forwardClicked ? <TreeUpdate data={json} length={lengthJson} /> : null }
                            </Paper>
                        </Grid>
                    </Grid>
                </form>
            </Paper>              
        </>
        
    )
}

export default Editor