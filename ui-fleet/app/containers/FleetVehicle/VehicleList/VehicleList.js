import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import _isEmpty from 'lodash/isEmpty';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import CardHeader from 'components/CardHeader';
import Search from 'assets/images/ic_search.png';
import styles from 'styles/jss/containers/vehicleList';
import messages from './messages';
import { filterVehicle } from './constants';
import TableVehicle from './TableVehicle';

export class VehicleList extends React.PureComponent {
  handleSelectVehicle = (colId, vehicle) => {
    const { onSelectedRow, onGetVehicleInfo, getDataEcu } = this.props;
    if (colId !== 'checkbox') {
      onSelectedRow(vehicle.id);
      onGetVehicleInfo(vehicle.id);
      getDataEcu(vehicle.id);
    }
  };

  handleChangeFilterVehicle = (e, index) => {
    this.props.onChangeFilterVehicle(index);
  };

  handleChangeSearchVehicle = e => {
    const search = this.props.vehicleList.filter;
    this.props.onChangeSearchVehicle(e.target.value);
    if (_isEmpty(e.target.value)) {
      this.props.onGetVehicles(search);
    }
  };
  hanldeSubmitValue = e => {
    if (e.key === 'Enter') {
      const searchQuery = this.props.vehicleList.search;
      this.props.onGetVehicles(searchQuery);
    }
  };
  hanldeSubmitSearch = () => {
    const searchQuery = this.props.vehicleList.search;
    this.props.onGetVehicles(searchQuery);
  };

  componentDidUpdate(prevProps) {
    const { vehicleList, onGetVehicles } = this.props;
    if (prevProps.vehicleList.filter !== vehicleList.filter) {
      onGetVehicles(vehicleList.filter);
    }
  }

  componentDidMount() {
    const { vehicleManagement, onGetVehicles } = this.props;
    if (_isEmpty(vehicleManagement.data)) {
      onGetVehicles(vehicleManagement.filter);
    }
  }

  render() {
    const { classes, vehicleList, vehicleManagement } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          type="list"
          title={<FormattedMessage {...messages.title} />}
        />
        <CardContent className={classes.cardContent}>
          <div className={classes.filter}>
            <Tabs
              className={classes.tabs}
              value={vehicleList.filter}
              onChange={this.handleChangeFilterVehicle}
            >
              {filterVehicle.map(item => (
                <Tab
                  key={item}
                  value={item}
                  className={classes.tab}
                  label={<FormattedMessage {...messages[item]} />}
                  classes={{
                    selected: classes.tabSelected,
                    label: classes.tabLabel,
                    labelContainer: classes.tabLabelContainer,
                  }}
                />
              ))}
            </Tabs>
            <TextField
              className={classes.searchVehicle}
              value={vehicleList.search}
              onChange={this.handleChangeSearchVehicle}
              onKeyPress={this.hanldeSubmitValue}
              InputProps={{
                placeholder: 'Search',
                endAdornment: (
                  <InputAdornment position="end">
                    <img
                      className={classes.searchIcon}
                      onClick={this.hanldeSubmitSearch}
                      role="presentation"
                      src={Search}
                      alt="search"
                    />
                  </InputAdornment>
                ),
                disableUnderline: true,
                classes: { root: classes.inputRoot },
              }}
            />
          </div>
          <TableVehicle
            data={vehicleManagement.data}
            selectedRow={vehicleManagement.selectedRow}
            onChangeSelectRow={this.handleSelectVehicle}
          />
        </CardContent>
      </Card>
    );
  }
}

VehicleList.propTypes = {
  onSelectedRow: PropTypes.func.isRequired,
  onGetVehicleInfo: PropTypes.func.isRequired,
  onGetVehicles: PropTypes.func.isRequired,
  onChangeSearchVehicle: PropTypes.func,
  onChangeFilterVehicle: PropTypes.func.isRequired,
  vehicleList: PropTypes.object.isRequired,
  vehicleManagement: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  getDataEcu: PropTypes.func,
};

export default withStyles(styles)(VehicleList);
