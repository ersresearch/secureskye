import { textStyle, breakpoint } from '../common';

const securityButton = () => ({
  button: {
    width: '85px',
    height: '37px',
    borderRadius: '50px',
    border: '2px solid',
    outline: 'none',
    [breakpoint.small]: {
      width: '57px',
      height: '25px',
    },
    [breakpoint.medium]: {
      width: '57px',
      height: '25px',
    },
    [breakpoint.large]: {
      width: '74px',
      height: '32px',
    },
  },
  buttonOff: {
    ...textStyle.text2,
    color: '#E61E26',
  },
  buttonOn: {
    ...textStyle.text2,
    color: '#006400',
  },
});

export default securityButton;
