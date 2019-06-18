import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import axios from 'axios';
import dateFormat from 'dateformat';

const mapStateToProps = ({ user }) => {
  return { user };
};

class EntryChartData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      chartType: '',
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
    const { entries } = this.state;
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
    console.log(distinctWeatherConditions);
    const data = {
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
    return <Bar data={data} />;
  }
}

export default connect(mapStateToProps)(EntryChartData);
