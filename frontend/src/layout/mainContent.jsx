import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import MovieCard from '../components/movieCard'

class MainContent extends Component {

    constructor(props) {
        super(props);
        this.state = { term: '', movies: [] };
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
                        movies.map((movie, i) => <MovieCard key={i} data={movie} isFavorite={i % 2 === 0} />)
                }
            </div>
        );
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.term !== prevProps.search.term) {
            this.fetchAllMovies(prevProps.search.term);
        }
    }

    fetchAllMovies(term) {
        axios.get(`http://www.omdbapi.com/?apikey=471a8a8a&s=/${term}`)
            .then(res => {
                const movies = res.data.Search;
                this.setState({ term, movies });
            })
    }
}

const mapStateToProps = state => ({ search: state.search })
export default connect(mapStateToProps, null)(MainContent)