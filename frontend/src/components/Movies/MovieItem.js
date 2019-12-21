import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as like } from '@fortawesome/free-solid-svg-icons';
import { faHeart as notLike } from '@fortawesome/free-regular-svg-icons';

import CarouselContainer from '../UI/CarouselContainer';
import './MovieItem.css';

const MovieItem = ({
  poster,
  title,
  favorite,
  imdbid,
  onClickFavorite,
  favoriteid,
}) => {
  return (
    <Col xs>
      <Card className="summary-card" style={{ width: '18rem' }}>
        <CarouselContainer poster={poster} />

        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <FontAwesomeIcon
            className={`button-item heart-icon ${favorite ? 'like' : ''}`}
            icon={favorite ? like : notLike}
            onClick={onClickFavorite}
          />
          <Button variant="primary" className="button-item">
            <Link style={{ color: '#fff' }} to={`/movie/${imdbid}`}>
              Details
            </Link>
          </Button>
          {favorite && (
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
  favoriteid: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired,
  onClickFavorite: PropTypes.func.isRequired,
};

export default MovieItem;
