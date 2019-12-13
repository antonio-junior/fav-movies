import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { Rating } from '@bit/primefaces.primereact.rating';
import PrimereactStyle from '@bit/primefaces.primereact.internal.stylelinks';

import OMDb from '../../services/OMDb';
import Loader from '../UI/Loader';
import './Details.css';

const Details = () => {
  const { imdbid } = useParams();
  const [movie, setMovie] = useState(null);

  if (movie == null) OMDb.find(imdbid).then(res => setMovie(res));

  return (
    <Container>
      <PrimereactStyle />
      <h1>Details</h1>
      {!movie && <Loader />}
      {movie && (
        <>
          <div className="img-details">
            <img src={movie.Poster} alt={movie.Title} />
          </div>
          <div className="content-details">
            <div>
              <h3>{movie.Title}</h3>
              <span>
                <Button onClick={() => window.history.go(-1)}>Back</Button>
              </span>
            </div>
            <br />
            <Rating
              value={Math.round(movie.imdbRating)}
              readonly
              stars={10}
              cancel={false}
            />
            <h4>{movie.Genre.replace(new RegExp(',', 'g'), ' |')}</h4>
            <p>{movie.Plot}</p>
          </div>
        </>
      )}
    </Container>
  );
};

export default Details;
