import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';
import PieChart from '../UI/PieChart';

import Api from '../../services/Api';

const CustomChart = ({ title, field, callback }) => {
  const [summary, setSummary] = useState(null);

  if (summary == null) {
    Api.getSummary(field).then(res => {
      const result = res.data.value;
      const values = result.map(callback);
      const merged = [].concat(...values);
      const counts = {};
      merged.forEach(key => {
        counts[key] = (counts[key] || 0) + 1;
      });
      setSummary(counts);
    });
  }

  const styles = {
    width: '45%',
    float: 'left',
    backgroundColor: '#fff',
  };
  return (
    <Container style={styles}>
      <h2>{title}</h2>
      {!summary && 'Carregando...'}
      {summary && <PieChart summary={summary} />}
    </Container>
  );
};

CustomChart.propTypes = {
  title: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

export default CustomChart;
