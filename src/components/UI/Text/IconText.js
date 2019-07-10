import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const IconText = ({className, icon, children}) => {
  const Icon = icon;
  return (
    <span className={cx(className, 't-icon')}>
      <Icon />
      {React.Children.only(children)}
    </span>
  );
};

IconText.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element.isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]).isRequired
};

export default IconText;
