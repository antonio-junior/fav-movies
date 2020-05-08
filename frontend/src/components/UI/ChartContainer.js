import PropTypes from 'prop-types';
import React from 'react';

import PieChart from './PieChart';

const ChartContainer = ({ title, data }) => {
  return (
    <div className="summary-card card" style={{ height: '100%' }}>
      <div>
        <h2>{title}</h2>
        {data && <PieChart data={data} />}
      </div>
    </div>
  );
};

ChartContainer.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default ChartContainer;
