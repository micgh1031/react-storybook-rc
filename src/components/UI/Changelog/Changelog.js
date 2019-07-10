import React from 'react';
import { FormattedMessage } from 'react-intl';

import './Changelog.css';

const Changelog = () => {
  return (
    <div className="changelog">
      <FormattedMessage
        id={'Changelog.message'}
        defaultMessage={"This is a private beta. Expect frequent changes."}
      />
      <a
        className="changelog__link"
        href="https://docs.google.com/document/d/1rHkty9_2bySTmnApJRox_2d4NqRJ7HDDu42M0zq3WhE/edit?usp=sharing"
        target="_blank"
        rel="noopener noreferrer">
        Version 0.1.4
      </a>
    </div>
  );
};

export default Changelog;
