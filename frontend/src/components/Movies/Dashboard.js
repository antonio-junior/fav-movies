import React from 'react';
import Container from 'react-bootstrap/Container';
import YearChart from './YearChart';
import GenreChart from './GenreChart';

const Dashboard = () => {
  return (
    <Container>
      <h1>Dashboard</h1>
      <YearChart />
      <GenreChart />
    </Container>
  );
};

export default Dashboard;
