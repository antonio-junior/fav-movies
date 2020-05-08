import PropTypes from 'prop-types';
import React from 'react';
import CardColumns from 'react-bootstrap/CardColumns';

import Loader from '../UI/Loader';
import MovieItem from './MovieItem';

const MovieList = ({ movies, favorites, onClickFavorite, hasError }) => {
  if (movies == null || favorites == null) {
    return <Loader />;
  }

  if (movies.length === 0) {
    return 'No movies to show';
  }

  return (
    <CardColumns>
      {movies.map(({ imdbid, poster, title, _id }) => {
        let favoriteid = _id;
        let fullPoster = poster;
        if (!favoriteid) {
          const favorite = favorites.find(f => f.imdbid === imdbid);
          favoriteid = favorite ? favorite._id : undefined;
          fullPoster = favorite ? favorite.poster : poster;
        }

        return (
          <MovieItem
            key={imdbid}
            poster={fullPoster}
            title={title}
            imdbid={imdbid}
            onClickFavorite={() => onClickFavorite(imdbid, favoriteid)}
            favoriteid={favoriteid}
            hasError={hasError}
          />
        );
      })}
    </CardColumns>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array,
  favorites: PropTypes.array,
  onClickFavorite: PropTypes.func.isRequired,
};

MovieList.defaultProps = {
  movies: null,
  favorites: null,
};

export default MovieList;
