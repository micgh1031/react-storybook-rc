import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Tabs } from 'react-tabs';
import './Tabbed.css';

// This component is simply styling react-tabs
// It replaces it's Tabs Component
// https://github.com/reactjs/react-tabs

const Tabbed = ({ children, theme = 'default'}) => (
  <Tabs
    className={cx(
      'react-tabs',
      `react-tabs--${theme}`
    )}>
      {children}
    </Tabs>
);

Tabbed.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  theme: PropTypes.oneOf(['default', 'carbon'])
};

export default Tabbed;
