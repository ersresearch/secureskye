/*
 * @Author: NhuHH 
 * @Date: 2018-11-14 11:38:27 
 * @Last Modified by: NhuHH
 * @Last Modified time: 2018-12-12 10:03:30
 */
const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.displayName) {
    errors.displayName = 'Required';
  }
  if (!values.gender) {
    errors.gender = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = 'Required';
  }
  if (!values.address) {
    errors.address = 'Required';
  }
  if (!values.birthday) {
    errors.birthday = 'Required';
  }
  if (!values.nationality) {
    errors.nationality = 'Required';
  }
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }
  if (!values.gender) {
    errors.gender = 'Required';
  }
  if (!values.area_code) {
    errors.area_code = 'Required';
  }
  return errors;
};

export default validate;
