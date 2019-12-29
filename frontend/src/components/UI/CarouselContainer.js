import PropTypes from 'prop-types';
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const CarouselContainer = ({ poster }) => {
  const images = poster.split(',');

  return (
    <Carousel>
      {images.map((imageItem, index) => (
        <Carousel.Item key={`${imageItem}`} interval={2000}>
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
