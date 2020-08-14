/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:04:34 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-19 09:47:29
 */
import { fromJS } from 'immutable';
import Chance from 'chance';
import { ApiGatewayUrl } from 'commons/constants';
import _isEmpty from 'lodash/isEmpty';
import { actionTypes } from './constants';

const chance = new Chance();

export const initialState = fromJS({
  statusFuel: false,
  statusOdo: false,
  selectedRow: '',
  file: '',
  imageURL: '',
  imageURLInit: '',
  initData: [
    {
      fuelStatus: false,
      odoStatus: false,
      OBDConfig: '',
      color: '#ff0000',
    },
  ],
  loadData: {},
  data: [],
  rowInfo: {},
  alertDialogStatus: false,
  deleteVehicleID: null,
  dataModel: [],
  dataOBD: [],
  statusCheck: [],
  isLoading: false,
  dataOBDById: [],
  listCheckbox: [],
  selectAll: false,
});

function VehicleReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.GET_VEHICLES.SUCCESS: {
      const dataFormat = [];
      if (!_isEmpty(action.payload.data)) {
        action.payload.data.forEach(item => {
          // eslint-disable-next-line no-underscore-dangle
          const _id = chance.guid();
          const data = {
            _id,
            ...item,
          };
          dataFormat.push(data);
        });
      }
      return state.set('data', dataFormat);
    }

    case actionTypes.CHANGE_STATUS_FUEL:
      return state.set('statusFuel', action.payload.status);
    case actionTypes.CHANGE_STATUS_ODO:
      return state.set('statusOdo', action.payload.status);
    case actionTypes.RESET_IMAGE:
      return state.merge({ imageURLInit: '', file: '' });
    case actionTypes.CHANGE_IMAGE:
      return state.merge({
        file: action.payload.file,
        imageURL: action.payload.imageURL,
        imageURLInit: action.payload.imageURL,
      });
    case actionTypes.RESET_DATA:
      return state.merge({
        statusFuel: false,
        statusOdo: false,
        file: '',
        imageURL: '',
        imageURLInit: '',
      });
    case actionTypes.SELECTED_ROW_ID:
      return state.set('selectedRow', fromJS(action.payload.id));
    case actionTypes.SELECTED_ROW_INFOR: {
      const { name, vin, modelId, color, imageUrl, modelName } = action.row;
      const currentData = {
        name,
        vin,
        model: {
          value: modelId,
          label: modelName,
        },
        color,
      };
      return state.merge({
        rowInfo: fromJS(currentData),
        imageURL: ApiGatewayUrl + imageUrl,
      });
    }
    case actionTypes.OBD_CONFIGURE.SUCCESS: {
      const dataOBDDisplay = [];
      if (!_isEmpty(action.payload.data)) {
        action.payload.data.forEach(item => {
          const data = {
            value: item.id,
            label: item.macAddress,
          };
          dataOBDDisplay.push(data);
        });
      }

      return state.set('dataOBD', fromJS(dataOBDDisplay) || []);
    }
    case actionTypes.GET_OBD_BY_ID.SUCCESS: {
      let rowInfoReducer = state.get('rowInfo').toJS();
      if (!_isEmpty(action.payload.data)) {
        action.payload.data.forEach(item => {
          const data = {
            OBDConfig: {
              value: item.id,
              label: item.macAddress,
            },
          };
          rowInfoReducer = { ...rowInfoReducer, ...data };
        });
      }
      return state.merge({
        rowInfo: fromJS(rowInfoReducer) || [],
        dataOBDById: action.payload.data,
      });
    }
    case actionTypes.GET_ALL_MODEL.SUCCESS: {
      const dataModelDisplay = [];
      if (!_isEmpty(action.payload.model)) {
        action.payload.model.forEach(item => {
          const data = {
            value: item.id,
            label: item.name,
          };
          dataModelDisplay.push(data);
        });
      }
      return state.set('dataModel', fromJS(dataModelDisplay) || []);
    }
    case actionTypes.DELETE_VEHICLE_ID:
      return state.merge({
        alertDialogStatus: action.payload.status,
        deleteVehicleID: action.payload.id,
      });
    case actionTypes.DELETE_VEHICLE_LIST:
      return state.set('statusCheck', action.list);
    case actionTypes.GET_VEHICLE_BY_ID.SUCCESS:
      return state.set('rowInfo', action.payload);
    case actionTypes.ADD_VEHICLE.REQUEST:
      return state.set('isLoading', true);
    case actionTypes.ADD_VEHICLE.SUCCESS:
      return state.set('isLoading', false);
    case actionTypes.ADD_VEHICLE.FAILURE:
      return state.set('isLoading', false);
    case actionTypes.UPDATE_VEHICLE.REQUEST:
      return state.set('isLoading', true);
    case actionTypes.UPDATE_VEHICLE.SUCCESS:
      return state.set('isLoading', false);
    case actionTypes.UPDATE_VEHICLE.FAILURE:
      return state.set('isLoading', false);
    case actionTypes.DELETE_VEHICLE.REQUEST:
      return state.set('isLoading', true);
    case actionTypes.DELETE_VEHICLE.SUCCESS:
      return state.set('isLoading', false);
    case actionTypes.DELETE_VEHICLE.FAILURE:
      return state.set('isLoading', false);
    default:
      return state;
  }
}
export default VehicleReducer;
