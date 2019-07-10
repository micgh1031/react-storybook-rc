import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Text from './Text';

const HeadingSmall = ({ tag = 'h3', className, ...props }) => (
  <Text {...props} tag={tag} className={cx(className, 't-heading-small')} />
);

HeadingSmall.defaultProps = {
  tag: 'h3'
};

HeadingSmall.propTypes = {
  className: PropTypes.string,
  tag: PropTypes.string
};

export default HeadingSmall;
