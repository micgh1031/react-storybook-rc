import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';

import Text from '../UI/Text/Text';
import Heading from '../UI/Text/Heading';
import ButtonLink from '../UI/Button/ButtonLink';

import './NotFound.css';

const NotFound = (props) => (
  <div className={cx(props.className, 'not-found')}>
    <div className="not-found__inner">
      <Heading>
        <FormattedMessage
          id="NotFound.title"
          defaultMessage="Not found"
        />
      </Heading>
      <Text color="light" className="not-found__inner-text">
        <FormattedMessage
          id="NotFound.text"
          defaultMessage="The page you're looking for doesn't exist."
        />
      </Text>
      <ButtonLink to="/">
      <FormattedMessage
        id="NotFound.button"
        defaultMessage="Go back home?"
      />
      </ButtonLink>
    </div>
  </div>
);

NotFound.propTypes = {
  className: PropTypes.string
};

export default NotFound;
