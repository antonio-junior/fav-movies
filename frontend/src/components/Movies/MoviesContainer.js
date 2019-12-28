import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import { toast } from 'react-toastify';

import MovieList from './MovieList';
import OMDb from '../../services/OMDb';
import Api from '../../services/Api';
import Auth from '../../services/Auth';
import { QueryContext } from '../../helpers/QueryStore';
import './MoviesContainer.css';

const MoviesContainer = props => {
  const { isFavorite } = props;
  const { query } = React.useContext(QueryContext);
  const loggedEmail = Auth.getStoredUser().email;

  const [movies, setMovies] = useState(null);
  useEffect(() => {
    if (query === '') {
      setMovies([]);
      return;
    }

    const request = OMDb.search(query);

    request
      .then(res => {
        const normalizeAttributes = movie =>
          Object.fromEntries(
            Object.entries(movie).map(([k, v]) => [k.toLowerCase(), v]),
          );

        const movieList = res.map(movie => normalizeAttributes(movie));
        setMovies(movieList);
      })
      .catch(err => toast(err));
  }, [query]);

  const [favorites, setFavorites] = useState(null);
  if (favorites == null)
    Api.getAll(loggedEmail).then(res => setFavorites(res.data.reverse()));

  const onClickFavorite = (imdbid, favoriteid) => {
    if (favorites.find(f => f.imdbid === imdbid) === undefined) {
      const movie = movies.find(m => m.imdbid === imdbid);
      OMDb.find(imdbid).then(res => {
        const info = {
          plot: res.Plot,
          country: res.Country,
          genre: res.Genre,
          owner: loggedEmail,
          ...movie,
        };

        Api.insert(info).then(resp => {
          toast('Favorite added successfully!');
          setFavorites(favorites.concat(resp.data));
        });
      });
    } else {
      Api.delete(favoriteid).then(
        toast('Favorite deleted successfully!'),
        setFavorites(favorites.filter(f => f._id !== favoriteid)),
      );
    }
  };

  return (
    <Container>
      <h1>{isFavorite ? 'Favorites' : 'Movies'}</h1>

      <MovieList
        movies={isFavorite ? favorites : movies}
        favorites={favorites}
        onClickFavorite={onClickFavorite}
      />
    </Container>
  );
};

MoviesContainer.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
};

export default MoviesContainer;
