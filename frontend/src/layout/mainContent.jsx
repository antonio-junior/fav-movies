import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import MovieCard from '../components/movieCard'
import { fetchFavorites } from '../actions/FavoritesActions'

class MainContent extends Component {

    constructor(props) {
        super(props);
        this.state = { term: '', movies: [] };

        this.props.fetchFavorites()
    }

    render() {
        const { movies } = this.state;
        
        return (
            <div className="contentWrapper">
                {
                    (!movies || movies.length === 0)
                        ?
                        (<Typography color="textSecondary" align="center">
                            No movies to show
                        </Typography>)
                        :
                        movies.map((movie, i) =>
                            <MovieCard
                                key={i}
                                data={movie}
                                favorite={this.props.favorites.list.find(f => f.imdbid === movie.imdbid)} />)
                }
            </div>
        );
    }

    normalizeAttributes(movie) {
        return Object.fromEntries(
            Object.entries(movie).map(([k, v]) => [k.toLowerCase(), v])
        );
    }

    componentDidUpdate(prevProps, prevState) {
        
        if (prevProps.sections.actual !== this.props.sections.actual ||
            prevProps.favorites.list.length != this.props.favorites.list.length) {
            if (this.props.sections.actual === 'Favorites') {
                this.fetchAllMovies(this.props.search.term, "data");
            } else {
                this.fetchAllMovies('', "data.Search");
            }
        }

        if (this.props.search.term !== this.state.term) {
            this.fetchAllMovies(this.props.search.term, "data.Search");
        }
    }

    fetchAllMovies(term, data) {
        axios.get(this.props.url).then(res => {
            if (!res.data.Error) {
                const parts = data.split('.');
                const resMovies = parts.length > 1 ? res[parts[0]][parts[1]] : res.data;
                const movies = resMovies.map(movie => this.normalizeAttributes(movie));
                this.setState({ term, movies });
            }
        })
    }
}

const mapStateToProps = state => ({ sections: state.sections, search: state.search, favorites: state.favorites })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchFavorites }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(MainContent)