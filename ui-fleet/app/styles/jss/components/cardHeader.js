import { colorID, textStyle, breakpoint } from 'styles/jss/common';

const cardHeader = () => ({
  cardHeader: {
    background: `linear-gradient(${colorID.red1}, ${colorID.red2})`,
    textAlign: 'center',
    borderBottom: '2px solid #9D000C',
    height: '50px',
    [breakpoint.small]: {
      height: '33px',
    },
    [breakpoint.medium]: {
      height: '33px',
    },
    [breakpoint.large]: {
      height: '44px',
    },
  },
  title: {
    ...textStyle.title1,
    paddingLeft: '8px',
  },
  headerIcon: {
    [breakpoint.small]: {
      width: '20px',
    },
    [breakpoint.medium]: {
      width: '20px',
    },
    [breakpoint.large]: {
      width: '26px',
    },
  },
});

export default cardHeader;
