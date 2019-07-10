import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import Popover from '../UI/Popover/Popover';

import './UserDropdown.css';

const UserDropdown = ({intl, className, logout }) => (
  <Popover
    className={cx(className, 'user-dropdown')}
    direction="down">
    <Link to="/account" className="user-dropdown__item">
      <FormattedMessage
        id={'Header.account'}
        defaultMessage={'Account'}
      />
    </Link>
    <a onClick={logout} className="user-dropdown__item">
      <FormattedMessage
        id={'Header.logout'}
      />
    </a>
    <div className="user-dropdown__external">
      <Link
        to={intl.formatMessage({id: 'localizedLink.tos'})}
        target="_blank"
        className="user-dropdown__item">
        <FormattedMessage
          id={'tosMessages.tosShort'}
          defaultMessage={"Terms of Service"}
        />
      </Link>
      <Link
        to={intl.formatMessage({id: 'localizedLink.how'})}
        target="_blank"
        className="user-dropdown__item">
        <FormattedMessage
          id={'externalLinks.how'}
          defaultMessage={"How it Works"}
        />
      </Link>
      <Link
        to={intl.formatMessage({id: 'localizedLink.contact'})}
        target="_blank"
        className="user-dropdown__item">
        <FormattedMessage
          id={'externalLinks.contacts'}
          defaultMessage={"Contact Us"}
        />
      </Link>
    </div>
  </Popover>
);

UserDropdown.propTypes = {
  className: PropTypes.string,
  logout: PropTypes.func.isRequired,
  intl: intlShape,
};

export default injectIntl(UserDropdown);
