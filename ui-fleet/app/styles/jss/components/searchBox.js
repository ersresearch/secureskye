import { colorID, textStyle, breakpoint } from '../common';
const searchBox = () => ({
  textError: {
    ...textStyle.text6,
    color: colorID.red1,
    [breakpoint.large]: {
      fontSize: '14px',
    },
    [breakpoint.medium]: {
      fontSize: '11px',
    },
    [breakpoint.small]: {
      fontSize: '11px',
    },
  },
});

export default searchBox;
