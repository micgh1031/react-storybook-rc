import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Box } from 'react-layout-components';

import './CarbonItem.css';

const CarbonItemLoading = ({className}) => (
  <Box alignItems="center" className={cx(
    className,
    'carbon-item',
    'carbon-item--loading'
  )}>
    <div className="carbon-item__image carbon-item__image loading-bg"/>
    <Box column>
      <div className="carbon-item__text loading-bg"/>
      <div className="carbon-item__info loading-bg"/>
    </Box>
  </Box>
);

CarbonItemLoading.propTypes = {
  className: PropTypes.string,
};

export default CarbonItemLoading;
