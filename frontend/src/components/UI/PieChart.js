import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import Chart from 'react-apexcharts';

export default class PieChart extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        labels: Object.keys(props.data),
      },
      series: Object.values(props.data),
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
  data: PropTypes.object.isRequired,
};
