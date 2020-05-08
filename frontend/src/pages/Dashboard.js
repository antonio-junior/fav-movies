import {
  faThumbsUp,
  faTheaterMasks,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import React, { useContext, useEffect } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import ChartContainer from '../components/UI/ChartContainer';
import SummaryCard from '../components/UI/SummaryCard';
import { AppContext } from '../helpers/AppStore';
import Api from '../services/Api';
import Auth from '../services/Auth';

const Dashboard = () => {
  const { favorites, setFavorites } = useContext(AppContext);

  useEffect(() => {
    if (!favorites)
      Api.getAll(Auth.getStoredUser().email)
        .then(res => setFavorites(res.data.reverse()))
        .catch(() => {
          setFavorites([]);
        });
  }, [favorites, setFavorites]);

  if (!favorites) return null;

  const fieldCount = field => {
    let fieldWithDuplications = [];
    favorites.forEach(favorite => {
      fieldWithDuplications = [
        ...fieldWithDuplications,
        ...favorite[field].split(','),
      ];
    });

    const fieldsCount = {};
    fieldWithDuplications.forEach(
      genre =>
        (fieldsCount[genre] = fieldsCount[genre] ? fieldsCount[genre] + 1 : 1),
    );

    return fieldsCount;
  };

  const genresCount = fieldCount('genre');
  const yearsCount = fieldCount('year');

  const allGenres = Object.entries(genresCount);

  const highestValue = Math.max.apply(
    null,
    Array.from(new Map(Object.entries(genresCount)).values()),
  );
  const favoriteGenre = Object.keys(genresCount).find(
    key => genresCount[key] === highestValue,
  );

  return (
    <Container>
      <h1>Dashboard</h1>
      <Row>
        <Col lg>
          <SummaryCard
            icon={faThumbsUp}
            data={String(favorites.length)}
            text="Favorites"
          />
        </Col>
        <Col lg>
          <SummaryCard
            icon={faTheaterMasks}
            data={String(allGenres.length)}
            text="Genres"
          />
        </Col>
        <Col lg>
          <SummaryCard
            icon={faStar}
            data={favoriteGenre}
            text="is the favorite genre"
          />
        </Col>
      </Row>
      <Row>
        <Col lg>
          <ChartContainer title="Years" data={yearsCount} />
        </Col>
        <Col lg>
          <ChartContainer title="Genres" data={genresCount} />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
