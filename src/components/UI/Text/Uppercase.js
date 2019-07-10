import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Text from './Text';

const Uppercase = ({ tag = 'span', className, ...props }) => (
  <Text {...props} tag={tag} className={cx(className, 't-uppercase')} />
);

Uppercase.defaultProps = {
  tag: 'span'
};

Uppercase.propTypes = {
  className: PropTypes.string,
  tag: PropTypes.string
};

export default Uppercase;
