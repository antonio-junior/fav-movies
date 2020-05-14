import PropTypes from 'prop-types';
import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

import './styles.css';

const CarouselContainer = ({ poster }) => {
  const images = poster.split(',');

  return (
    <Carousel>
      {images.map((imageItem, index) => (
        <Carousel.Item key={`${imageItem}`} interval={2000}>
          <a href={imageItem}>
            <img
              className="d-block w-100"
              src={imageItem}
              alt={`carousel item ${index}`}
            />
          </a>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

CarouselContainer.propTypes = {
  poster: PropTypes.string.isRequired,
};

export default CarouselContainer;
