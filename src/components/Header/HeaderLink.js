import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';

import Text from '../UI/Text/Text';
import { toggleNav } from '../../constants/customEvents';

import './HeaderLink.css';

const HeaderLink = props => (
  <Text>
    <NavLink
      {...props}
      className={cx(props.className, 'header-link')}
      activeClassName="active"
      onClick={() => {
        if(window.innerWidth <= 768) dispatchEvent(toggleNav);
      }}
    />
  </Text>
);

HeaderLink.propTypes = {
  className: PropTypes.string
};

export default HeaderLink;
