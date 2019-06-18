import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import { Box } from '@material-ui/core';
import TextAnylzer from './TextAnalyzer';
import DashboardEntries from './DashboardEntries';
import DashboardFilters from './DashboardFilters';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      entries: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.load(this.props.user.id);
    }
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.load(this.props.user.id);
    }
  }

  load = userId => {
    axios
      .get(`/api/entries/user/${userId}`)
      .then(response => response.data)
      .then(userData => this.setState({ entries: userData.entries }));
  };

  render() {
    const { entries } = this.state;
    const { match, history } = this.props;

    return (
      <div>
        <Box mt={14}>
          <TextAnylzer />
          <Box
            style={{ padding: '2', marginTop: '2%' }}
            borderColor="primary.light"
            border={1}
            borderRadius={5}
          >
            <DashboardFilters />
            <DashboardEntries entries={entries} history={history} />
          </Box>
        </Box>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Dashboard);
