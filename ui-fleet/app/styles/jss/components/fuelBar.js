import { breakpoint } from '../common';

const fuelBar = {
  fuelBar: {
    position: 'relative',
  },
  fuel: {
    backgroundColor: 'transparent',
    border: '1px solid #FFFFFF',
    width: '16px',
    height: '73px',
    display: 'flex',
    alignItems: 'flex-end',
    position: 'relative',
    [breakpoint.small]: {
      height: '48px',
    },
    [breakpoint.medium]: {
      height: '48px',
    },
    [breakpoint.large]: {
      height: '64px',
    },
  },
  fuelValue: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    transition: '1s linear',
    transitionProperty: 'height',
  },
};

export default fuelBar;
