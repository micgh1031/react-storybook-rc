import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Container from '../Container/Container';

import './CoverImage.css';

const CoverImage = ({
  className,
  img,
  ...other,
}) => (
  <Container
    {...other}
    className={cx(className, 'cover-image')}>
    <div
      className="cover-image__image"
      style={{
        backgroundImage: `url(${img})`
      }}
    />
  </Container>
);

CoverImage.propTypes = {
  className: PropTypes.string,
  img: PropTypes.string.isRequired
};

export default CoverImage;
