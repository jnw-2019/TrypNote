import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      entries: []
    };
  }

  componentDidMount() {
    this.load();
  }

  load = () => {
    axios
      .get('/api/entries/')
      .then(response => response.data)
      .then(entries => this.setState({ entries }));
  };
  render() {
    const { entries } = this.state;
    return <div>test</div>;
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Dashboard);
