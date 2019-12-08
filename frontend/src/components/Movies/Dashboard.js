import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

import CustomChart from './CustomChart';
import SummaryCard from '../UI/SummaryCard';
import IconMovie from '../../assets/movie2.jpg';
import Api from '../../services/Api';

const Dashboard = () => {
  return (
    <Container>
      <h1>Dashboard</h1>
      <Row>
        <Col xs>
          <SummaryCard
            bg="info"
            icon={faFilm}
            cbvalue={Api.count()}
            text="Favorites"
          />
        </Col>
      </Row>

      <CustomChart title="Years" field="year" callback={x => x.year} />
      <CustomChart
        title="Genres"
        field="genre"
        callback={item => item.genre.split(',').map(x => x.trim())}
      />
    </Container>
  );
};

export default Dashboard;
