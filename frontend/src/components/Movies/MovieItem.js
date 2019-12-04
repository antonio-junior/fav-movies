import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';

const MovieItem = ({
  poster,
  title,
  favorite,
  imdbid,
  onClickFavorite,
  favoriteid,
}) => (
  <Col xs>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={poster} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Button
          variant="primary"
          favoriteid={favoriteid}
          imdbid={imdbid}
          onClick={onClickFavorite}
        >
          {favorite ? 'Yes' : 'No'}
        </Button>
      </Card.Body>
    </Card>
  </Col>
);

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
