import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'react-layout-components';

import Text from '../../UI/Text/Text';
import Small from '../../UI/Text/Small';

import SpeciesPlaceholder from '../../../assets/images/species-placeholder.png';
import './SpeciesItem.css';

const SpeciesItem = ({name, latin, image}) => (
  <div className="forest-species">    
    <Box className="forest-species__inner" alignItems="center">
      <div
        className="forest-species__image"
        style={{
          backgroundImage: `url(${ image || SpeciesPlaceholder })`
        }}
      />

      <Box column className="forest-species__info">
        <Text className="forest-species__name">
          {name}
        </Text>
        <Small color="light" className="forest-species__latin">
          {latin}
        </Small>
      </Box>
    </Box>
  </div>
);

SpeciesItem.propTypes = {
  image: PropTypes.string,
  latin: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default SpeciesItem;
