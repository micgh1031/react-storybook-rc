import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Text from './Text';

const Huge = ({ tag = 'h1', className, ...props }) => (
  <Text {...props} tag={tag} className={cx(className, 't-huge')} />
);

Huge.defaultProps = {
  tag: 'h1'
};

Huge.propTypes = {
  className: PropTypes.string,
  tag: PropTypes.string
};

export default Huge;
