import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Box } from 'react-layout-components';
import { FormattedNumber } from 'react-intl';

import { requiredIf } from '../../../utils/requiredIf';
import { getFormattedArea } from '../../../utils/units';

import Text from '../../UI/Text/Text';
import AvatarPlaceholder from '../../../assets/images/avatar-placeholder.png';

import './PatronItem.css';

const PatronItem = ({ patron, user, selfSurface, selfPosition }) => (
  <Box
    className={cx(
      'patron-item',
      { 'patron-item--self': user || selfPosition === patron.rank }
    )}
    justifyContent="space-between"
    alignItems="center">
    <Box alignItems="center" className="patron-item__patron">
      <Text className="patron-item__rank">
        {(patron && patron.rank) || selfPosition}
      </Text>

      <div
        className="patron-item__avatar"
        style={{
          backgroundImage: `url(${
            (patron && patron.avatar_url)
            || (user && user.avatar)
            || AvatarPlaceholder
          })`
        }}
      />

      <Text className="patron-item__name">
        {(patron && patron.name) || (user && `${user.name} ${user.surname}`)}
      </Text>
    </Box>

    <Text color="light" className="patron-item__surface">
      <FormattedNumber
        value={getFormattedArea((patron && patron.surface) || selfSurface).value}
      /> {getFormattedArea((patron && patron.surface) || selfSurface).unit}
    </Text>
  </Box>
);

PatronItem.propTypes = {
  patron: requiredIf( PropTypes.object, props => !props.user),
  selfPosition: requiredIf( PropTypes.number, props => props.user),
  selfSurface: requiredIf( PropTypes.number, props => props.user),
  user: requiredIf( PropTypes.object, props => !props.patron),
};

export default PatronItem;
