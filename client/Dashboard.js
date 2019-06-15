import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Box } from '@material-ui/core';
import TextAnylzer from './TextAnalyzer';
import DashboardEntries from './DashboardEntries';

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
    const { match } = this.props;
    const entryFilter = match.params.entryFilter || '';
    return (
      <div>
        <Box mt={14}>
          <TextAnylzer />
          <DashboardEntries
            entries={entries}
            // entryFilter={match.params.entryFilter}
          />
        </Box>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Dashboard);
