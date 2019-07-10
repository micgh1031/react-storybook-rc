import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './Token.css';

const Token = ({
  big,
  children,
  className,
  color = 'dark',
  content,
  line }) => (
  <div
    className={cx(
      className,
      't-token',
      `t-token--${color}`,
      { 't-token--big': big },
      { 't-token--line': line },
      { 't-token--hidden': +content <= 0 }
    )}>
    {children &&
      <div className="t-token__element">
        {React.Children.only(children)}
      </div>
    }
    <div className="t-token__content">{content}</div>
  </div>
);

Token.propTypes = {
  big: PropTypes.bool,
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(
    ['dark', 'light', 'green', 'orange', 'red', 'white', '75', '50']
  ),
  content: PropTypes.string.isRequired,
  line: PropTypes.bool
};

export default Token;
