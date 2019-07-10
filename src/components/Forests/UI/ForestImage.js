import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import Enlarge from '../../UI/Icons/Enlarge';

import './ForestImage.css';

const ForestImage = ({ className, isFetching, image, openGallery }) => (
  <div
    className={cx(
      className,
      'forest-details-image',
      { 'forest-details-image--fetching': isFetching }
    )}
    onClick={() => { openGallery(); }}
    >
    <div
      className="forest-details-image__image"
      style={{
        backgroundImage: `url(${image})`
      }}
    />
    <Enlarge className="forest-details-image__icon" />
  </div>
);

ForestImage.propTypes = {
  isFetching: PropTypes.bool,
  className: PropTypes.string,
  image: PropTypes.string.isRequired,
  openGallery: PropTypes.func.isRequired,
};

export default ForestImage;
