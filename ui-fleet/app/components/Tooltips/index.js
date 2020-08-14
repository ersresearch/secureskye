/*
 * @Author: NhuHH 
 * @Date: 2018-11-13 08:57:12 
 * @Last Modified by:   NhuHH 
 * @Last Modified time: 2018-11-13 08:57:12 
 */
import React from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import AlertIcon from 'components/AlertIcon';
import CachedIcon from 'assets/images/ic_cached.png';
import styles from 'styles/jss/components/tooltips';

/* eslint-disable react/prefer-stateless-function */
class Tooltips extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isHovering: false,
    };
  }

  handleMouseHover = () => this.setState(this.toggleHoverState);

  toggleHoverState = state => ({ isHovering: !state.isHovering });

  displayContent() {
    const { classes, type, content } = this.props;
    switch (type) {
      case 'UPDATE':
        return (
          <div className={classes.tooltipContent}>
            {content.map(
              item =>
                item.software.latest.versionId !== item.current.versionId ? (
                  <div key={item.id} className={classes.item}>
                    <img
                      src={CachedIcon}
                      className={classes.contentIcon}
                      alt="Cached icon"
                    />
                    <div className={classes.textUpdate}>
                      {item.software.name}
                    </div>
                  </div>
                ) : (
                  <div key={item.id} style={{ display: 'none' }} />
                ),
            )}
          </div>
        );
      case 'ALERT':
        return (
          <div className={classes.tooltipContent}>
            {content.danger && (
              <div className={classes.item}>
                <AlertIcon
                  type="CRITICAL"
                  className={classes.contentIcon}
                  size="small"
                />
                <span className={classes.text}>{content.danger}</span>
              </div>
            )}
            {content.warning && (
              <div className={classes.item}>
                <AlertIcon
                  type="WARNING"
                  className={classes.contentIcon}
                  size="small"
                />
                <span className={classes.text}>{content.warning}</span>
              </div>
            )}
          </div>
        );
      case 'USER_MANAGEMENT':
        return (
          <div className={classes.tooltipContent}>
            <div className={classes.item}>
              {content ? 'Deactivate' : 'Activate'}
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div
        className={classes.tooltipHover}
        onMouseEnter={this.handleMouseHover}
        onMouseLeave={this.handleMouseHover}
      >
        {this.props.children}
        {this.state.isHovering && this.displayContent()}
      </div>
    );
  }
}

Tooltips.propTypes = {
  classes: PropTypes.object,
  type: PropTypes.string,
  content: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.bool,
  ]),
  children: PropTypes.node,
};

export default withStyles(styles)(Tooltips);
