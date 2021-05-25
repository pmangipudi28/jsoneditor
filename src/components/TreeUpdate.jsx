import React from "react";
import { Grid, Paper, Typography, TextField, Collapse, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ChevronRight from "@material-ui/icons/ChevronRight";

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
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  

  return (
    <>
      {data && (
        <ListItem
          button
          onClick={handleClick}
          classes={{ root: classes.listItem }}
        >
          <ListItemIcon
            key={Math.random() * 10}
            classes={{ root: classes.listIcon }}
          >
            {open ? <ExpandMore /> : <ChevronRight />}
          </ListItemIcon>
          <ListItemText key={Math.random() * 10}>
            <b>{parentName} </b>
            {!open && <ShowBrackets data={data} length={length} />}
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
          {data &&
            Object.keys(data).map((k, i) => {
              return data[k] != null && typeof data[k] === "object" ? (
                <TreeUpdate 
                  key={Math.random()}
                  data={data[k]}
                  parentName={Array.isArray(data) ? "" : k}
                  length={Object.keys(data[k]).length}
                />
              ) : (
                <>
                <Grid container spacing={2}>
                  <ListItem button className={classes.nested}>
                    {!Array.isArray(data) ? (
                        <>
                        <Grid item xs={2}>                          
                            <ListItemText classes={{ root: classes.listItemText }}>
                              {k}
                            </ListItemText>
                        </Grid>
                        <Grid item xs={1} justify='center'>
                            :
                        </Grid>
                        </>
                    ) : (
                      ""
                    )}
                      <Grid item xs={9}>                          
                          <ListItemText>
                          {data[k] === null ? "null" : <TextField  defaultValue={data[k].toString()} />}
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
