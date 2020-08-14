import { breakpoint } from '../common';

const vehicleInfoManagement = () => ({
  wrapper: {
    background: '#575757',
    width: '22%',
    height: '100%',
    flexDirection: 'column',
  },
  wrapperIcon: {
    color: '#535353',
    width: '200px',
    margin: '30px 0 0 -100px',
    [breakpoint.small]: {
      width: '100px',
      margin: '30px 0 0 -50px',
    },
    [breakpoint.medium]: {
      width: '100px',
      margin: '30px 0 0 -50px',
    },
    [breakpoint.large]: {
      width: '200px',
      margin: '30px 0 0 -100px',
    },
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
  },
  imgCar: {
    position: 'relative',
    width: '74.4%',
    height: '19%',
    marginTop: '23%',
    objectFit: 'contain',
  },
  uploadImage: {
    position: 'relative',
    textAlign: 'center',
    height: '805px',
    flexDirection: 'column',
    [breakpoint.small]: {
      height: '535px',
    },
    [breakpoint.medium]: {
      height: '535px',
    },
    [breakpoint.large]: {
      height: '710px',
    },
  },
  updateBtnWrapper: {
    position: 'relative',
    top: '2.5%',
    left: '-16%',
  },
  btnUpload: {
    fontWeight: 'bold',
    textTransform: 'none',
    position: 'absolute',
    width: '34%',
    height: '48px',
    borderRadius: '6px',
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.3)',
    fontSize: '21px',
    [breakpoint.small]: {
      height: '33px',
      fontSize: '14px',
    },
    [breakpoint.medium]: {
      height: '33px',
      fontSize: '14px',
    },
    [breakpoint.large]: {
      height: '44px',
      fontSize: '18px',
    },
  },
  chooseImg: {
    position: 'absolute',
    width: '34%',
    height: '40px',
    top: '0',
    left: '50%',
    opacity: '0',
  },
  notChooseImg: {
    position: 'relative',
    width: '74.4%',
    height: '19%',
    margin: 'auto',
    backgroundColor: '#ffffff',
    marginTop: '23%',
  },
  txtChooseImg: {
    position: 'absolute',
    fontSize: '16px',
    transform: 'translate(-50%,50%)',
    [breakpoint.small]: {
      fontSize: '12px',
    },
    [breakpoint.medium]: {
      fontSize: '12px',
    },
    [breakpoint.large]: {
      fontSize: '14px',
    },
  },
  iconFile: {
    marginLeft: '70px',
    [breakpoint.small]: {
      marginLeft: '40px',
    },
    [breakpoint.medium]: {
      marginLeft: '40px',
    },
    [breakpoint.large]: {
      marginLeft: '70px',
    },
    width: '30%',
    height: '30%',
  },
});

export default vehicleInfoManagement;
