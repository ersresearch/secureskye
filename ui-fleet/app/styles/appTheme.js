import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#1C1C1C',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contast with palette.primary.main
    },
    secondary: {
      // light: '#0066ff',
      main: '#DD000F',
      // dark: will be calculated from palette.secondary.main,
      // contrastText: '#ffcc00',
    },
    panelBackground: {
      main: '#E8E8E8',
    },
    // error: will use the default color
  },
});

export default theme;
