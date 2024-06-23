import { createTheme } from '@mui/material/styles';
import { pink } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      main: pink[500],
    },
    secondary: {
      main: pink[300],
    },
    background: {
      default: '#fff5f7',
      paper: '#ffe4e9',
    },
    text: {
      primary: '#000000',
      secondary: '#5f5f5f',
    },
  },
});

export default theme;
