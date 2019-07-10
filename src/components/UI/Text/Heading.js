import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Text from './Text';

const Heading = ({ tag = 'h2', className, ...props }) => (
  <Text {...props} tag={tag} className={cx(className, 't-heading')} />
);

Heading.defaultProps = {
  tag: 'h2'
};

Heading.propTypes = {
  className: PropTypes.string,
  tag: PropTypes.string
};

export default Heading;
