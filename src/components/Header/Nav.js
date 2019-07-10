import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';


import HeaderLink from './HeaderLink';

import './Nav.css';

const Nav = ({ className, intl }) => (
  <nav className={cx(className, 'topbar-nav')}>
    <HeaderLink exact to="/" className="topbar-nav__item">
      <FormattedMessage
        id={'Header.dashboard'}
        defaultMessage={'Dashboard'}
      />
    </HeaderLink>
    <HeaderLink to="/my-forests" className="topbar-nav__item">
      <FormattedMessage
        id={'Header.forests'}
        defaultMessage={'Forests'}
      />
    </HeaderLink>
    <HeaderLink to="/calculator" className="topbar-nav__item">
      <FormattedMessage
        id={'Header.sources'}
        defaultMessage={'My CO² Sources'}
      />
    </HeaderLink>
    <HeaderLink to="/create-forest" className="topbar-nav__item">
      <FormattedMessage
        id={'Header.create'}
        defaultMessage={'Create Forest'}
      />
    </HeaderLink>

    <div className="topbar-nav__external">
      <HeaderLink
        className="topbar-nav__item"
        to={intl.formatMessage({id: 'localizedLink.tos'})}
        target="_blank">
        <FormattedMessage
          id={'tosMessages.tosShort'}
        />
      </HeaderLink>
      <HeaderLink
        className="topbar-nav__item"
        to={intl.formatMessage({id: 'localizedLink.how'})}
        target="_blank">
        <FormattedMessage
          id={'externalLinks.how'}
        />
      </HeaderLink>
      <HeaderLink
        className="topbar-nav__item"
        to={intl.formatMessage({id: 'localizedLink.contact'})}
        target="_blank">
        <FormattedMessage
          id={'externalLinks.contacts'}
        />
      </HeaderLink>
    </div>

  </nav>
);

Nav.propTypes = {
  className: PropTypes.string,
  intl: intlShape,
};

export default injectIntl(Nav);
