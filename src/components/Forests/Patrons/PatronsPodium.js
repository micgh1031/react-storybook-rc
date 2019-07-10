import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Box } from 'react-layout-components';
import { FormattedNumber } from 'react-intl';

import { getFormattedArea } from '../../../utils/units';

import Text from '../../UI/Text/Text';
import Small from '../../UI/Text/Small';
import AvatarPlaceholder from '../../../assets/images/avatar-placeholder.png';

import './PatronsPodium.css';

const PatronsPodium = ({ patrons }) => (
  <Box className="patrons-podium" justifyContent="space-around">
    {patrons.map(patron => (
      <Box
        className="patrons-podium__patron"
        column
        key={patron.rank}
        alignItems="center"
        justifyContent="flex-end"
        order={patron.rank === 2 ? -1 : patron.rank}>

        <div
          className={cx(
            'patrons-podium__avatar',
            `patrons-podium__avatar--${patron.rank}`
          )}
          style={{
            backgroundImage: `url(${
              patron.avatar_url
              || AvatarPlaceholder
            })`
          }}>
          <Box center
            className="patrons-podium__rank">
            {patron.rank}
          </Box>
        </div>

        <Text>
          {patron.name}
        </Text>

        <Small color="green">
          <FormattedNumber
            value={getFormattedArea(patron.surface).value}
          /> {getFormattedArea(patron.surface).unit}
        </Small>
      </Box>
    ))}
  </Box>
);

PatronsPodium.propTypes = {
  patrons: PropTypes.array.isRequired,
};

export default PatronsPodium;
