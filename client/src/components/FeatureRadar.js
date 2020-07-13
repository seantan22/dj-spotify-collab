import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chart from 'chart.js';

import styled from 'styled-components/macro';
import theme from '../styles/theme';
const { fonts, colors } = theme;

const properties = [
    'danceability',
    'energy',
    'valence',
];

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 200px;
  #chart {
    margin: 0 auto;
    margin-top: -30px;
  }
`;

class FeatureRadar extends Component {
  static propTypes = {
    features: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    type: PropTypes.string,
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
    this.getData();
  }

  getData = () => {
    const { features } = this.props;
    const dataset = this.createDataset(features);
    this.createChart(dataset);
  };

  avg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;

  createDataset(features) {
    const dataset = {};
    properties.forEach(prop => {
      dataset[prop] = features.length
        ? this.avg(features.map(feat => feat && feat[prop]))
        : features[prop];
    });
    return dataset;
  }

  createChart(dataset) {
    const { type } = this.props;
    const ctx = document.getElementById('chart');
    const labels = Object.keys(dataset);
    const data = Object.values(dataset);

    new Chart(ctx, {
      type: type || 'radar',
      data: {
        labels,
        datasets: [
          {
            label: '',
            data,
            backgroundColor: [
              'rgba(29, 185, 84, 0.7)',
            ],
            borderWidth: 1,
            borderColor: `${colors.grey}`,
            pointBackgroundColor: `${colors.white}`,
            pointBorderColor: `${colors.white}`,
            pointRadius: 0,
          },
        ],
      },
      options: {
        scale: {
            angleLines: {
                display: false
            },
            ticks: {
                display: false,
                maxTicksLimit: 1,
            },
            pointLabels: {
                fontSize: 14,
                fontFamily: `${fonts.primary}`,
                fontColor: `${colors.lightGrey}`
            },
            gridLines: {
                display: true,
                circular: true,
                color: `${colors.lightGrey}`,
                lineWidth: 1,
            },
        },
        legend: {
          display: false,
        },
        labels: {
            fontSize: 20,
        },
      },
    });
  }

  render() {
    return (
      <Container>
        <canvas id="chart" width="30" height="30" />
      </Container>
    );
  }
}

export default FeatureRadar;