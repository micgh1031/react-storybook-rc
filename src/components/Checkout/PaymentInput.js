import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import amexImg from '../../assets/images/checkout/card-amex.png';
import mastercardImg from '../../assets/images/checkout/card-mastercard.png';
import visaImg from '../../assets/images/checkout/card-visa.png';
import unknownImg from '../../assets/images/checkout/card-unknown.png';

import Small from '../UI/Text/Small';

const cards = {
  amex: amexImg,
  mastercard: mastercardImg,
  visa: visaImg,
  unknown: unknownImg,
};

const PaymentInput = ({
  card = false,
  cardType = 'unknown',
  children,
  disabled = false,
  error,
  label,
}) => {
  return (
    <div className={cx(
      'input-holder',
      { 'input-holder--error': error },
      { 'input-holder--disabled': disabled }
    )}>
      <div className="main-input">
        { card &&
          <div className="main-input__card" style={{
            backgroundImage: `url(${cards[cardType]})`
          }}/>
        }
        <div className="main-input__header">
          <Small
            tag="label"
            className="main-input__label">
            {label}
          </Small>
        </div>
        {React.Children.only(children)}
        <div className="main-input__box" />
      </div>
    </div>
  );
};

PaymentInput.defaultProps = {
  card: false,
  disabled: false,
  cardType: 'unknown',
};

PaymentInput.propTypes = {
  card: PropTypes.bool.isRequired,
  cardType: PropTypes.oneOf(['unknown', 'amex', 'mastercard', 'visa']),
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  error: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
};

export default PaymentInput;
