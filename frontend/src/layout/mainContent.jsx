import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import MovieCard from '../components/movieCard';
import fetchFavorites from '../actions/favoritesActions';

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = { term: '', movies: [] };

    const { fetchFavorites: fetchFavoritesCall } = this.props;
    fetchFavoritesCall();
  }

  // eslint-disable-next-line no-unused-vars
  componentDidUpdate(prevProps, prevState) {
    const { sections, favorites, search } = this.props;
    const { sections: prevSections, favorites: prevFavorites } = prevProps;

    if (
      prevSections.actual !== sections.actual ||
      prevFavorites.list.length !== favorites.list.length
    ) {
      if (sections.actual === 'Favorites') {
        this.fetchAllMovies(search.term, 'data');
      } else {
        this.fetchAllMovies('', 'data.Search');
      }
    }

    const { term } = this.state;
    if (search.term !== term) {
      this.fetchAllMovies(search.term, 'data.Search');
    }
  }

  fetchAllMovies(term, data) {
    const { url } = this.props;

    const normalizeAttributes = movie =>
      Object.fromEntries(
        Object.entries(movie).map(([k, v]) => [k.toLowerCase(), v]),
      );

    axios.get(url).then(res => {
      if (!res.data.Error) {
        const parts = data.split('.');
        const resMovies = parts.length > 1 ? res[parts[0]][parts[1]] : res.data;
        const movies = resMovies.map(movie => normalizeAttributes(movie));
        this.setState({ term, movies });
      } else {
        this.setState({ term, movies: [] });
      }
    });
  }

  render() {
    const { movies } = this.state;
    const { favorites } = this.props;

    return (
      <div className="contentWrapper">
        {(!movies || movies.length === 0) && (
          <Typography color="textSecondary" align="center">
            No movies to show
          </Typography>
        )}

        {movies &&
          movies.map(movie => (
            <MovieCard
              key={movie.imdbid}
              data={movie}
              favorite={
                favorites.list.find(f => f.imdbid === movie.imdbid) !==
                undefined
              }
            />
          ))}
      </div>
    );
  }
}

MainContent.propTypes = {
  fetchFavorites: PropTypes.func.isRequired,
  favorites: PropTypes.shape({ list: PropTypes.array.isRequired }).isRequired,
  url: PropTypes.string.isRequired,
  sections: PropTypes.shape({ actual: PropTypes.string.isRequired }).isRequired,
  search: PropTypes.shape({
    term: PropTypes.string.isRequired,
    movies: PropTypes.array.isRequired,
  }).isRequired,
};

const mapStateToProps = state => ({
  sections: state.sections,
  search: state.search,
  favorites: state.favorites,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchFavorites }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MainContent);
