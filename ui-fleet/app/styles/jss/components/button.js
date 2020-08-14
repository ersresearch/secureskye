import { colorID, breakpoint, textStyle } from '../common';

const button = () => ({
  button: {
    width: '144px',
    height: '48px',
    borderRadius: '6px',
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
    [breakpoint.small]: {
      width: '96px',
      height: '32px',
    },
    [breakpoint.medium]: {
      width: '96px',
      height: '32px',
    },
    [breakpoint.large]: {
      width: '120px',
      height: '40px',
    },
  },
  labelButton: {
    ...textStyle.text2,
    color: 'inherit',
    textTransform: 'capitalize',
  },
  primary: {
    backgroundColor: colorID.red1,
    color: colorID.white,
    '&:hover': {
      backgroundColor: '#BF000F',
      boxShadow: '0px 0px 2px 5px rgba(187, 37, 37, 0.38)',
    },
  },
  secondary: {
    backgroundColor: colorID.white,
    color: colorID.black,
    '&:hover': {
      backgroundColor: '#b9b3b4',
      boxShadow: '0px 0px 2px 5px rgba(173, 168, 168, 0.42)',
    },
  },
});

export default button;
