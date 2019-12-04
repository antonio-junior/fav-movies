import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import PieChart from '../UI/PieChart';

import Api from '../../services/Api';

const YearChart = () => {
  const [summary, setSummary] = useState(null);

  if (summary == null) {
    Api.getSummary('year').then(res => {
      const result = res.data.value;
      const values = result.map(x => x.year);
      const counts = {};
      values.forEach(key => {
        counts[key] = (counts[key] || 0) + 1;
      });
      setSummary(counts);
    });
  }

  return (
    <Container>
      {!summary && 'Carregando...'}
      {summary && <PieChart summary={summary} />}
    </Container>
  );
};

export default YearChart;
