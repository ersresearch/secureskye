/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:25:44 
 * @Last Modified by: DanND1
 * @Last Modified time: 2018-12-10 15:10:03
 */
import { colorID, textStyle, breakpoint } from '../common';

const riskCurrentGauge = () => ({
  riskLevelWrapper: {
    margin: '22px 50px 0 46px',
    display: 'flex',
    [breakpoint.small]: {
      margin: '15px 33px 0 31px',
    },
    [breakpoint.medium]: {
      margin: '15px 33px 0 31px',
    },
    [breakpoint.large]: {
      margin: '19px 44px 0 40px',
    },
  },
  riskLevelGauges: {
    display: 'flex',
    flexDirection: 'column',
  },
  riskLevel_info_gauge: {
    margin: '-40px auto 0',
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    // [breakpoint.small]: {
    //   left: '24%',
    //   width: '50%',
    //   marginTop: '-7%',
    // },
    // [breakpoint.medium]: {
    //   left: '23%',
    //   width: '50%',
    //   marginTop: '-12%',
    // },
    // [breakpoint.large]: {
    //   left: '25%',
    //   width: '45%',
    //   marginTop: '-12%',
    // },
  },
  lowhigh: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  gauge_low: {
    color: colorID.black,
    fontSize: '23px',
    fontFamily: 'Helvetica_Medium',
    [breakpoint.small]: {
      fontSize: '15px',
    },
    [breakpoint.medium]: {
      fontSize: '15px',
    },
    [breakpoint.large]: {
      fontSize: '20px',
    },
  },
  gauge_high: {
    color: colorID.red1,
    fontSize: '23px',
    fontFamily: 'Helvetica_Medium',
    [breakpoint.small]: {
      fontSize: '15px',
    },
    [breakpoint.medium]: {
      fontSize: '15px',
    },
    [breakpoint.large]: {
      fontSize: '20px',
    },
  },
  gauge_level: {
    margin: 'auto',
    width: '50%',
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '2px solid black',
    // [breakpoint.small]: {
    //   width: '61%',
    //   marginLeft: '13%',
    // },
    // [breakpoint.medium]: {
    //   width: '90%',
    //   marginLeft: '13%',
    // },
    // [breakpoint.large]: {
    //   width: '80%',
    //   marginLeft: '14%',
    // },
  },
  levelTitle: {
    ...textStyle.text5,
  },
  level_info: {
    ...textStyle.text1,
    lineHeight: 'normal',
  },
});
export default riskCurrentGauge;
