import { breakpoint } from '../common';

const ota = () => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    flex: '1',
    minHeight: '0',
  },
  panels: {
    width: '100%',
    height: '95%',
    padding: '30px',
    display: 'flex',
    minHeight: '0',
    flexDirection: 'column',
    [breakpoint.large]: {
      padding: '26px',
    },
    [breakpoint.medium]: {
      padding: '20px',
    },
    [breakpoint.small]: {
      padding: '20px',
    },
  },
  cardContent: {
    flex: 1,
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    minHeight: 0,
    '&:last-child': {
      paddingBottom: 0,
    },
    padding: '0',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
});

export default ota;
