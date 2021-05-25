import React from 'react';
import Home from '../src/components/Home'
import { withStyles, makeStyles, CssBaseline, createMuiTheme } from '@material-ui/core'
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#f4f5fd'
    },
    shape: {
      borderRadius: '12px'
    },
    overrides: {
      MuiApiBar: {
        root: {
          transform: 'translateZ(0)'
        }
      }
    }
  }
});

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
