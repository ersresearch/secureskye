import { breakpoint, textStyle, colorID } from 'styles/jss/common';

const totalVehicleChart = () => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  totalChartWrapper: {
    display: 'flex',
    flex: 1,
    marginTop: '30px',
    [breakpoint.small]: {
      marginTop: '20px',
    },
    [breakpoint.medium]: {
      marginTop: '20px',
    },
    [breakpoint.large]: {
      marginTop: '26px',
    },
  },
  totalChart: {
    marginLeft: '50px',
    position: 'relative',
    [breakpoint.small]: {
      marginLeft: '33px',
    },
    [breakpoint.medium]: {
      marginLeft: '33px',
    },
    [breakpoint.large]: {
      marginLeft: '44px',
    },
  },
  doughnutSummary: {
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
    left: '50%',
    top: '40%',
    [breakpoint.small]: {
      top: '43%',
    },
    [breakpoint.medium]: {
      top: '43%',
    },
    [breakpoint.large]: {
      top: '40%',
    },
  },
  doughnutSummaryTitle: {
    ...textStyle.text5,
  },
  doughnutSummaryNumber: {
    ...textStyle.title1,
    color: colorID.black,
    wordBreak: 'break-word',
  },
  totalDetailWrapper: {
    width: '100%',
    marginLeft: '35px',
    [breakpoint.small]: {
      marginLeft: '23px',
    },
    [breakpoint.medium]: {
      marginLeft: '23px',
    },
    [breakpoint.large]: {
      marginLeft: '30px',
    },
  },
  legend: {},
  connectedLegend: {
    display: 'flex',
    '& $lengendColor': {
      backgroundColor: '#15CD00',
    },
  },
  disconnectedLegend: {
    display: 'flex',
    '& $lengendColor': {
      backgroundColor: colorID.gray3,
    },
  },
  lengendColor: {
    margin: 'auto 10px auto 0',
    width: '28px',
    height: '6px',
    [breakpoint.small]: {
      marginRight: '6px',
      width: '18px',
      height: '4px',
    },
    [breakpoint.medium]: {
      marginRight: '6px',
      width: '18px',
      height: '4px',
    },
    [breakpoint.large]: {
      marginRight: '8px',
      width: '24px',
      height: '5px',
    },
  },
  legendTitle: {
    ...textStyle.info,
  },
  totalDetail: {
    marginTop: '65px',
    [breakpoint.small]: {
      marginTop: '43px',
    },
    [breakpoint.medium]: {
      marginTop: '43px',
    },
    [breakpoint.large]: {
      marginTop: '57px',
    },
  },
  wrapTotal: {
    display: 'flex',
    borderBottom: `1px solid ${colorID.black}`,
    justifyContent: 'space-between',
    marginBottom: '28px',
    [breakpoint.small]: {
      marginBottom: '18px',
    },
    [breakpoint.medium]: {
      marginBottom: '18px',
    },
    [breakpoint.large]: {
      marginBottom: '24px',
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
  total: {
    borderBottom: `2px solid ${colorID.black}`,
  },
  connected: {
    opacity: 0.7,
    '& $title': {
      color: '#18CC00',
    },
    '& $data': {
      color: '#18CC00',
    },
  },
  disconnected: {
    opacity: 0.7,
    '& $title': {
      color: colorID.gray3,
    },
    '& $data': {
      color: colorID.gray3,
    },
  },
  title: {
    ...textStyle.text5,
    lineHeight: 'normal',
    margin: 'auto 0',
  },
  data: {
    ...textStyle.text1,
    lineHeight: 'normal',
  },
});

export default totalVehicleChart;
