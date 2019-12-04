import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import PieChart from '../UI/PieChart';

import Api from '../../services/Api';

const GenreChart = () => {
  const [summary, setSummary] = useState(null);

  if (summary == null) {
    Api.getSummary('genre').then(res => {
      const result = res.data.value;
      const values = result.map(item => {
        return item.genre.split(',').map(x => x.trim());
      });
      const merged = [].concat(...values);
      const counts = {};
      merged.forEach(key => {
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

export default GenreChart;
