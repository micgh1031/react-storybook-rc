import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Box } from 'react-layout-components';
import { FormattedNumber } from 'react-intl';

import { getFormattedWeight, getFormattedArea } from '../../../utils/units';

import Popover from '../../UI/Popover/Popover';
import Text from '../../UI/Text/Text';
import IconText from '../../UI/Text/IconText';
import MapClusterIcon from '../../UI/Icons/MapClusterIcon';
// import MapTreeIcon from '../../UI/Icons/MapTreeIcon';
import TooltipCaptured from '../../UI/Icons/TooltipCaptured';
import TooltipSurface from '../../UI/Icons/TooltipSurface';

import './ForestMarker.css';

const ForestMarker = ({ name, surface, carbon, available }) => (
  <Popover
    theme={available ? 'dark' : 'unavailable'}
    className={cx(
      'my-forest-tooltip',
      { 'my-forest-tooltip__cluster': surface || carbon  }
    )}>
      <Box column>
        <Box>
          <IconText icon={MapClusterIcon}>
            <Text color="white" className="my-forest-tooltip__name">
              {name}
            </Text>
          </IconText>
        </Box>
          { available &&
            <Box className="my-forest-tooltip__metadata">
                <IconText
                  icon={TooltipSurface}
                  className="my-forest-tooltip__surface">
                  <Text color="light">
                    <FormattedNumber
                      value={getFormattedArea(surface).value.toFixed(2)}
                    /> {getFormattedArea(surface).unit}
                  </Text>
                </IconText>
                <IconText
                  icon={TooltipCaptured}
                  className="my-forest-tooltip__area">
                  <Text color="light">
                    <FormattedNumber
                      value={getFormattedWeight(carbon).value}
                    /> {getFormattedWeight(carbon).unit}
                  </Text>
                </IconText>
            </Box>
          }

      </Box>
  </Popover>
);

ForestMarker.propTypes = {
  name: PropTypes.string.isRequired,
  surface: PropTypes.number,
  carbon: PropTypes.number,
  available: PropTypes.bool,
};

export default ForestMarker;
