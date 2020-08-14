import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  outer: {
    height: '100%',
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#ffffff10',
    verticalAlign: 'middle',
  },
  helper: {
    display: 'inline-block',
    height: '100%',
    verticalAlign: 'middle',
  },
  middle: {
    // top: '550',
    // left: '250',
    verticalAlign: 'middle',
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

// function CircularIndeterminate(props) {
//   const { classes } = props;
//   return <CircularProgress className={classes.progress} size={50} />;
// }

class CircularIndeterminate extends React.PureComponent {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.outer}>
        <div className={classes.helper}> </div>
        <CircularProgress
          className={classes.progress}
          size={50}
          color="secondary"
        />
      </div>
    );
  }
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIndeterminate);
