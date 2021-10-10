import React from 'react';
import { Spinner as Loader } from 'react-bootstrap';

const spinnerStyle = {
  // spinner size is 2rem x 2rem
  position: 'absolute',
  top: 'calc(50% - 1rem',
  left: 'calc(50% - 1rem',
};

const Spinner = () => (
  <Loader style={spinnerStyle} animation="border" variant="primary" />
);

export default Spinner;
