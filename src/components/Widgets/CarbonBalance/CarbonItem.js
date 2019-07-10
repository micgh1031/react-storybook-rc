import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { FormattedNumber } from 'react-intl';

import { getFormattedWeight } from '../../../utils/units';

import HeadingSmall from '../../UI/Text/HeadingSmall';
import Uppercase from '../../UI/Text/Uppercase';

const CarbonItem = ({className, title, amount}) => (
  <div className={cx(className, 'carbon-balance-item')}>
    <Uppercase color="50" tag="p">
      {title}
    </Uppercase>
    <HeadingSmall color="white" tag="p">
      <FormattedNumber
        value={getFormattedWeight(amount).value}
      /> {getFormattedWeight(amount).unit}
    </HeadingSmall>
  </div>
);

CarbonItem.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
};

export default CarbonItem;
