import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Text from './Text';

const Small = ({ tag = 'small', className, ...props }) => (
  <Text {...props} tag={tag} className={cx(className, 't-tiny')} />
);

Small.defaultProps = {
  tag: 'small'
};

Small.propTypes = {
  className: PropTypes.string,
  tag: PropTypes.string
};

export default Small;
