import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Utils from '../../helpers/Utils';
import Api from '../../services/Api';
import Loader from './Loader';
import PieChart from './PieChart';

const ChartContainer = ({ title, field, owner, callback }) => {
  const [summary, setSummary] = useState(null);

  if (summary == null) {
    Api.getSummary(field, owner).then(res => {
      const result = res.data.value;
      const counts = Utils.countSummary(result, callback);
      setSummary(counts);
    });
  }

  return (
    <div className="summary-card card" style={{ height: '100%' }}>
      <h2>{title}</h2>
      {!summary && <Loader />}
      {summary && <PieChart summary={summary} />}
    </div>
  );
};

ChartContainer.propTypes = {
  title: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};

export default ChartContainer;
