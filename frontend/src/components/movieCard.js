import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';
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
import PropTypes from 'prop-types';
import axios from 'axios';
import ImgNotAvailable from '../assets/na_not_available.png';
import fetchFavorites from '../actions/favoritesActions';
import consts from '../consts';
import Modal from './modal';

class MovieCard extends Component {
  constructor(props) {
    super(props);

    this.state = { openModal: false, plot: '' };
  }

  async getDetails() {
    const { data } = this.props;
    const response = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&plot=full&i=${data.imdbid}`,
    );
    return response.data;
  }

  async getParams() {
    const { Country, Genre, Plot } = await this.getDetails();
    const { data } = this.props;

    return {
      country: Country,
      genre: Genre,
      plot: Plot,
      owner: 'dev',
      index: 0,
      ...data,
    };
  }

  handleCloseModal() {
    this.setState({ openModal: false });
  }

  async handleDetails() {
    const { data } = this.props;
    let { plot } = data;

    if (!plot) {
      const newData = await this.getDetails();
      plot = newData.Plot;
    }

    this.setState({ openModal: true, plot });
  }

  handleOperation(promise) {
    promise
      .then(() => {
        toastr.success('Sucesso', 'Operação Realizada com sucesso.');
        const { fetchFavorites: fetchFavoritesCall } = this.props;
        fetchFavoritesCall();
      })
      .catch(err => {
        toastr.error('Erro', `Erro ao realizar operação. (${err})`);
      });
  }

  async handleFavoriteClick() {
    const { data, favorite } = this.props;
    if (favorite) {
      this.handleOperation(
        axios({
          method: 'DELETE',
          url: `${consts.FAV_MOVIES_URL}/favmovies/${data._id}`,
        }),
      );
    } else {
      const params = await this.getParams();
      this.handleOperation(
        axios.post(`${consts.FAV_MOVIES_URL}/favmovies`, params),
      );
    }
  }

  render() {
    const { data, favorite } = this.props;
    const { plot, openModal } = this.state;

    return (
      <Card className="movieCard">
        <CardActionArea>
          <CardMedia
            component="img"
            alt={data.title}
            height="140"
            image={data.poster !== 'N/A' ? data.poster : ImgNotAvailable}
            title={data.title}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              className="h2-movie"
            >
              {data.title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Modal
          title={data.title}
          plot={plot}
          open={openModal}
          onClose={e => this.handleCloseModal(e)}
        />
        <CardActions>
          <CardActions disableSpacing>
            <Tooltip placement="top" title={favorite ? 'You Liked' : 'Like!'}>
              <IconButton
                aria-label="add to favorites"
                className="actionButton"
                onClick={() => this.handleFavoriteClick()}
              >
                {favorite ? (
                  <FavoriteIcon className="redIcon" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </Tooltip>
            <Tooltip placement="top" title="Details">
              <IconButton
                aria-label="details"
                className="actionButton"
                onClick={() => this.handleDetails()}
              >
                <ControlPointIcon />
              </IconButton>
            </Tooltip>
            <Tooltip placement="top" title={data.poster}>
              <IconButton
                aria-label="details"
                className="actionButton"
                onClick={() => window.open(data.poster)}
              >
                <ImageIcon />
              </IconButton>
            </Tooltip>
          </CardActions>
        </CardActions>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  data: PropTypes.object.isRequired,
  favorite: PropTypes.bool.isRequired,
  fetchFavorites: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchFavorites }, dispatch);
export default connect(null, mapDispatchToProps)(MovieCard);
