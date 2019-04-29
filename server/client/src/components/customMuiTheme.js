import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import Button from '@material-ui/core/Button';

export const theme = createMuiTheme({
  	palette: {
    	primary: { main: purple[500] }, // Purple and green play nicely together.
    	secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
  	},
  	typography: { useNextVariants: true },
});
