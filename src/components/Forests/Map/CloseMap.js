import React from 'react';
import PropTypes from 'prop-types';

import CloseCircle from '../../UI/Icons/CloseCircle';

import './CloseMap.css';

const CloseMap = ({ closeMap }) => (
  <div className="close-reforestum-map" onClick={closeMap}>
    <CloseCircle />
  </div>
);

CloseMap.propTypes = {
  closeMap: PropTypes.func.isRequired,
};

export default CloseMap;
