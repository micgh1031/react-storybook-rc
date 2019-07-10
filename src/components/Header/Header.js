import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { Link } from 'react-router-dom';

import Topbar from '../Layout/Topbar/Topbar';

import Nav from './Nav';
import User from './User';
import Guest from './Guest';

import Logo from '../UI/Logo/Logo';

import './Header.css';

class Header extends Component {
  constructor(props){
    super(props);

    this.state = {
      isOpen: false,
      navHeight: 0,
    };

    this.updatedHeight = this.updatedHeight.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updatedHeight);
    window.addEventListener("toggleNav", this.toggleNav);
    this.setContainerHeight();
  }

  componentWillUnount(){
    window.removeEventListener("resize", this.updatedHeight);
    window.removeEventListener("toggleNav", this.toggleNav);
  }

  setContainerHeight() {
    if(this.parentContainer) {
      this.setState({
        navHeight: this.parentContainer.offsetHeight,
      });
    }
  }

  updatedHeight() {
    this.setContainerHeight();
  }

  toggleNav() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  render() {
    const {
      isUserPopupOpen,
      toggleUserDropDown,
      user,
      logout,
      history
    } = this.props;

    const {
      isOpen,
      navHeight,
    } = this.state;

    if(history.location.pathname === "/ks-register") {
      return (
        <div
          className="topbar-container"
          ref={element => this.parentContainer = element}
          style={{
            marginTop: isOpen ? 0 : -navHeight
          }}
          >
          <Topbar className="topbar">
            <div className="topbar__branding">
              <Logo className="topbar__logo"/>
            </div>
          </Topbar>
        </div>
      );
    }

    return (
      <div
        className="topbar-container"
        ref={element => this.parentContainer = element}
        style={{
          marginTop: isOpen ? 0 : -navHeight
        }}
        >
        <Topbar className="topbar">
          <div className="topbar__branding">
            <Link to="/">
              <Logo className="topbar__logo"/>
            </Link>
          </div>

          <Nav className="topbar__nav" />

          {
            isEmpty(user) ?
            <Guest className="topbar__guest" />
            :
            <User
              className="topbar__user"
              user={user}
              isUserPopupOpen={isUserPopupOpen}
              toggleUserDropDown={toggleUserDropDown}
              logout={logout}
            />
          }

        </Topbar>
      </div>
    );
  }
}

Header.propTypes = {
  isUserPopupOpen: PropTypes.bool.isRequired,
  toggleUserDropDown: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object,
};

export default Header;
