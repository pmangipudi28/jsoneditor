import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';

import { Grid, Paper, Badge, TextField, Typography, Collapse, List, ListItem, ListItemIcon, ListItemText, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';

import {fetch_json_request, fetch_json_success, fetch_json_failure, update_json} from '../actions'

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    padding: `0px ${theme.spacing(3)}px`,
  },
  listItem: {
    padding: 0,
  },
  listItemText: {
    flex: "0 1 auto",
  },
  body1: {
    fontWeight: "bold",
  },
  listIcon: {
    minWidth: "unset",
    color: "#ff6464",
  },
  paper: {    
    borderColor: "E7EFEB !important",
    backgroundColor: 'transparent'    
  },
  paper2: {    
    textAlign: 'center',
    backgroundColor: 'transparent'
  },
  bold: {
    fontWeight: 600
  },
}));

const ShowBrackets = ({ data, length }) => {
  const text = length > 1 ? "items" : "item";
  const brackets = Array.isArray(data) ? " [...]" : " {...}";
  return (
    <Typography component="span" variant="body2" color="textSecondary">
      {`${brackets} // ${length} ${text}`}
    </Typography>
  );
};

export function updateObject(obj, keys, value) {
  console.log("IN FUNCTION updateObject..................");
  console.log(obj);
  let key = keys.shift();
  // console.log(key);
  if (keys.length > 0) {
    // console.log("A1");
    let tmp = updateObject(obj[key], keys, value);
    return {...obj, [key]: tmp};
  } else {
    // console.log("A2");
    return {...obj, [key]: value};
  }
}

export default function TreeUpdate({
  data,
  length,
  parentName = "Root",
}) {
  
  const classes = useStyles();
  const currentState = useSelector(state => state.jsonReducer);
  
  
  const dispatch = useDispatch();
  
  const [open, setOpen] = React.useState(false);
  const [json, setJson] = React.useState([]);
  const [updatedJSON, setUpdatedJSON] = React.useState([]);
  const [jsonLength, setJsonLength] = React.useState([]);

  const [updatedJson, setUpdatedJson] = React.useState([]);
  
  const handleClick = () => {
    setOpen(!open);
  };

  const handleChange = (event) => {
    // console.log("Before Update......");
    // dispatch(update_json(event.target.id, event.target.value));
    // console.log("After Update......");  
    
    // console.log(json);
    
    // setJson({...json, 
    //       jsonData: {
    //           [event.target.id]: event.target.value
    //   }});

    // setJson({     
    //   ...json,
    //   [event.target.id]: event.target.value
    // });

    // setJson({
    //   json: {
    //     ...json,
    //     [event.target.id]: {           
    //       [event.target.id]: event.target.value
    //     }  
    //   }
    // });

    setJson(updateObject(json, event.target.name.split('.'), event.target.value));
    
    
  }

  // This is to set Redux Store JSON into a React Hooks Json Object
  useEffect(() => {
    setJson(data);
    setJsonLength(length);
  }, [data]);

  // useEffect(() => {  
  //  console.log("......Updated JSON......");
  //  console.log(json);
  // }, [json]);

  return (
    <>

      {json && (
        <ListItem
          button
          onClick={handleClick}
          classes={{ root: classes.listItem }}
        >
          <ListItemIcon
            key={Math.random() * 10}
            classes={{ root: classes.listIcon }}
          >
            {open ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
          </ListItemIcon>
          <ListItemText key={Math.random() * 10}>
            <b>{parentName} </b>
            {!open && <ShowBrackets data={json} length={jsonLength} />}
          </ListItemText>
        </ListItem>
      )}
      <Collapse
        in={open}
        timeout="auto"
        unmountOnExit
        style={{ paddingLeft: "30px" }}
      >
        <List component="div" style={{ padding: 0 }}>
          {json &&
            Object.keys(json).map((k, i) => {
              return json[k] != null && typeof json[k] === "object" ? (
                <TreeUpdate
                  key={Math.random()}
                  data={json[k]}
                  parentName={Array.isArray(json) ? "" : k}
                  length={Object.keys(json[k]).length}
                />
              ) : (
                <>
                <Grid container spacing={2}>
                  <ListItem button className={classes.nested}>
                    {!Array.isArray(json) ? (
                        <>
                        <Grid item xs={3}>                          
                            <ListItemText classes={{ root: classes.listItemText }}>
                              {k}
                            </ListItemText>
                        </Grid>
                        <Grid item xs={2} justify='center'>
                          <Typography variant="inherit" className={classes.bold}>:</Typography>
                        </Grid>
                        </>
                    ) : (
                      ""
                    )}
                      <Grid item xs={7}>                          
                          <ListItemText>
                            {json[k] === null ? "null" : <TextField name={k} defaultValue={json[k].toString() || ''} onChange={handleChange} /> }                            
                          </ListItemText>
                      </Grid>
                  </ListItem>
                  </Grid>
                </>
              );
            })}
        </List>
      </Collapse>
    </>
  );
}