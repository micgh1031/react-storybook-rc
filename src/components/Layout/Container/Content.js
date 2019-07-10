import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './Content.css';

const Content = ({
  children,
  className,
  coverage = 'default',
  ...other,
}) => (
  <div className="l-content">
    <div {...other} className={cx(className, `l-inner--${coverage}`)}>
      { children }
    </div>
  </div>
);

Content.defaultProps = {
  coverage: 'default'
};

Content.propTypes = {
  className: PropTypes.string,
  coverage: PropTypes.oneOf(['default', 'full', 'footer']),
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
};

export default Content;
