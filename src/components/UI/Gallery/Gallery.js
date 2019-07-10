import React from 'react';
import PropTypes from 'prop-types';

import Previous from '../../UI/Icons/Previous';
import Next from '../../UI/Icons/Next';
import Close from '../../UI/Icons/Close';
import Heading from '../../UI/Text/HeadingSmall';
import Text from '../../UI/Text/Text';

import './Gallery.css';

const Gallery = ({
  gallery,
  closeGallery,
  index,
  next,
  previous,
}) => (
  <div className="reforestum-gallery">

    <div className="reforestum-gallery__gallery">
      <div className="reforestum-gallery__inner" style={{
        transform: `translateX(${index % gallery.length * -100}%)`
      }}>
        {gallery.map(item => (
          <div
          className="reforestum-gallery__slide"
          key={item.URI}>
            <Heading
              className="reforestum-gallery__text"
              color="white">
              {item.title}
            </Heading>
            <div
              className="reforestum-gallery__image"
              style={{ backgroundImage: `url(${item.URI})` }}
            />
            <Text
              className="reforestum-gallery__text"
              color="white">
              {item.description}
            </Text>
          </div>
        ))}
      </div>
    </div>

    <div className="reforestum-gallery__controls">
      <div className="reforestum-gallery__previous" onClick={previous}>
        <Previous />
      </div>
      <div className="reforestum-gallery__next" onClick={next}>
        <Next />
      </div>
    </div>

    <div onClick={closeGallery} className="reforestum-gallery__overlay" />

    <div onClick={closeGallery} className="reforestum-gallery__close">
      <Close />
    </div>

  </div>
);

Gallery.propTypes = {
  index: PropTypes.number.isRequired,
  next: PropTypes.func.isRequired,
  previous: PropTypes.func.isRequired,
  gallery: PropTypes.array.isRequired,
  closeGallery: PropTypes.func.isRequired,
};

export default Gallery;
