import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  faThumbsUp,
  faTheaterMasks,
  faStar,
} from '@fortawesome/free-solid-svg-icons';

import CustomChart from '../UI/CustomChart';
import SummaryCard from '../UI/SummaryCard';
import Api from '../../services/Api';
import Utils from '../../helpers/Utils';

const Dashboard = () => {
  const cbSplitGenres = item => item.genre.split(',').map(x => x.trim());

  const countGenres = arr => Object.entries(arr).length;

  const getFavoriteGenre = arr => {
    const highestValue = Math.max.apply(
      null,
      Array.from(new Map(Object.entries(arr)).values()),
    );
    return Object.keys(arr).find(key => arr[key] === highestValue);
  };

  const request = Api.getSummary('genre');
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
            promise={Api.count()}
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

      <CustomChart title="Years" field="year" callback={x => x.year} />
      <CustomChart title="Genres" field="genre" callback={cbSplitGenres} />
    </Container>
  );
};

export default Dashboard;
