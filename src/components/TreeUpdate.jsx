import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import { useImmer } from 'use-immer';
import { simplify, desimplify } from 'simplifr';

import { Grid, Paper, Badge, TextField, Typography, Collapse, List, ListItem, ListItemIcon, ListItemText, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ChevronRight from "@material-ui/icons/ChevronRight";
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';

import {update_json} from '../updateActions'

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
    paddingRight: '50px'
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


export default function TreeUpdate({
  data,
  length,
  parentName = "Root",
}) {
  
  const classes = useStyles();
  const currentState = useSelector(state => state.jsonReducer);

  const dispatch = useDispatch();
  
  const [open, setOpen] = React.useState(false);
  const [json, setJson] = useImmer(simplify(data));
  const [updatedJSON, setUpdatedJSON] = useImmer(data);
  const [jsonLength, setJsonLength] = useImmer(length);

  const [openChild, setOpenChild] = React.useState(false);
  
  const handleClick = () => {
    setOpen(!open);
  };

  const handleChildClick = () => {
    setOpenChild(!openChild);
  };

  const handleChange = (event) => {

    const name = event.target.name;
    const value = event.target.value;

    setJson(draft => {
      draft.[name]= value;
    });
    
  } 

  useEffect(() => {
    console.log(json);

    console.log(desimplify(json));
  });

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
                        // <TreeUpdate
                        //   key={Math.random()}
                        //   data={json[k]}
                        //   parentName={Array.isArray(json) ? "" : k}
                        //   length={Object.keys(json[k]).length}
                        // />
                        <>
                        {k.toString().replace("root.", "").substr(k.toString().replace("root.", "").lastIndexOf(".")+1) != 'root' &&
                          <ListItem
                              button
                              onClick={handleChildClick}
                              classes={{ root: classes.listItem }}
                            >
                              <ListItemIcon
                                key={Math.random() * 10}
                                classes={{ root: classes.listIcon }}
                              >
                                <ArrowDropDownIcon />
                              </ListItemIcon>
                              <ListItemText key={Math.random() * 10} classes={{ root: classes.listItemText }}>
                                <b>{Array.isArray(json) ? "" : isNaN(k.toString().replace("root.", "").substr(k.toString().replace("root.", "").lastIndexOf(".") + 1)) ? k.toString().replace("root.", "").substr(k.toString().replace("root.", "").lastIndexOf(".") + 1): "" } </b>
                                {/* {!openChild && <ShowBrackets data={json} length={jsonLength} />} */}
                              </ListItemText>
                            </ListItem>
                        }
                        </>
                      ) : (
                        <>
                        
                        <Grid container spacing={2}>
                          <ListItem button className={classes.nested}>
                            {!Array.isArray(json) ? (
                                <>
                                <Grid item xs={3}>                          
                                    <ListItemText classes={{ root: classes.listItemText }}>
                                      {k.toString().replace("root.", "").substr(k.toString().replace("root.", "").lastIndexOf(".")+1)}
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
                                {json[k] === null ? "null" :                         
                                    <ListItemText>
                                      {json[k].toString().length < 30 ? 
                                          <TextField name={k} fullWidth  defaultValue={json[k].toString() || ''}  onChange={handleChange} /> : 
                                          <TextField name={k} fullWidth  defaultValue={json[k].toString() || ''} multiline rows={2} onChange={handleChange} />
                                          }
                                    </ListItemText>
                                }
                              </Grid>
                          </ListItem>
                          </Grid>
                        </>
                      );
                    }
            
            )}
        </List>
        
      </Collapse>
    </>
  );
}