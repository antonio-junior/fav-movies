import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import PropTypes from 'prop-types';

const CarouselContainer = ({ poster }) => {
  const images = poster.split(',');

  return (
    <Carousel>
      {images.map((imageItem, index) => (
        <Carousel.Item key={`${imageItem}`}>
          <img
            className="d-block w-100"
            src={imageItem}
            alt={`carousel item ${index}`}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

CarouselContainer.propTypes = {
  poster: PropTypes.string.isRequired,
};

export default CarouselContainer;
