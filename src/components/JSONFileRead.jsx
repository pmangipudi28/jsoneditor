import React, {useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import { uuid } from "uuidv4";

import Tree from '@naisutech/react-tree'
import MuiTreeView from 'material-ui-treeview';
import { Typography } from '@material-ui/core';

const tree = [
  {
    value: 'Parent A',
    nodes: [{ value: 'Child A' }, { value: 'Child B' }],
  },
  {
    value: 'Parent B',
    nodes: [
      {
        value: 'Child C',
      },
      {
        value: 'Parent C',
        nodes: [
          { value: 'Child D' },
          { value: 'Child E' },
          { value: 'Child F' },
        ],
      },
    ],
  },
];



const useStyles = makeStyles({
    root: {
      height: 240,
      flexGrow: 1,
      width:0,
      maxWidth: 400,
    },
});

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

function JSONFileRead({data, length}) {
    const classes = useStyles();
   
    return (
        <>
          {/* <DataTreeView treeItems={data} />  */}
          <MuiTreeView tree={data} />
        </>
    );
}

export default JSONFileRead
