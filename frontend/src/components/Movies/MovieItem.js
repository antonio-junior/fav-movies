import PropTypes from 'prop-types';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

import CarouselContainer from '../UI/CarouselContainer';
import Heart from '../UI/Heart';
import './MovieItem.css';

const MovieItem = ({ poster, title, imdbid, onClickFavorite, favoriteid }) => {
  return (
    <Col xs>
      <Card className="summary-card" style={{ width: '18rem' }}>
        <CarouselContainer poster={poster} />

        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Heart liked={favoriteid !== ''} onClickFavorite={onClickFavorite} />
          <Button variant="primary" className="button-item">
            <Link style={{ color: '#fff' }} to={`/movie/${imdbid}`}>
              Details
            </Link>
          </Button>
          {favoriteid && (
            <Button variant="secondary" className="button-item">
              <Link style={{ color: '#fff' }} to={`/edit/${favoriteid}`}>
                Add Photos
              </Link>
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

MovieItem.propTypes = {
  poster: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imdbid: PropTypes.string.isRequired,
  favoriteid: PropTypes.string,
  onClickFavorite: PropTypes.func.isRequired,
};

MovieItem.defaultProps = {
  favoriteid: '',
};

export default MovieItem;
