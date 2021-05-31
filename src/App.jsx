import React from 'react';


import { withStyles, makeStyles, CssBaseline, createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from "@material-ui/styles";
import { theme } from "./themes/theme";
import Home from '../src/components/Home'



const useStyles = makeStyles({
  appMain : {
    paddingLeft: '0px',
    width: '100%',    
  }
})

function App() {
  
  const classes = useStyles();
 

  return (    
    <ThemeProvider theme={theme}>        
        <div className={classes.appMain}>
           <Home />
        </div>
        <CssBaseline />
    </ThemeProvider>
    
  );
}

export default App;
