import { createMuiTheme } from '@material-ui/core'

export const theme = createMuiTheme({
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