import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'react-layout-components';
import { FormattedNumber, injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';

import Text from '../UI/Text/Text';
import Small from '../UI/Text/Small';
import IconText from '../UI/Text/IconText';
import GreenCloud from '../UI/Icons/GreenCloud';
import TooltipSurface from '../UI/Icons/TooltipSurface';

import { getFormattedWeight, getFormattedArea } from '../../utils/units';

import './ForestItem.css';

const ForestItem = ({ forest }) => (
  <Link to={`/my-forests/${forest.id}`}>
    <Box
      justifyContent="space-between"
      alignItems="center"
      className="forest-item">

      <Box center>
        <div
          className="forest-item__image"
          style={{
            backgroundImage: `url(${forest.main_image})`
          }}
        />

        <Box column className="carbon-item__content">

          <Text tag="h3" className="carbon-item__text">
            {forest.name}
          </Text>

          <Box className="carbon-item__info">
            <IconText icon={TooltipSurface} className="carbon-item__carbon">
              <Small color="light">
                <FormattedNumber
                  value={getFormattedArea(forest.user_total_surface).value.toFixed(2)}
                /> {getFormattedArea(forest.user_total_surface).unit}
              </Small>
            </IconText>
            <IconText icon={GreenCloud} className="carbon-item__carbon">
              <Small color="green">
                <FormattedNumber
                  value={getFormattedWeight(forest.captured_co2).value}
                /> {getFormattedWeight(forest.captured_co2).unit}
              </Small>
            </IconText>
          </Box>


        </Box>
      </Box>
    </Box>
  </Link>
);

ForestItem.propTypes = {
  forest: PropTypes.object.isRequired,
};

export default injectIntl(ForestItem);
