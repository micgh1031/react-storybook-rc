import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Eye from '../../UI/Icons/Eye';
import Text from '../../UI/Text/Text';

import './StyleToggle.css';

const StyleToggle = ({ toggleMapStyle, isSatellite }) => (
  <div
    onClick={toggleMapStyle}
    className="map-toggle-view">

    <Eye />

    <Text className="map-toggle-view__text">
      { isSatellite ?
          <FormattedMessage
            id={'StyleToggle.mapView'}
            defaultMessage={'Show Map view'}
          /> :
          <FormattedMessage
            id={'StyleToggle.satelliteView'}
            defaultMessage={'Show Satellite view'}
          />
      }
    </Text>

  </div>
);

StyleToggle.propTypes = {
  toggleMapStyle: PropTypes.func.isRequired,
  isSatellite: PropTypes.bool.isRequired,
};

export default StyleToggle;
