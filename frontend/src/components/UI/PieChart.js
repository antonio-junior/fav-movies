import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Chart from 'react-apexcharts';

export default class PieChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: Object.keys(props.summary),
      },
      series: Object.values(props.summary),
    };
  }

  render() {
    const { series, options } = this.state;

    return (
      <div className="donut">
        <Chart options={options} series={series} type="pie" width="100%" />
      </div>
    );
  }
}

PieChart.propTypes = {
  summary: PropTypes.object.isRequired,
};
