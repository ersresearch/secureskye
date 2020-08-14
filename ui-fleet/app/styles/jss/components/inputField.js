import { breakpoint, textStyle, colorID } from '../common';

const inputField = () => ({
  wrapInput: {
    '& input': {
      textIndent: '16px',
      [breakpoint.large]: {
        textIndent: '14px',
      },
      [breakpoint.medium]: {
        textIndent: '11px',
      },
      [breakpoint.small]: {
        textIndent: '11px',
      },
    },
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  error: {
    position: 'absolute',
    lineHeight: 'normal',
    left: 0,
    bottom: '-24px',
    [breakpoint.large]: {
      bottom: '-20px',
    },
    [breakpoint.medium]: {
      bottom: '-19px',
    },
    [breakpoint.small]: {
      bottom: '-19px',
    },
  },
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
  txtInput: {
    fontWeight: 600,
    ...textStyle.text2,
    '&:disabled': {
      cursor: 'not-allowed',
      backgroundColor: '#e5e5e5',
    },
    '&::placeholder': {
      ...textStyle.text3,
      color: '#bebebe',
      fontWeight: 100,
    },
    boxShadow: '0 2px 2px 0 rgba(13, 2, 2, 0.2)',
    borderRadius: '6px',
    border: 'solid 1px #f2f2f2',
    width: '100%',
    height: '100%',
    outline: 'none',
  },
});

export default inputField;
