import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import qs from 'qs';
import { withStyles } from '@material-ui/core/styles';
import styles from 'styles/jss/containers/roleForm';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from 'components/CardHeader';
import messages from '../messages';
import RoleForm from '../RoleForm';

const data = {
  dataUser: [
    {
      id: 1,
      user: 'User Driver 1',
      email: 'driver1@fsoft.com.vn',
    },
    {
      id: 2,
      user: 'User Driver 2',
      email: 'driver2@fsoft.com.vn',
    },
  ],
  authConfig: [
    {
      id: 1,
      name: 'License Number',
      read: false,
      create: false,
      update: false,
      delete: false,
    },
    {
      id: 2,
      name: 'Security Number',
      read: true,
      create: true,
      update: true,
      delete: true,
    },
    {
      id: 3,
      name: 'Security Number',
      read: false,
      create: true,
      update: true,
      delete: true,
    },
  ],
};

export class UpdateRole extends React.PureComponent {
  handleOnSubmit = value => {
    const id = qs.parse(this.props.location.search)['?id'] || '';
    if (id !== '') {
      const { role } = this.props;
      const users = role.usersList.map(item => ({ id: item.id }));
      const authorities = role.authoritiesList;
      const valueSubmit = {
        name: value.name,
        description: value.description,
        users,
        authorities,
      };
      this.props.onUpdateRole(id, valueSubmit);
    }
  };
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader title={<FormattedMessage {...messages.updateRole} />} />
        <CardContent className={classes.cardContent}>
          <RoleForm data={data} onSubmit={this.handleOnSubmit} />
        </CardContent>
      </Card>
    );
  }
}

UpdateRole.propTypes = {
  role: PropTypes.object,
  classes: PropTypes.object,
  onUpdateRole: PropTypes.func,
  location: PropTypes.object,
};

export default withStyles(styles)(UpdateRole);
