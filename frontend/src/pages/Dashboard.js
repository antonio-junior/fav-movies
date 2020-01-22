import {
  faThumbsUp,
  faTheaterMasks,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

import ChartContainer from '../components/UI/ChartContainer';
import SummaryCard from '../components/UI/SummaryCard';
import Utils from '../helpers/Utils';
import Api from '../services/Api';
import Auth from '../services/Auth';

const Dashboard = () => {
  const emailUser = Auth.getStoredUser().email;

  const cbSplitGenres = item => item.genre.split(',').map(x => x.trim());

  const countGenres = genres => Object.entries(genres).length;

  const getFavoriteGenre = genres => {
    const highestValue = Math.max.apply(
      null,
      Array.from(new Map(Object.entries(genres)).values()),
    );
    return Object.keys(genres).find(key => genres[key] === highestValue);
  };

  const request = Api.getSummary('genre', emailUser);
  const getSummaryPromise = apllyInCounts => {
    return new Promise((resolve, reject) => {
      request.then(
        response => {
          if (response.data.errors) {
            reject({ errors: response.data.errors });
          } else {
            const result = response.data.value;
            const counts = Utils.countSummary(result, cbSplitGenres);
            resolve({ data: { value: apllyInCounts(counts) } });
          }
        },
        error => {
          reject(new Error(error.message));
        },
      );
    });
  };

  return (
    <Container>
      <h1>Dashboard</h1>
      <Row>
        <Col lg>
          <SummaryCard
            icon={faThumbsUp}
            promise={Api.count(emailUser)}
            text="Favorites"
          />
        </Col>
        <Col lg>
          <SummaryCard
            icon={faTheaterMasks}
            promise={getSummaryPromise(countGenres)}
            text="Genres"
          />
        </Col>
        <Col lg>
          <SummaryCard
            icon={faStar}
            promise={getSummaryPromise(getFavoriteGenre)}
            text="is the favorite genre"
          />
        </Col>
      </Row>
      <Row>
        <Col lg>
          <ChartContainer
            title="Years"
            owner={emailUser}
            field="year"
            callback={x => x.year}
          />
        </Col>
        <Col lg>
          <ChartContainer
            title="Genres"
            field="genre"
            owner={emailUser}
            callback={cbSplitGenres}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
