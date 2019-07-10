import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';

import HeaderLink from './HeaderLink';
import UserDropdown from './UserDropdown';

import AvatarPlaceholder from '../../assets/images/avatar-placeholder.png';
import './User.css';

class User extends Component {
  constructor(props){
    super(props);

    this.state = {
      windowWidth: window.innerWidth,
    };

    this.setWindowWidth = this.setWindowWidth.bind(this);
  }

  componentDidMount() {
    this.setWindowWidth();
    window.addEventListener("resize", this.setWindowWidth);
  }

  setWindowWidth(){
    this.setState({
      windowWidth: window.innerWidth,
    });
  }

  render() {
    const {
      className,
      isUserPopupOpen,
      toggleUserDropDown,
      user,
      logout
    } = this.props;

    let { windowWidth } = this.state;

    return (
      <div tabIndex="0"
        className={cx(className, 'topbar-user')}
        onClick={() => windowWidth > 768 && toggleUserDropDown()}
        onKeyDown={e => { e.keyCode === 32 && toggleUserDropDown(); }}
        >
        <div className="topbar-user__name-photo">
          <div className="topbar-user__name">
            {
              windowWidth > 768 ?
              `${user.name} ${user.surname}`
              :
              <HeaderLink to="/account" className="topbar-nav__item">
                <FormattedMessage
                  id={'Header.account'}
                />
              </HeaderLink>
            }
          </div>
          <div className="topbar-user__photo" style={{
            backgroundImage: `url(${ user.avatar_url || AvatarPlaceholder })`
          }} />
        </div>
        {
          isUserPopupOpen &&
          <div className="topbar-user__dropdown-holder">
            <div className="topbar-user__dropdown-handler" />
            <UserDropdown
              className="topbar-user__dropdown"
              logout={logout}
            />
          </div>
        }
        { windowWidth <= 768 &&
          <span onClick={logout} className="topbar-nav__item header-link">
            <FormattedMessage
              id={'Header.logout'}
              defaultMessage={'Logout'}
            />
          </span>
        }
      </div>
    );
  }
}

User.propTypes = {
  className: PropTypes.string,
  isUserPopupOpen: PropTypes.bool.isRequired,
  toggleUserDropDown: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

export default User;
