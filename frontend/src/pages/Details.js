import PrimereactStyle from '@bit/primefaces.primereact.internal.stylelinks';
import { Rating } from '@bit/primefaces.primereact.rating';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import Heart from '../components/UI/Heart';
import Loader from '../components/UI/Loader';
import Api from '../services/Api';
import Auth from '../services/Auth';
import OMDb from '../services/OMDb';
import './Details.css';

const Details = () => {
  const { imdbid } = useParams();

  const loggedEmail = Auth.getStoredUser().email;

  const [movie, setMovie] = useState(null);
  const [favoriteid, setFavoriteId] = useState(null);

  if (movie == null) OMDb.find(imdbid).then(res => setMovie(res));
  if (favoriteid == null)
    Api.getFavoriteId(imdbid, loggedEmail).then(res => {
      if (res.length > 0) {
        const [value] = res;
        setFavoriteId(value._id);
      } else {
        setFavoriteId('');
      }
    });

  const onClickFavorite = () => {
    if (!favoriteid) {
      const info = {
        plot: movie.Plot,
        country: movie.Country,
        genre: movie.Genre,
        owner: loggedEmail,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
        imdbid: movie.imdbID,
      };

      Api.insert(info).then(resp => {
        toast('Favorite added successfully!');
        setFavoriteId(resp.data._id);
      });
    } else {
      Api.delete(favoriteid).then(
        toast('Favorite deleted successfully!'),
        setFavoriteId(''),
      );
    }
  };

  return (
    <Container>
      <PrimereactStyle />
      {!movie && <Loader />}
      {movie && (
        <>
          <Row>
            <Col xs={9} sm={10} md={10} lg={10}>
              <h1>{movie.Title}</h1>
            </Col>
            <Col xs={3} sm={2} md={2} lg={2}>
              <Button
                style={{ marginTop: '6px' }}
                onClick={() => window.history.go(-1)}
              >
                Back
              </Button>
            </Col>
          </Row>
          <Row>
            <Col sm={4}>
              <div className="img-details">
                <img src={movie.Poster} alt={movie.Title} />
              </div>
            </Col>
            <Col sm={8}>
              <div className="content-details">
                <br />
                <Rating
                  value={Math.round(movie.imdbRating)}
                  readonly
                  stars={10}
                  cancel={false}
                />
                {favoriteid !== null && (
                  <Heart
                    liked={favoriteid !== ''}
                    onClickFavorite={onClickFavorite}
                  />
                )}
                <h4>{movie.Genre.replace(new RegExp(',', 'g'), ' |')}</h4>
                <p>{movie.Plot}</p>
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Details;
