import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './Text.css';

const Text = ({
  tag = 'span',
  className,
  color = 'dark',
  ...props
}) => {
  const Tag = tag;

  return <Tag {...props} className={cx(className, 't-main', `t-main--${color}`)} />;
};

Text.defaultProps = {
  tag: 'span'
};

Text.propTypes = {
  className: PropTypes.string,
  /** Text color */
  color: PropTypes.oneOf(
    ['dark', 'light', 'green', 'orange', 'red', 'white', '75', '50']
  ),
  /** The tag to render the text (eg: p, span, small, a, etc.) */
  tag: PropTypes.string
};

export default Text;
