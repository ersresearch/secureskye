import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import styles from 'styles/jss/containers/roleForm';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from 'components/CardHeader';
import messages from '../messages';
import RoleForm from '../RoleForm';

export class CreateRole extends React.PureComponent {
  handleOnSubmit = value => {
    const { role } = this.props;
    const users = role.usersList.map(item => ({ id: item.id }));
    const authorities = role.authoritiesList;
    const valueSubmit = {
      name: value.name,
      description: value.description,
      users,
      authorities,
    };
    this.props.onCreateRole(valueSubmit);
  };
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader title={<FormattedMessage {...messages.createRole} />} />
        <CardContent className={classes.cardContent}>
          <RoleForm onSubmit={this.handleOnSubmit} />
        </CardContent>
      </Card>
    );
  }
}

CreateRole.propTypes = {
  classes: PropTypes.object,
  role: PropTypes.object,
  onCreateRole: PropTypes.func,
};

export default withStyles(styles)(CreateRole);
