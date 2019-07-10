import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';

import Text from '../Text/Text';
import Tiny from '../Text/Tiny';

import './FeedbackMessage.css';

const FeedbackMessage = ({className, children, type = 'error'}) => (
  <div className={cx(className, 'form-feedback-message')}>
    <Tiny
      className={cx(
        'form-feedback-message__label',
        `form-feedback-message__label--${type}`
      )}
      color="white">
      {
        type === 'error' ?
        <FormattedMessage
          id={'FeedbackMessage.errorLabel'}
          defaultMessage={'Oops'}
        /> :
        <FormattedMessage
          id={'FeedbackMessage.successLabel'}
          defaultMessage={'Great'}
        />
      }
    </Tiny>
    <Text color={type === 'error' ? 'red' : 'green'}>
      <FormattedMessage
        id={children}
      />
    </Text>
  </div>
);

FeedbackMessage.propTypes = {
  className: PropTypes.string,
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['error', 'success'])
};

export default FeedbackMessage;
