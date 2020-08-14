const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  } else if (values.name.length > 255) {
    errors.name = 'Must be 255 characters or less';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  if (!values.displayName) {
    errors.displayName = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  if (!values.firstName) {
    errors.firstName = 'Required';
  }
  if (!values.lastName) {
    errors.lastName = 'Required';
  }

  if (!values.id) {
    errors.id = 'Required';
  }
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.vin) {
    errors.vin = 'Required';
  } else if (values.vin.length > 17) {
    errors.vin = 'Must be 17 characters or less';
  }
  if (!values.makerName) {
    errors.makerName = 'Required';
  }
  if (!values.model) {
    errors.model = 'Required';
  }
  if (values.model) {
    if (values.model.length === 0) {
      errors.model = 'Required';
    }
  }
  if (!values.color) {
    errors.color = 'Required';
  }
  if (!values.bodyType) {
    errors.bodyType = 'Required';
  }
  if (!values.makerName) {
    errors.makerName = 'Required';
  }
  if (!values.description) {
    errors.description = 'Required';
  }
  if (!values.file) {
    errors.file = 'Required';
  }
  return errors;
};

export default validate;
