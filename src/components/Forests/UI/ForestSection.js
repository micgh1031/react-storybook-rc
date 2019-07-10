import React from 'react';
import PropTypes from 'prop-types';

import './ForestSection.css';

const ForestSection = ({ children }) => (
  <div className="forest-section">
    {children}
  </div>
);

ForestSection.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
};

export default ForestSection;
