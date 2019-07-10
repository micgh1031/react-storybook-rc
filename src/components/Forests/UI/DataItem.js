import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'react-layout-components';

import Text from '../../UI/Text/Text';
import Uppercase from '../../UI/Text/Uppercase';

import './DataItem.css';

const DataItem = ({color = 'dark', data, label}) => (
  <Box column className="forest-data-item">
    <Text color={color} className="forest-data-item__data">
      {data}
    </Text>
    <Uppercase color="light" className="forest-data-item__label">
      {label}
    </Uppercase>
  </Box>
);

DataItem.defaultTypes = {
  color: 'dark',
};

DataItem.propTypes = {
  color: PropTypes.oneOf(
    ['dark', 'light', 'green', 'orange', 'red', 'white', '75', '50']
  ),
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ]).isRequired,
};

export default DataItem;
