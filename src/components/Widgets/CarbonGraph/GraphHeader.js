import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedNumber, FormattedRelative } from 'react-intl';
import cx from 'classnames';

import { getFormattedWeight } from '../../../utils/units';

import HeadingSmall from '../../UI/Text/HeadingSmall';
import Huge from '../../UI/Text/Huge';

const GraphHeader = ({ carbon, className, year, me }) => (
  <div className={cx(className, 'carbon-graph__header')}>
    <HeadingSmall>
      {
        me ?
          <FormattedMessage
            id={'CarbonGraph.graphTitle'}
            defaultMessage={'CO² Capture'}
          />
        :
          <FormattedMessage
          id={'CarbonGraph.general.graphTitle'}
          defaultMessage={'CO² Capture'}
              />
        }
    </HeadingSmall>

    <Huge color="green" className="carbon-graph__header-amount">
      <FormattedNumber
        value={getFormattedWeight(carbon).value}
      /> {getFormattedWeight(carbon).unit}
    </Huge>

    <HeadingSmall color="light" tag="p">
      <FormattedRelative value={year}/>
    </HeadingSmall>
  </div>
);

GraphHeader.propTypes = {
  carbon: PropTypes.number.isRequired,
  className: PropTypes.string.isRequired,
  year: PropTypes.object,
  me: PropTypes.bool,
};

export default GraphHeader;
