import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as like } from '@fortawesome/free-solid-svg-icons';
import { faHeart as notLike } from '@fortawesome/free-regular-svg-icons'

import './MovieItem.css'

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
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={poster} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
            <span
              favoriteid={favoriteid}
              imdbid={imdbid}
              onClick={onClickFavorite}>
                <FontAwesomeIcon 
                  className={`heart-icon ${favorite ? 'like' : ''}`} 
                  icon={favorite ? like : notLike} 
              />
            </span>         
          <Button variant="primary">
            <Link
              style={{ color: '#fff' }}
              to={`/movie/${imdbid}`}
            >
              Details
            </Link>
          </Button>
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
  favorite: PropTypes.bool.isRequired,
  onClickFavorite: PropTypes.func.isRequired,
};

MovieItem.defaultProps = {
  favoriteid: '',
};

export default MovieItem;
