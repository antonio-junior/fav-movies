import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { toastr } from 'react-redux-toastr'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ImageIcon from '@material-ui/icons/Image';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

import ImgNotAvailable from '../resources/na_not_available.png'
import { fetchFavorites } from '../actions/FavoritesActions'
import Modal from '../components/modal'
import consts from '../consts'

class MovieCard extends Component {
    constructor(props) {
        super(props);

        this.state = { openModal: false, plot: '' }
    }

    render() {
        return (
            <Card className="movieCard">
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={this.props.data.title}
                        height="140"
                        image={this.props.data.poster !== "N/A" ? this.props.data.poster : ImgNotAvailable}
                        title={this.props.data.title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" className="h2-movie">
                            {this.props.data.title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <Modal title={this.props.data.title}
                    plot={this.state.plot}
                    open={this.state.openModal}
                    onClose={(e) => this.handleCloseModal(e)} />
                <CardActions >
                    <CardActions disableSpacing>
                        <Tooltip placement="top" title={this.props.favorite ? "You Liked" : "Like!"}>
                            <IconButton aria-label="add to favorites" className="actionButton"
                                onClick={(e) => this.handleFavoriteClick(e)} >
                                {
                                    this.props.favorite
                                        ? <FavoriteIcon className="redIcon" />
                                        : <FavoriteBorderIcon />
                                }
                            </IconButton>
                        </Tooltip>
                        <Tooltip placement="top" title="Details">
                            <IconButton aria-label="details" className="actionButton"
                                onClick={(e) => this.handleDetails(e)} >
                                <ControlPointIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip placement="top" title={this.props.data.poster}>
                            <IconButton aria-label="details" className="actionButton"
                                onClick={(e) => window.open(this.props.data.poster)} >
                                <ImageIcon />
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                </CardActions>
            </Card>
        );
    }

    handleCloseModal(e) {
        this.setState({ openModal: false });
    }

    async handleDetails(e) {
        let plot = this.props.data.plot;
        
        if (!plot) {
            const { data } = await this.getDetails();
            plot = data.Plot;
        }

        this.setState({ openModal: true, plot});
    }

    async getDetails() {
        return await axios.get(
            `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&plot=full&i=${this.props.data.imdbid}`);
    }

    async getParams() {

        const { data } = await this.getDetails();

        const additionalInfo = {
            country: data.Country,
            genre: data.Genre,
            plot: data.Plot,
            owner: "dev",
            index: 0
        }

        return { ...this.props.data, ...additionalInfo };
    }

    handleOperation(promise) {
        promise.then(res => {
            toastr.success('Sucesso', 'Operação Realizada com sucesso.')
            this.props.fetchFavorites();
        }).catch(err => {
            toastr.error('Erro', `Erro ao realizar operação. (${err})`);
        });
    }

    async handleFavoriteClick(e) {
        if (this.props.favorite) {
            this.handleOperation(
                axios({
                    method: 'DELETE',
                    url: `${consts.FAV_MOVIES_URL}/favmovies/${this.props.favorite._id}`
                }))
        } else {
            const params = await this.getParams();
            this.handleOperation(
                axios.post(`${consts.FAV_MOVIES_URL}/favmovies`, params)
            )
        }
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchFavorites }, dispatch)
export default connect(null, mapDispatchToProps)(MovieCard)