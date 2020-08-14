import { breakpoint, colorID, textStyle } from '../common';

const menuTabs = () => ({
  root: {
    width: '100%',
    borderRadius: 0,
    display: 'flex',
  },
  buttonBack: {
    padding: 0,
    height: '100%',
    margin: ' 0 10px',
    paddingRight: '15px',
    textTransform: 'inherit',
    ...textStyle.text4,
    color: colorID.gray4,
  },
  backIncon: {
    [breakpoint.small]: {
      height: '25px',
    },
    [breakpoint.medium]: {
      height: '25px',
    },
    [breakpoint.large]: {
      height: '40px',
    },
  },
  tabsRoot: {
    height: '60px',
    minHeight: 'unset',
    margin: 'auto',
    [breakpoint.small]: {
      height: '40px',
    },
    [breakpoint.medium]: {
      height: '40px',
    },
    [breakpoint.large]: {
      height: '52px',
    },
  },
  flexContainer: {
    height: '100%',
  },
  tabRoot: {
    minHeight: 'unset',
    minWidth: 0,
    width: '210px',
    '&:last-child $wrapper': {
      borderRight: `1px solid ${colorID.gray3}`,
    },
    [breakpoint.small]: {
      width: '140px',
    },
    [breakpoint.medium]: {
      width: '140px',
    },
    [breakpoint.large]: {
      width: '184px',
    },
  },
  wrapper: {
    textTransform: 'capitalize',
    borderLeft: `1px solid ${colorID.gray3}`,
  },
  label: {
    ...textStyle.text4,
    color: 'inherit',
  },
  textColorSecondary: {
    color: '#1c1c1c',
  },
});

export default menuTabs;
