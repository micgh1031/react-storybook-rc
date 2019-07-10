import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { FormattedMessage, FormattedNumber } from 'react-intl';

import { getFormattedWeight } from '../../../utils/units';

import HeadingSmall from '../../UI/Text/HeadingSmall';
import Huge from '../../UI/Text/Huge';

import './CarbonHeader.css';

const CarbonHeader = ({className, captured, emitted, isOwnUser, isTiny}) => {
  const isEmpty = !captured && !emitted;

  return (
    <div className={cx(className, 'carbon-header')}>

        { isEmpty &&
        <FormattedMessage
            id = {'CarbonBalance.general.title.unavailable'}
            defaultMessage = {'CO² Balance unavailable'}
                />
        }
        { (!isEmpty && isOwnUser) &&
        <FormattedMessage
            id = {'CarbonBalance.title'}
            defaultMessage = {'CO² Balance'}
                />
        }
        { (!isEmpty && !isOwnUser) &&
        <FormattedMessage
            id = {'CarbonBalance.general.title'}
            defaultMessage = {'CO² Balance'}
                />
        }

      {
        isEmpty ?
        <Huge
          className="carbon-header__main"
          color="dark"
          tag="p">

          {
            isTiny ?
              <FormattedMessage
                id={'CarbonBalance.emptyText.tiny'}
                defaultMessage={'You have no availabe footprint'}
              />
            :
              <FormattedMessage
                id={'CarbonBalance.emptyText'}
                defaultMessage={'You have no availabe footprint'}
              />
          }
        </Huge>
        :
        <Huge
          className="carbon-header__main"
          color="white"
          tag="p">
          <FormattedNumber
            value={getFormattedWeight(captured - emitted).value}
          /> {getFormattedWeight(captured - emitted).unit}
        </Huge>
      }

      {
        !isEmpty&&
        <HeadingSmall
          className="carbon-header__subtitle"
          color="white"
          tag="p">
          { captured - emitted < 0 ?
          <FormattedMessage
            id={'CarbonBalance.negative'}
            defaultMessage={'Negative'}
          />
          :
          <FormattedMessage
            id={'CarbonBalance.positive'}
            defaultMessage={'Positive'}
          />
          }
        </HeadingSmall>
      }
    </div>
  );
};

CarbonHeader.propTypes = {
  className: PropTypes.string,
  captured: PropTypes.number,
  emitted: PropTypes.number,
  isOwnUser: PropTypes.bool,
  isTiny: PropTypes.bool,
};

export default CarbonHeader;
