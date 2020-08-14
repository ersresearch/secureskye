import React from 'react';
import PropTypes from 'prop-types';
import _isEmpty from 'lodash/isEmpty';
import _toLower from 'lodash/toLower';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import styles from 'styles/jss/containers/roleForm';
import PanelTitle from 'components/PanelTitle';
import messages from 'containers/Role/messages';
import Table from 'components/Table';
import Checkbox from 'components/CheckBox';

export class AuthorityConfiguration extends React.PureComponent {
  componentDidMount() {
    this.props.onGetAuthorities();
  }

  componentWillUnmount() {
    this.props.onChangeAuthoritiesList([]);
  }

  renderRow = value => {
    const { classes } = this.props;
    return value.status ? (
      <Checkbox
        checked={value.checked}
        value={value.id}
        handleChange={this.handleChange}
      />
    ) : (
      <div className={classes.naValue}>
        <span className={classes.text}>N/A</span>
      </div>
    );
  };

  handleChange = (value, status) => {
    const { authoritiesList } = this.props.role;
    if (status) {
      authoritiesList.push({ id: value });
    } else {
      authoritiesList.splice(
        authoritiesList.findIndex(item => item.id === value),
        1,
      );
    }
    this.props.onChangeAuthoritiesList(authoritiesList);
  };

  renderHeader = title => (
    <PanelTitle
      title={<FormattedMessage {...messages[title]} />}
      subtitle={4}
    />
  );

  render() {
    const { classes, role } = this.props;
    const { authConfig, authoritiesList } = role;
    const authMap = new Map();

    if (authConfig !== undefined && authConfig !== null) {
      authConfig.forEach(record => {
        const authId = record.id;
        const authDescription = record.description;
        const authAndPermission = record.authority.split(':');
        const roleName = authAndPermission[0];
        const currrentAuthorities = authMap.get(roleName);
        if (currrentAuthorities === undefined || currrentAuthorities === null) {
          authMap.set(roleName, {
            read: { status: false },
            create: { status: false },
            update: { status: false },
            delete: { status: false },
            authDescription,
          });
        }
        const rowAuthorities = authMap.get(roleName);
        let checked = false;
        if (
          authoritiesList !== null &&
          authoritiesList !== undefined &&
          authoritiesList.length !== 0
        ) {
          if (authoritiesList.findIndex(item => item.id === record.id) !== -1) {
            checked = true;
          }
        }

        if (!_isEmpty(roleName)) {
          switch (_toLower(authAndPermission[1])) {
            case 'read':
              rowAuthorities.read.status = true;
              rowAuthorities.read.id = authId;
              rowAuthorities.read.checked = checked;
              authMap.set(roleName, rowAuthorities);
              break;
            case 'create':
              rowAuthorities.create.status = true;
              rowAuthorities.create.id = authId;
              rowAuthorities.create.checked = checked;
              authMap.set(roleName, rowAuthorities);
              break;
            case 'update':
              rowAuthorities.update.status = true;
              rowAuthorities.update.id = authId;
              rowAuthorities.update.checked = checked;
              authMap.set(roleName, rowAuthorities);
              break;
            case 'delete':
              rowAuthorities.delete.status = true;
              rowAuthorities.delete.id = authId;
              rowAuthorities.delete.checked = checked;
              authMap.set(roleName, rowAuthorities);
              break;
            default:
              break;
          }
        }
      });
    }
    const dataRender = Array.from(authMap);
    const columns = [
      {
        id: 'id',
        Header: '',
        accessor: row => <span className={classes.text}>{row[0]}</span>,
        width: 450,
        style: { outline: 'none' },
      },
      {
        id: 'read',
        Header: this.renderHeader('read'),
        accessor: row => this.renderRow(row[1].read),
      },
      {
        id: 'create',
        Header: this.renderHeader('create'),
        accessor: row => this.renderRow(row[1].create),
      },
      {
        id: 'update',
        Header: this.renderHeader('update'),
        accessor: row => this.renderRow(row[1].update),
      },
      {
        id: 'delete',
        Header: this.renderHeader('delete'),
        accessor: row => this.renderRow(row[1].delete),
      },
    ];
    return (
      <div className={`${classes.wrapperContent} ${classes.authConfig}`}>
        <PanelTitle
          title={<FormattedMessage {...messages.authConfig} />}
          subtitle={2}
        />
        <div className={classes.tableDetail}>
          <Table data={dataRender} columns={columns} />
        </div>
      </div>
    );
  }
}

AuthorityConfiguration.propTypes = {
  role: PropTypes.object,
  user: PropTypes.object,
  classes: PropTypes.object,
  onGetAuthorities: PropTypes.func,
  onChangeAuthoritiesList: PropTypes.func,
};

export default withStyles(styles)(AuthorityConfiguration);
