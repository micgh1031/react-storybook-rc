import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const IconLink = props => {
  const Icon = props.icon;
  return (
    <a {...props} className={cx(props.className, 't-icon-link')}>
      <Icon />
      {React.Children.only(props.children)}
    </a>
  );
};

IconLink.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]).isRequired
};

export default IconLink;
