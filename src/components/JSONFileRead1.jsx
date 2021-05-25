import React, {useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { uuid } from "uuidv4";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ChevronRight from "@material-ui/icons/ChevronRight";
import { Typography } from "@material-ui/core";

const seasons = [
    {
      id: uuid(),
      name: "Seasons",
      children: [
        {
          id: uuid(),
          name: "Summer",
          children: [
            {
              id: uuid(),
              name: "June"
            },
            {
              id: uuid(),
              name: "July"
            },
            {
              id: uuid(),
              name: "August"
            }
          ]
        },
        {
          id: uuid(),
          name: "Fall",
          children: [
            {
              id: uuid(),
              name: "September"
            },
            {
              id: uuid(),
              name: "October"
            },
            {
              id: uuid(),
              name: "November"
            }
          ]
        },
        {
          id: uuid(),
          name: "Winter",
          children: [
            {
              id: uuid(),
              name: "December"
            },
            {
              id: uuid(),
              name: "January"
            },
            {
              id: uuid(),
              name: "February"
            }
          ]
        },
        {
          id: uuid(),
          name: "Spring",
          children: [
            {
              id: uuid(),
              name: "March"
            },
            {
              id: uuid(),
              name: "April"
            },
            {
              id: uuid(),
              name: "May"
            }
          ]
        }
      ]
    }
  ];

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
  }));

const DataTreeView = ({ treeItems }) => {
    const classes = useStyles();
    return (
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        className={classes.root}
      >
        {getTreeItemsFromData(treeItems)}
      </TreeView>
    );
  };

  const getTreeItemsFromData = treeItems => {
    return treeItems.map(treeItemData => {
      let children = undefined;
      if (treeItemData.children && treeItemData.children.length > 0) {
        children = getTreeItemsFromData(treeItemData.children);
      }
      return (
        <TreeItem
          key={treeItemData.id}
          nodeId={treeItemData.id}
          label={treeItemData.name}
          children={children}
        />
      );
    });
  };


  const ShowBrackets = ({ data, length }) => {
    const text = length > 1 ? "items" : "item";
    const brackets = Array.isArray(data) ? " [...]" : " {...}";
    return (
      <Typography component="span" variant="body2" color="textSecondary">
        {`${brackets} // ${length} ${text}`}
      </Typography>
    );
  };

function JSONFileRead(props) {
    const classes = useStyles();
    const [data, setData] = React.useState([{}]);
    const parentName = "Root";
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
      setOpen(!open);
    };
    
    useEffect(() => {               
      setData(props.jsonFile)
    }, [props.jsonFile]);   

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
                  {/* {!open && <ShowBrackets data={data} length={data.length} />} */}
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
                      <JSONFileRead
                        key={Math.random()}
                        data={data[k]}
                        parentName={Array.isArray(data) ? "" : k}
                        length={Object.keys(data[k]).length}
                      />
                    ) : (
                      <>
                        <ListItem button className={classes.nested}>
                          {!Array.isArray(data) ? (
                            <ListItemText classes={{ root: classes.listItemText }}>
                              {k} :
                            </ListItemText>
                          ) : (
                            ""
                          )}
                          <ListItemText>
                            {data[k] === null ? "null" : data[k].toString()}
                          </ListItemText>
                        </ListItem>
                      </>
                    );
                  })}
              </List>
            </Collapse>
        </>
      
    );
}

export default JSONFileRead
