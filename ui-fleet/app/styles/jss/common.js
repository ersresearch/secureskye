const colorID = {
  white: '#FFFFFF',
  black: '#1C1C1C',
  gray1: '#F2F2F2',
  gray2: '#BEBEBE',
  gray3: '#707070',
  gray4: '#535353',
  red1: '#E50012',
  red2: '#BF000F',
};

const breakpoint = {
  small: '@media (max-width: 1279px), (max-height: 719px)',
  medium:
    '@media (min-height: 720px) and (max-height: 899px), (min-width: 1280px) and (max-width: 1599px)',
  large:
    '@media (min-height: 900px) and (max-height: 1079px), (min-width: 1600px) and (max-width: 1919px)',
};

const fontSizeResponsive = size => ({
  fontSize: `${size}px`,
  [breakpoint.small]: {
    fontSize: `${size - 8}px`,
  },
  [breakpoint.medium]: {
    fontSize: `${size - 8}px`,
  },
  [breakpoint.large]: {
    fontSize: `${size - 4}px`,
  },
});

const textStyle = {
  title1: {
    ...fontSizeResponsive(24),
    color: colorID.white,
    fontFamily: 'Helvetica_Bold',
  },
  title2: {
    ...fontSizeResponsive(24),
    color: colorID.black,
    fontFamily: 'Helvetica_Bold',
  },
  title3: {
    ...fontSizeResponsive(22),
    color: colorID.white,
    fontFamily: 'Helvetica_Bold',
  },
  title4: {
    ...fontSizeResponsive(22),
    color: colorID.black,
    fontFamily: 'Helvetica_Bold',
  },
  text1: {
    ...fontSizeResponsive(24),
    color: colorID.black,
    fontFamily: 'Helvetica_Medium',
  },
  text2: {
    ...fontSizeResponsive(21),
    color: colorID.black,
    fontFamily: 'Helvetica_Bold',
  },
  text3: {
    ...fontSizeResponsive(21),
    color: colorID.red,
    fontFamily: 'Helvetica_Regular',
  },
  text4: {
    ...fontSizeResponsive(19),
    color: colorID.black,
    fontFamily: 'Helvetica_Bold',
  },
  text5: {
    ...fontSizeResponsive(18),
    color: colorID.black,
    fontFamily: 'Helvetica_Medium',
  },
  text6: {
    ...fontSizeResponsive(16),
    color: colorID.black,
    fontFamily: 'Helvetica_Bold',
  },
  text7: {
    ...fontSizeResponsive(14),
    color: colorID.white,
    fontFamily: 'Helvetica_Bold',
  },
  info: {
    ...fontSizeResponsive(16),
    color: colorID.black,
    fontFamily: 'Helvetica_Regular',
  },
  day: {
    ...fontSizeResponsive(15),
    color: colorID.gray4,
    fontFamily: 'Helvetica_Regular',
  },
};

export { colorID, textStyle, breakpoint };
