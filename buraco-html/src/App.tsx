import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import GeneralSetup from './GeneralSetup';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#45a173',
      light: '#77d3a2',
      dark: '#027247',
      contrastText: '#000000'
    },
    secondary: {
      main: '#f44330',
      light: '#ff795b',
      dark: '#b90005',
      contrastText: '#000000'
    },
  },
  typography: {
    fontFamily: [
      'card-characters',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  }
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GeneralSetup />
    </ThemeProvider>
  );
}
