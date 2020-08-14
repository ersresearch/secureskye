/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:25:38 
 * @Last Modified by: DanND1
 * @Last Modified time: 2018-12-10 15:14:03
 */
import { colorID, textStyle, breakpoint } from 'styles/jss/common';

const carInfoChart = () => ({
  container: {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  topChart: {
    height: '72%',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  chartContent: {
    width: '48%',
    height: '100%',
    display: 'flex',
    alignItems: 'flex-end',
  },
  bottomChart: {
    display: 'flex',
    width: '100%',
    height: '20%',
  },
  speedometerChart: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '75%',
    height: '100%',
  },
  veticalBarChart: {
    position: 'relative',
    height: '65%',
    width: '25%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 4% 0 4%',
  },
  mileageInfo: {
    width: '66%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
  },
  gearInfo: {
    width: '32%',
    marginLeft: '2%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  gearDetail: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  gearNumber: {
    ...textStyle.text1,
    textAlign: 'center',
    height: '30px',
    width: '30px',
    color: colorID.white,
    borderBottom: '1px solid white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gearChange: {
    ...textStyle.text1,
    textAlign: 'center',
    height: '30px',
    width: '30px',
    color: colorID.black,
    backgroundColor: colorID.white,
  },
  mileageDetail: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
  },
  mileageWrap: {
    position: 'relative',
    width: '40%',
    borderBottom: '1px solid white',
  },
  mileageTitle: {
    ...textStyle.text3,
    left: '0px',
    bottom: '1px',
    color: colorID.white,
  },
  mileageNumber: {
    ...textStyle.text3,
    color: colorID.white,
    position: 'absolute',
    bottom: 0,
    right: '17%',
    [breakpoint.small]: {
      right: '25%',
    },
    [breakpoint.medium]: {
      right: '25%',
    },
  },
  mileageUnit: {
    position: 'absolute',
    ...textStyle.text3,
    color: '#ffffff',
    right: 0,
    bottom: 0,
  },
  meterInfo: {
    position: 'relative',
    color: 'white',
    width: '50%',
    marginTop: '-30px',
    textAlign: 'center',
    borderBottom: '1px solid white',
  },
  meterNumber: {
    ...textStyle.text1,
    color: colorID.white,
  },
  meterUnit: {
    right: '0px',
    position: 'absolute',
    bottom: '3px',
    ...textStyle.text5,
    color: '#ffffff',
  },
  fuel: {
    margin: 'auto',
  },
  engine: {
    margin: 'auto',
  },
  arrow: {
    [breakpoint.small]: {
      height: '6px',
    },
    [breakpoint.medium]: {
      height: '6px',
    },
    [breakpoint.large]: {
      height: '8px',
    },
  },
  meter: {
    height: '73px',
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
  meterBarInfo: {
    width: '100%',
    borderBottom: '1px solid #FFFF',
    textAlign: 'center',
    position: 'relative',
  },
  overlay: {
    width: 'calc(100% + 8px)',
    height: 'calc(100% + 8px)',
    borderRadius: '8px',
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: '1',
    cursor: 'pointer',
    position: 'absolute',
    marginTop: '-5px',
  },
  overlayWrapper: {
    width: '100%',
    height: '100%',
    borderRadius: '8px',
    backgroundColor: 'rgba(0,0,0,0.8)',
    zIndex: '1',
    cursor: 'pointer',
  },
  textOverlay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    fontSize: '30px',
    color: colorID.white,
    transform: 'translate(-50%,-50%)',
    [breakpoint.small]: {
      fontSize: '22px',
    },
    [breakpoint.medium]: {
      fontSize: '22px',
    },
    [breakpoint.large]: {
      fontSize: '26px',
    },
  },
  textWrapperOverlay: {
    position: 'relative',
    top: '50%',
    left: '50%',
    textAlign: 'center',
    fontSize: '30px',
    color: colorID.white,
    transform: 'translate(-50%,-50%)',
  },
  unitMax: {
    fontSize: '11px',
    color: '#FFFFFF',
    position: 'absolute',
    top: '-20%',
    right: '-90%',
  },
  unitMin: {
    fontSize: '11px',
    color: '#FFFFFF',
    position: 'absolute',
    bottom: '-20%',
    right: '-90%',
  },
});

export default carInfoChart;
