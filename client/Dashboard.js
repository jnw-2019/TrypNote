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
    const entryFilter = match.params.entryFilter || '';

    return (
      <div>
        <Box mt={14}>
          <TextAnylzer />
          <DashboardEntries
            entries={entries}
            history={history}
            entryFilter={match.params.entryFilter}
          />
        </Box>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(Dashboard);
