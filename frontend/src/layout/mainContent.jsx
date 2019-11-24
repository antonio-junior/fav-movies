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
                                favorite={this.props.favorites.list.find(f => f.imdbid === movie.imdbID)} />)
                }
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.search.term !== this.state.term) {
            this.fetchAllMovies(this.props.search.term);
        }
    }

    fetchAllMovies(term) {
        axios.get(`http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=/${term}`).then(res => {
            const movies = res.data.Search;
            this.setState({ term, movies });
        })
    }
}

const mapStateToProps = state => ({ search: state.search, favorites: state.favorites })
const mapDispatchToProps = dispatch => bindActionCreators({ fetchFavorites }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(MainContent)