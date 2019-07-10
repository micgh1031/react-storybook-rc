import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { injectIntl, intlShape } from 'react-intl';

import { carbonMessages } from '../../../constants/messages';

import CarbonHeader from './CarbonHeader';
import Balance from './Balance';
import CarbonItem from './CarbonItem';

import GreenImage from '../../../assets/images/carbon-green.jpg';
import OrangeImage from '../../../assets/images/carbon-orange.jpg';
import EmptyImage from '../../../assets/images/carbon-empty.png';

import './Carbon.css';

const Carbon = ({
  className,
  captured,
  emitted,
  intl,
  oxygen,
  tiny,
  isOwnUser
}) => {
  const isEmpty = !captured && !emitted;
  const image =
    /** If there's no data */
    isEmpty ? EmptyImage
    /** Else */
    : captured >= emitted
      /** if the captured amount is greater or equal */
      ? GreenImage
      /** not enough offsetting! */
      : OrangeImage;

  return (
    <div
      className={cx(
        className,
        'carbon-balance',
        { 'carbon-balance--tiny': tiny },
        { 'carbon-balance--empty': isEmpty },
        { 'carbon-balance--positive': captured >= emitted },
        { 'carbon-balance--negative': captured < emitted }
      )}
      style={tiny ? {} : {backgroundImage: `url(${image})`}}>

      <div className="carbon-balance__top">
        <CarbonHeader
          className="carbon-balance__header"
          captured={captured}
          emitted={emitted}
          isOwnUser={isOwnUser}
          isTiny={tiny}
        />
      </div>

      {
        !isEmpty &&
        <div className="carbon-balance__bottom">
          <Balance
            className="carbon-balance__balance"
            captured={captured}
            emitted={emitted}
          />
          {!tiny &&
          <div className="carbon-balance__data">
            <CarbonItem
              className="carbon-balance__data-item"
              title={intl.formatMessage(carbonMessages.captured)}
              amount={captured}
            />
            <CarbonItem
              className="carbon-balance__data-item"
              title={intl.formatMessage(carbonMessages.emitted)}
              amount={emitted}
            />
            {
              oxygen &&
              <CarbonItem
                className="carbon-balance__data-item"
                title={intl.formatMessage(carbonMessages.oxygen)}
                amount={oxygen}
              />
            }
          </div>
          }
        </div>
      }

    </div>
  );
};

Carbon.propTypes = {
  className: PropTypes.string,
  captured: PropTypes.number,
  emitted: PropTypes.number,
  intl: intlShape.isRequired,
  oxygen: PropTypes.number,
  tiny: PropTypes.bool,
  isOwnUser: PropTypes.bool,
};

export default injectIntl(Carbon);
