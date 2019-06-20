import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import dateFormat from 'dateformat';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';
import { lightBlue } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/styles';

import { Box, Grid, Button, Typography } from '@material-ui/core';
import TextAnylzer from './TextAnalyzer';
import DashboardEntries from './DashboardEntries';
import EntryChartData from './EntryChartData';
import DashboardFilters from './DashboardFilters';

const styles = theme => ({
  button: {
    background: lightBlue[600],
    color: 'white'
  },
  calendar: {
    background: 'white'
  }
});

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      entries: [],
      date: new Date()
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.user !== this.props.user ||
      this.props.location.pathname !== prevProps.location.pathname
    ) {
      this.load(this.props.user.id);
    }
  }

  handleDateChange = date => {
    this.setState({ date });
  };

  componentDidMount() {
    if (this.props.user.id) {
      this.load(this.props.user.id);
    }
  }

  load = userId => {
    const { match } = this.props;
    // const { date } = this.state;

    const initiateDate = new Date();
    const oneDay = 86400000;
    const oneWeek = oneDay * 7;
    const thirtyDays = oneDay * 30;

    const beginningOfToday = initiateDate.setDate(initiateDate.getDate() - 1);

    const endOfToday = beginningOfToday + oneDay;
    const beginningOfWeek = endOfToday - oneWeek;
    const beginningOfMonth = endOfToday - thirtyDays;

    if (match.params.entryFilter === 'today') {
      axios
        .get(
          `/api/entries/dynamicRange/from/${beginningOfToday}/to/${endOfToday}/user/${userId}`
        )
        .then(res => res.data)
        .then(userData => this.setState({ entries: userData.entries }));
    } else if (match.params.entryFilter === 'lastweek') {
      axios
        .get(
          `/api/entries/dynamicRange/from/${beginningOfWeek}/to/${endOfToday}/user/${userId}`
        )
        .then(res => res.data)
        .then(userData => this.setState({ entries: userData.entries }));
    } else if (match.params.entryFilter === 'thirtydays') {
      axios
        .get(
          `/api/entries/dynamicRange/from/${beginningOfMonth}/to/${endOfToday}/user/${userId}`
        )
        .then(res => res.data)
        .then(userData => this.setState({ entries: userData.entries }));
    } else {
      axios
        .get(`/api/entries/user/${userId}`)
        .then(response => response.data)
        .then(userData => this.setState({ entries: userData.entries }));
    }
  };

  render() {
    const { entries, date } = this.state;
    const { match, history, user, classes } = this.props;
    const { handleDateChange } = this;

    return (
      <div>
        <Box mt={14}>
          <EntryChartData />
          <TextAnylzer />
          <Box
            style={{ marginTop: '2%' }}
            borderColor="primary.light"
            border={1}
            borderRadius={5}
          >
            {/* <DashboardFilters /> */}
            <Box style={{ marginTop: '2%', padding: '1.5em' }}>
              <Grid container spacing={2}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid item>
                    <Typography
                      component="h2"
                      variant="h6"
                      color="primary"
                      gutterBottom
                    >
                      View Entries:
                    </Typography>
                  </Grid>

                  <Grid item>
                    <Link to="/dashboard/">
                      <Button
                        type="button"
                        variant="contained"
                        className={classes.button}
                      >
                        All
                      </Button>
                    </Link>
                  </Grid>

                  <Grid item>
                    <Link to="/dashboard/today">
                      <Button
                        type="button"
                        variant="contained"
                        className={classes.button}
                      >
                        Today
                      </Button>
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to="/dashboard/lastweek">
                      <Button
                        type="button"
                        variant="contained"
                        className={classes.button}
                      >
                        Last Week
                      </Button>
                    </Link>
                  </Grid>

                  <Grid item>
                    <Link to="/dashboard/thirtydays">
                      <Button
                        type="button"
                        variant="contained"
                        className={classes.button}
                      >
                        Last 30 Days
                      </Button>
                    </Link>
                  </Grid>

                  {/* <Grid item>
                    <Link to={`/dashboard/specificdate`}>
                      <Button
                        type="button"
                        variant="contained"
                        className={classes.calendar}
                      >
                        <DatePicker value={date} onChange={handleDateChange} />
                      </Button>
                    </Link>
                  </Grid> */}
                </MuiPickersUtilsProvider>
              </Grid>
            </Box>
            <DashboardEntries
              entries={entries}
              history={history}
              match={match}
              userId={user.id}
            />
          </Box>
        </Box>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(withStyles(styles)(Dashboard));
