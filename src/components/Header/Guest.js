import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router';

import { getCurrentUrlEncoded } from '../../utils/url';
import { toggleNav } from '../../constants/customEvents';

import HeaderLink from './HeaderLink';
import ButtonLink from '../UI/Button/ButtonLink';

import './Guest.css';

const Guest = ({className, location: { pathname, search }}) => {
  return (
    <div className={cx(className, 'topbar-guest')}>
      <HeaderLink
        to={`/login?next=${getCurrentUrlEncoded(pathname, search)}`}
        className="topbar-guest__item"
        >
        <FormattedMessage
          id={'Header.login'}
          defaultMessage={'Login'}
        />
      </HeaderLink>
      <ButtonLink
        onClick={() => {
          if(window.innerWidth <= 768) dispatchEvent(toggleNav);
        }}
        className="topbar-guest__item"
        to="/register">
        <FormattedMessage
          id={'Header.register'}
          defaultMessage={'Register'}
        />
      </ButtonLink>
    </div>
  );
};

Guest.propTypes = {
  className: PropTypes.string,
  location: PropTypes.object.isRequired,
};

export default withRouter(Guest);
