import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Chart, Dataset } from 'react-rainbow-components';

const containerStyles = {
  maxWidth: 600,
};

export default class PieChart extends Component {
  constructor(props) {
    super(props);

    const keys = Object.keys(props.summary);
    this.state = {
      labels: keys,
      dataset: Object.entries(props.summary).map((keyPair, i) => {
        return {
          value: props.summary[keys[i]],
          color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        };
      }),
    };
  }

  renderDataset() {
    const data = [];
    const colors = [];
    const { dataset } = this.state;
    dataset.forEach(d => {
      data.push(d.value);
      colors.push(d.color);
    });

    return <Dataset title="Data" values={data} backgroundColor={colors} />;
  }

  render() {
    const { labels } = this.state;

    return (
      <div className="rainbow-p-vertical_xx-large rainbow-p-horizontal_medium">
        <div
          style={containerStyles}
          className="rainbow-align-content_center rainbow-m-vertical_large rainbow-m_auto"
        >
          <Chart
            labels={labels}
            type="pie"
            legendPosition="right"
            disableCurves
          >
            {this.renderDataset()}
          </Chart>
        </div>
      </div>
    );
  }
}

PieChart.propTypes = {
  summary: PropTypes.object.isRequired,
};
