import PropTypes from 'prop-types';
import React, { useState, useEffect, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import { toast } from 'react-toastify';

import { AppContext } from '../../../helpers/AppStore';
import Api from '../../../services/Api';
import Auth from '../../../services/Auth';
import OMDb from '../../../services/OMDb';
import MovieList from '../MovieList';
import './styles.css';

const MoviesContainer = props => {
  const { isFavorite } = props;
  const { query, favorites, setFavorites, hasError } = useContext(AppContext);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (query === '') {
      setMovies([]);
      return;
    }

    OMDb.search(query)
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

  const onClickFavorite = (imdbid, favoriteid) => {
    if (favorites.find(f => f.imdbid === imdbid) === undefined) {
      const movie = movies.find(m => m.imdbid === imdbid);
      OMDb.find(imdbid).then(res => {
        const info = {
          plot: res.Plot,
          country: res.Country,
          genre: res.Genre,
          owner: Auth.getStoredUser().email,
          ...movie,
        };

        Api.insert(info).then(resp => {
          toast('Movie added to favorites.');
          setFavorites(favorites.concat(resp.data));
        });
      });
    } else {
      Api.delete(favoriteid).then(
        toast('Movie deleted from favorites.'),
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
        hasError={hasError != null}
      />
    </Container>
  );
};

MoviesContainer.propTypes = {
  isFavorite: PropTypes.bool.isRequired,
};

export default MoviesContainer;
