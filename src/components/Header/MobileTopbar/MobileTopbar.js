import  React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Box from 'react-layout-components';

import history from '../../../setup/history';

import Text from '../../UI/Text/Text';
import Logo from '../../UI/Logo/Logo';
import Toggle from '../../UI/Icons/Toggle';
import { toggleNav } from '../../../constants/customEvents';

import './MobileTopbar.css';
import { getLoadStatus} from "../../../selectors/UI";
import {connect} from "react-redux";

const MobileTopbar = ({
  children,
  className,
  loadStatus,
  ...props,
}) => {

  if(history.location.pathname === "/ks-register") {
    return (
      <div className={cx(className, 'mobile-topbar')}>
        <Box>
          <Logo className="mobile-topbar__logo" />
          <Text className="mobile-topbar__page-tracker">
            { children }
          </Text>
        </Box>
      </div>
    );
  }

  if(loadStatus !== 'active')
    return null;

  return (
    <div className={cx(className, 'mobile-topbar')}>
      <Box>
        <Link to="/">
          <Logo className="mobile-topbar__logo" />
        </Link>
        <Text className="mobile-topbar__page-tracker">
          { children }
        </Text>
      </Box>
      <div className="mobile-topbar__menu-toggle"
        ref={element => this.toggleNav = element}
        onClick={() => dispatchEvent(toggleNav)}>
        <Toggle />
      </div>
    </div>
  );
};

MobileTopbar.propTypes = {
  className: PropTypes.string,
  loadStatus: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]).isRequired,
};
const mapStateToProps = state => ({
  loadStatus: getLoadStatus(state),
});


export default connect(
  mapStateToProps,
)(MobileTopbar);
