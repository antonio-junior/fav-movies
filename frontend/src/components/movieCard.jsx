import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
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

class MovieCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card className="movieCard">
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={this.props.data.Title}
                        height="140"
                        image={this.props.data.Poster !== "N/A" ? this.props.data.Poster : ImgNotAvailable}
                        title={this.props.data.Title}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" className="h2-movie">
                            {this.props.data.Title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
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
                            <IconButton aria-label="details" className="actionButton">
                                <ControlPointIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip placement="top" title={this.props.data.Poster}>
                            <IconButton aria-label="details" className="actionButton"
                                onClick={(e) => window.open(this.props.data.Poster)} >
                                <ImageIcon />
                            </IconButton>
                        </Tooltip>
                    </CardActions>
                </CardActions>
            </Card>
        );
    }

    getParams() {
        const additionalInfo = {
            owner: "dev",
            index: 0
        };

        let params = Object.fromEntries(
            Object.entries(this.props.data).map(([k, v]) => [k.toLowerCase(), v])
        );

        return { ...params, ...additionalInfo };
    }

    handleFavoriteClick(e) {
        if (this.props.favorite) {
            axios({
                method: 'DELETE',
                url: `http://localhost:3003/api/favmovies/${this.props.favorite._id}`
            }).then(res => {
                this.props.fetchFavorites();
            })

        } else {
            axios.post(`http://localhost:3003/api/favmovies`, this.getParams())
                .then(res => {
                    this.props.fetchFavorites();
                })
        }
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchFavorites }, dispatch)
export default connect(null, mapDispatchToProps)(MovieCard)