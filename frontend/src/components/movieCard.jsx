import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Tooltip from '@material-ui/core/Tooltip';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import ImgNotAvailable from '../resources/na_not_available.png'

export default props => {
    return (
        <Card className="movieCard">
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={props.data.Title}
                    height="140"
                    image={props.data.Poster !== "N/A" ? props.data.Poster : ImgNotAvailable}
                    title={props.data.Title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" className="h2-movie">
                        {props.data.Title}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions >
                <CardActions disableSpacing>
                    <Tooltip placement="top" title={props.isFavorite ? "You Liked" : "Like!"}>
                        <IconButton aria-label="add to favorites" className="actionButton">
                            {
                                props.isFavorite 
                                ? <FavoriteIcon className="redIcon"/>
                                : <FavoriteBorderIcon />
                            }
                        </IconButton>
                    </Tooltip>
                    <Tooltip placement="top" title="Details">
                        <IconButton aria-label="details" className="actionButton">
                            <ControlPointIcon />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </CardActions>
        </Card>
    );
}
