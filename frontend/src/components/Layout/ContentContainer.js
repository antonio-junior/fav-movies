/* eslint-disable react/prefer-stateless-function */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import MovieItem from '../Movies/MovieItem';
import OMDb from '../../services/OMDb';
import Api from '../../services/Api';
import './ContentContainer.styles.css';

const ContentContainer = props => {
  const { query, isFavorite } = props;
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const request = OMDb.search(query);

    if (query === '') {
      setMovies([]);
      return;
    }

    request.then(res => {
      const normalizeAttributes = movie =>
        Object.fromEntries(
          Object.entries(movie).map(([k, v]) => [k.toLowerCase(), v]),
        );

      const movieList = res.map(movie => normalizeAttributes(movie));
      setMovies(movieList);
    });
  }, [query]);

  const [favorites, setFavorites] = useState(null);
  if (favorites == null) Api.getAll().then(res => setFavorites(res.data));

  const onClickFavorite = e => {
    const imdbid = e.target.getAttribute('imdbid');

    if (favorites.find(f => f.imdbid === imdbid) === undefined) {
      const movie = movies.find(m => m.imdbid === imdbid);
      OMDb.find(imdbid).then(res => {
        const info = {
          plot: res.Plot,
          country: res.Country,
          genre: res.Genre,
          owner: 'xxxxxxx',
          ...movie,
        };

        Api.insert(info).then(setFavorites(favorites.concat(info)));
      });
    } else {
      const favoriteid = e.target.getAttribute('favoriteid');
      Api.delete(favoriteid).then(
        setFavorites(favorites.filter(f => f._id !== favoriteid)),
      );
    }
  };

  const showMovies = moviesToShow => {
    if (!moviesToShow || moviesToShow.length === 0) {
      return 'No movies to show';
    }

    return moviesToShow.map(movie => (
      <MovieItem
        key={movie.imdbid}
        poster={movie.poster}
        title={movie.title}
        imdbid={movie.imdbid}
        favoriteid={movie._id}
        onClickFavorite={e => onClickFavorite(e)}
        favorite={favorites.find(f => f.imdbid === movie.imdbid) !== undefined}
      />
    ));
  };

  return (
    <Container>
      <h1>{isFavorite ? 'Favorites' : 'Movies'}</h1>
      <Row>{showMovies(isFavorite ? favorites : movies)}</Row>
    </Container>
  );
};

ContentContainer.propTypes = {
  query: PropTypes.string,
  isFavorite: PropTypes.bool.isRequired,
};

ContentContainer.defaultProps = {
  query: '',
};

export default ContentContainer;
