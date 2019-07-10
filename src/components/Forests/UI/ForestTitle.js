import React from 'react';
import PropTypes from 'prop-types';

import HeadingSmall from '../../UI/Text/HeadingSmall';

import './ForestTitle.css';

const ForestTitle = ({children}) => (
  <HeadingSmall className="forest-details-title">
    {children}
  </HeadingSmall>
);

ForestTitle.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
};

export default ForestTitle;
