import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import CloseSidebar from '../../UI/Icons/CloseSidebar';
import { closeSidebar } from '../../../constants/customEvents';

import './SidebarToggle.css';

const SidebarToggle = ({
  className,
  ...props,
}) => (
  <div {...props}
    className={cx(className, 'sidebar-toggle')}
    onClick={() => dispatchEvent(closeSidebar)}>
    <CloseSidebar/>
  </div>
);

SidebarToggle.propTypes = {
  className: PropTypes.string,
};

export default SidebarToggle;
