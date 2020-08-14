import { colorID, textStyle } from 'styles/jss/common';

const PanelTitleStyle = () => ({
  root1: {
    borderLeft: `4px solid ${colorID.red1}`,
    paddingLeft: '20px',
    lineHeight: 'normal',
  },
  title1: textStyle.title1,
  root2: {
    borderLeft: `4px solid ${colorID.red1}`,
    paddingLeft: '10px',
    lineHeight: 'normal',
  },
  title2: textStyle.title2,
  root3: {
    borderLeft: `4px solid ${colorID.red1}`,
    paddingLeft: '10px',
    lineHeight: 'normal',
  },
  title3: textStyle.title3,
  root4: {
    borderLeft: `4px solid ${colorID.red1}`,
    paddingLeft: '12px',
    lineHeight: 'normal',
  },
  title4: textStyle.title4,
});

export default PanelTitleStyle;
