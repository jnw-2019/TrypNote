import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Grid, Paper, Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
  entryTitle: {
    fontFamily: 'Forum',
    fontSize: '50px'
  },
  Paper: {
    padding: 10,
    textAlign: 'center'
  },
  toolbar: theme.mixins.toolbar
});

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
    const { classes } = this.props;
    const { entry } = this.state;
    const { location, weather } = entry;

    return (
      <Fragment>
        <div className={classes.toolbar} />
        {Object.keys(entry).length ? (
          <Paper>
            <Grid container>
              <Grid item sm={12}>
                <Typography variant="h3" className={styles.entryTitle}>
                  {entry.title}
                </Typography>
              </Grid>

              <Grid item sm={12} container>
                <Grid item>
                  <Typography variant="body1" />
                </Grid>
              </Grid>
              <Grid item sm={3}>
                {location.longitude}, {location.latitude}
              </Grid>

              <Grid item sm={3}>
                {entry.createdAt}
              </Grid>

              <Grid item sm={3}>
                {weather.forecast}
              </Grid>

              <Grid item sm={3}>
                {weather.degrees}&#176;
              </Grid>

              <Grid item sm={9}>
                <Typography variant="body1">{entry.text}</Typography>
              </Grid>

              <Grid item sm={3}>
                <Typography>images</Typography>
              </Grid>
            </Grid>
          </Paper>
        ) : null}
      </Fragment>
    );
  }
}

export default withStyles(styles)(ViewEntry);
