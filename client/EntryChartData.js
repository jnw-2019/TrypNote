import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import axios from 'axios';
import dateFormat from 'dateformat';
import EntryChartChips from './EntryChartChips';

const mapStateToProps = ({ user }) => {
  return { user };
};

class EntryChartData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      chartType: 'Weather',
    };
  }
  componentDidMount() {
    if (this.props.user.id) {
      this.load(this.props.user.id);
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.load(this.props.user.id);
    }
  }
  load = id => {
    axios
      .get(`/api/entries/user/${id}`)
      .then(response => response.data)
      .then(userData => this.setState({ entries: userData.entries }));
  };
  render() {
    const { entries, chartType } = this.state;
    const distinctWeatherConditions = entries.reduce((acc, entry) => {
      if (
        acc[
          entry.weather.forecast[0].toUpperCase() +
            entry.weather.forecast.slice(1)
        ]
      ) {
        acc[
          entry.weather.forecast[0].toUpperCase() +
            entry.weather.forecast.slice(1)
        ] += 1;
      } else {
        acc[
          entry.weather.forecast[0].toUpperCase() +
            entry.weather.forecast.slice(1)
        ] = 1;
      }
      return acc;
    }, {});
    const distinctHours = entries.reduce((acc, entry) => {
      if (acc[dateFormat(entry.createdAt, 'H')]) {
        acc[dateFormat(entry.createdAt, 'H')] += 1;
      } else {
        acc[dateFormat(entry.createdAt, 'H')] = 1;
      }
      return acc;
    }, {});
    const barData = {
      labels: Object.keys(distinctWeatherConditions).sort(),
      datasets: [
        {
          label: 'Entries',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: Object.keys(distinctWeatherConditions)
            .sort()
            .reduce((acc, weather) => {
              acc.push(distinctWeatherConditions[weather]);
              return acc;
            }, []),
        },
      ],
    };
    const lineData = {
      labels: Object.keys(distinctHours).sort((a, b) => {
        return parseInt(a) - parseInt(b);
      }),
      datasets: [
        {
          label: 'Entries',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: Object.keys(distinctHours)
            .sort((a, b) => {
              return parseInt(a) - parseInt(b);
            })
            .reduce((acc, hour) => {
              acc.push(distinctHours[hour]);
              return acc;
            }, []),
        },
      ],
    };
    const selectChart = type => {
      this.setState({ chartType: type });
    };
    return (
      <div>
        <EntryChartChips
          chartTypes={[{ name: 'Weather' }, { name: 'Time' }, { name: 'Mood' }]}
          selectChart={selectChart}
        />
        {chartType === 'Weather' ? <Bar data={barData} /> : ''}
        {chartType === 'Time' ? <Line data={lineData} /> : ''}
        {chartType === 'Mood' ? 'Create Pie Chart' : ''}
      </div>
    );
  }
}

export default connect(mapStateToProps)(EntryChartData);
