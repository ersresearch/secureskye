const footer = () => ({
  root: {
    height: '5%',
    display: 'flex',
    borderRadius: '0',
  },
  detail: {
    margin: 'auto',
  },
  info: {
    textDecoration: 'none',
    color: '#20a8d8',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

export default footer;
