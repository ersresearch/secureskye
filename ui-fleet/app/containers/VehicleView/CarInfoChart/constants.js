/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:21:36 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:21:36 
 */
/*
 *
 * CarInfoChart constants
 *
 */

import { createAsyncTypes } from 'utils/actionUtils';
const PREFIX = 'CarInfoChart_';
export const MIN_VALUE = 0;
export const MAX_VALUE_SPEED = 220;
export const MAX_VALUE_RPM = 12000;
export const MAX_VALUE_FUEL = 100;
export const MAX_VALUE_ENGINE = 100;
export const MAX_VALUE_TRIP_ODO = 100000;
export const SPEED_MESSAGE = 'Invalid speed value';
export const RPM_MESSAGE = 'Invalid rpm value';
export const FUEL_MESSAGE = 'Invalid fuel value';
export const ENGINE_MESSAGE = 'Invalid engine value';
export const TRIP_MESSAGE = 'Invalid trip value';
export const ODO_MESSAGE = 'Invalid odometer value';
export const MAJORTICKSSPEED = [
  '0',
  '20',
  '40',
  '60',
  '80',
  '100',
  '120',
  '140',
  '160',
  '180',
  '200',
  '220',
];
export const MAJORTICKSRPM = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
];

export const actionTypes = {
  GET_CAR_INFO: createAsyncTypes(`${PREFIX}GET_CAR_INFO`),
  CAR_INFO_RESET: createAsyncTypes(`${PREFIX}CAR_INFO_RESET`),
};
