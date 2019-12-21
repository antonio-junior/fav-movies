/* eslint-disable react/prefer-stateless-function */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { toast } from 'react-toastify';

import MovieItem from '../Movies/MovieItem';
import OMDb from '../../services/OMDb';
import Api from '../../services/Api';
import Loader from '../UI/Loader';
import './ContentContainer.css';

const ContentContainer = props => {
  const { query, isFavorite } = props;

  const [movies, setMovies] = useState(null);
  useEffect(() => {
    if (query === '') {
      setMovies([]);
      return;
    }

    const request = OMDb.search(query);

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
  if (favorites == null)
    Api.getAll().then(res => setFavorites(res.data.reverse()));

  const onClickFavorite = (imdbid, favoriteid) => {
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

  const showMovies = moviesToShow => {
    if (moviesToShow == null || favorites == null) {
      return <Loader />;
    }

    if (moviesToShow.length === 0) {
      return 'No movies to show';
    }

    return moviesToShow.map(({ imdbid, poster, title, _id }) => {
      const favorite = favorites.find(f => f.imdbid === imdbid);
      const associatedFavoriteId = favorite ? favorite._id : undefined;
      return (
        <MovieItem
          key={imdbid}
          poster={poster}
          title={title}
          imdbid={imdbid}
          onClickFavorite={() =>
            onClickFavorite(imdbid, _id || associatedFavoriteId)
          }
          favorite={favorite !== undefined}
          favoriteid={_id}
        />
      );
    });
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
