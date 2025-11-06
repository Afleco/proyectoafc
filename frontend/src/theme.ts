import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00fff6',
    },
    secondary: {
      main: '#ff3ef9',
    },
    warning: {
      main: '#feff1c',
    },
    info: {
      main: '#3ac1ff',
    },
    success: {
      main: '#7eff84',
    },
    error: {
      main: '#ff877e',
    },
  },
  typography: {
    fontFamily: 'Droid Sans, Roboto',
  },
});

export default theme;