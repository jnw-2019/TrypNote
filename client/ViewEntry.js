import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const styles = {
  Paper: {
    padding: 10,
    textAlign: 'center'
  }
};

class ViewEntry extends Component {
  constructor() {
    super();
    this.state = {
      entry: {}
    };
  }

  componentDidMount() {
    this.loadData();
  }
  loadData = () => {
    const { match } = this.props;
    return axios
      .get(`/api/entries/${match.params.entryId}`)
      .then(({ data }) => this.setState({ entry: data }));
  };
  render() {
    // const classes = useStyles();
    const { entry } = this.state;
    const { location, weather } = entry;
    return (
      <Fragment>
        {Object.keys(entry).length ? (
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper style={styles.Paper}>
                <Typography variant="h4">{entry.title}</Typography>
              </Paper>
            </Grid>

            <Grid item sm={3}>
              <Paper style={styles.Paper}>
                {location.longitude}, {location.latitude}
              </Paper>
            </Grid>

            <Grid item sm={3}>
              <Paper style={styles.Paper}>{entry.createdAt}</Paper>
            </Grid>

            <Grid item sm={3}>
              <Paper style={styles.Paper}>{weather.forecast}</Paper>
            </Grid>

            <Grid item sm={3}>
              <Paper style={styles.Paper}>{weather.degrees}&#176;</Paper>
            </Grid>

            <Grid item sm={9}>
              <Paper>
                <Typography variant="body1">{entry.text}</Typography>
              </Paper>
            </Grid>

            <Grid item sm={3}>
              <Paper>
                <Typography>images</Typography>
              </Paper>
            </Grid>
          </Grid>
        ) : null}
      </Fragment>
    );
  }
}

export default ViewEntry;
