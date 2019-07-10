import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getUserDetails } from '../selectors/userSession';
import { getIsUserPopupOpen, getLoadStatus } from '../selectors/UI';

import { toggleUserDropDown } from '../actions/UI';
import { logout } from '../actions/userSession';
import { addAlert } from '../actions/alerts';
import history from '../setup/history';

import Header from '../components/Header/Header';

class HeaderContainer extends Component {
  handleLogout() {
    const { addAlert, logout } = this.props;

    logout();
    addAlert({
      type: 'info',
      message: 'Successfully logged out',
      dismissAfter: 3000
    });
    history.push('/login');
  }

  render() {
    const { loadStatus } = this.props;
    if(loadStatus === 'loading') {
      return null;
    }
    return (
      <Header
        {...this.props}
        logout={this.handleLogout.bind(this)}
      />
    );
  }
}

const mapStateToProps = state => ({
  user: getUserDetails(state),
  isUserPopupOpen: getIsUserPopupOpen(state),
  loadStatus: getLoadStatus(state),
});

HeaderContainer.propTypes = {
  isUserPopupOpen: PropTypes.bool.isRequired,
  toggleUserDropDown: PropTypes.func.isRequired,
  loadStatus: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  addAlert: PropTypes.func.isRequired,
  history: PropTypes.object,
};

export default connect(
  mapStateToProps,
  { toggleUserDropDown, logout, addAlert }
)(HeaderContainer);
