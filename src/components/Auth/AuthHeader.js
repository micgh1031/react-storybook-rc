import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Box } from 'react-layout-components';

import Heading from '../UI/Text/Heading';
import HeadingSmall from '../UI/Text/HeadingSmall';

import './AuthHeader.css';

const AuthHeader = ({ className, title, text }) => (
  <Box column className={cx(className, 'auth-header')}>
    <Heading className="auth-header__title">
      {title}
    </Heading>
    {
      text &&
      <HeadingSmall tag="p" color="light" className="auth-header__text">
        {text}
      </HeadingSmall>
    }
  </Box>
);

AuthHeader.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  text: PropTypes.string
};

export default AuthHeader;
