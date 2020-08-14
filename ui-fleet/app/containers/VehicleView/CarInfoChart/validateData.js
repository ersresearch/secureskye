/*
 * @Author: LoiDT2 
 * @Date: 2018-11-13 09:22:21 
 * @Last Modified by:   LoiDT2 
 * @Last Modified time: 2018-11-13 09:22:21 
 */
import {
  MAX_VALUE_SPEED,
  MIN_VALUE,
  MAX_VALUE_ENGINE,
  MAX_VALUE_FUEL,
  MAX_VALUE_RPM,
} from './constants';
let oldValueSpeed = 0.0;
let oldValueEngine = 0.0;
let oldValueFuel = 0.0;
let oldValueRPM = 0.0;

export const validateSpeed = data => {
  let value = data;
  if (value <= MAX_VALUE_SPEED && value >= MIN_VALUE && value !== null) {
    oldValueSpeed = value;
  } else {
    value = oldValueSpeed;
  }
  return value;
};

export const validateRPM = data => {
  let value = data;
  if (value <= MAX_VALUE_RPM && value >= MIN_VALUE && value !== null) {
    oldValueRPM = value;
  } else {
    value = oldValueRPM;
  }
  return value;
};

export const validateEngine = data => {
  let value = data;
  if (value <= MAX_VALUE_ENGINE && value >= MIN_VALUE && value != null) {
    oldValueEngine = value;
  } else {
    value = oldValueEngine;
  }
  return value;
};

export const validateFuel = data => {
  let value = data;
  if (value <= MAX_VALUE_FUEL && value >= MIN_VALUE && value != null) {
    oldValueFuel = value;
  } else {
    value = oldValueFuel;
  }
  return value;
};
