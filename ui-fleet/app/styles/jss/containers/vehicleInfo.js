import { textStyle, colorID, breakpoint } from '../common';

const vehicleInfo = () => ({
  card: {
    backgroundImage: `linear-gradient(${colorID.gray3}, ${colorID.gray4})`,
    display: 'flex',
    height: '100%',
    borderRadius: '0',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-thumb': {
      borderRadius: '10px',
      boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.3)',
      backgroundColor: '#c1c1c1',
    },
    width: '22%',
  },
  cardContent: {
    marginTop: '18%',
    width: '100%',
    paddingLeft: '54px',
    paddingRight: '54px',
    '&:last-child': {
      paddingBottom: 0,
      paddingTop: 0,
    },
    [breakpoint.small]: {
      paddingLeft: '36px',
      paddingRight: '36px',
    },
    [breakpoint.medium]: {
      paddingLeft: '36px',
      paddingRight: '36px',
    },
    [breakpoint.large]: {
      paddingLeft: '47px',
      paddingRight: '47px',
    },
  },
  textLeft: {
    ...textStyle.text3,
    color: colorID.white,
    fontFamily: 'sans-serif',
  },
  textRight: {
    ...textStyle.text2,
    color: colorID.white,
    wordWrap: 'break-word',
  },
  colLeft: {
    width: '120px',
    [breakpoint.small]: {
      width: '100px',
    },
    [breakpoint.medium]: {
      width: '100px',
    },
    [breakpoint.large]: {
      width: '110px',
    },
  },
  colRight: {
    width: 'calc(100% - 120px)',
    [breakpoint.small]: {
      width: 'calc(100% - 100px)',
    },
    [breakpoint.medium]: {
      width: 'calc(100% - 100px)',
    },
    [breakpoint.large]: {
      width: 'calc(100% - 110px)',
    },
  },
  info: {
    display: 'flex',
    padding: '20px 0',
    borderBottom: '1px solid #E3E3E3',
    [breakpoint.small]: {
      padding: '13px 0',
    },
    [breakpoint.medium]: {
      padding: '13px 0',
    },
    [breakpoint.large]: {
      padding: '18px 0',
    },
  },
  imgCar: {
    objectFit: 'contain',
    width: '100%',
    height: '200px',
    [breakpoint.small]: {
      height: '130px',
    },
    [breakpoint.medium]: {
      height: '130px',
    },
    [breakpoint.large]: {
      height: '180px',
    },
  },
  wrapColor: {
    width: '26px',
    height: '26px',
    [breakpoint.large]: {
      width: '23px',
      height: '23px',
    },
    [breakpoint.medium]: {
      width: '17px',
      height: '17px',
    },
    [breakpoint.small]: {
      width: '17px',
      height: '17px',
    },
  },
  colorInfo: {
    width: '100%',
    height: '100%',
    borderRadius: '4px',
  },
  notChooseImg: {
    position: 'relative',
    width: '100%',
    height: '200px',
    display: 'flex',
    flexDirection: 'column',
    [breakpoint.small]: {
      height: '130px',
    },
    [breakpoint.medium]: {
      height: '130px',
    },
    [breakpoint.large]: {
      height: '180px',
    },
  },
  iconFile: {
    width: '50%',
    height: '80%',
    margin: 'auto',
  },
  txtImage: {
    height: '20%',
    margin: 'auto',
    ...textStyle.text3,
    color: colorID.white,
  },
});

export default vehicleInfo;
