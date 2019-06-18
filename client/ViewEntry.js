import React, { Component, Fragment } from 'react';
import axios from 'axios';
import dateFormat from 'dateformat';
import {
  Grid,
  Paper,
  Button,
  withStyles,
  Avatar,
  Typography
} from '@material-ui/core';

const styles = theme => ({
  metaData: {
    fontSize: '18px',
    fontFamily: 'Merienda'
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
    console.log('state entry', entry);
    const { location, weather } = entry;

    return (
      <Fragment>
        <div className={classes.toolbar} />
        {Object.keys(entry).length ? (
          <Paper>
            <Grid container>
              <Grid item sm={12}>
                <p className="entry-title">{entry.title}</p>
              </Grid>

              <Grid container spacing={1} justify="center">
                <Grid item className={classes.metaData}>
                  {location.markerName}
                </Grid>

                <Grid item className={classes.metaData}>
                  {dateFormat(entry.createdAt, 'dddd, mmmm dS, yyyy')}
                </Grid>

                <Grid item className={classes.metaData}>
                  <Avatar src={weather.icon} />
                  {weather.forecast}
                </Grid>

                <Grid item className={classes.metaData}>
                  {Math.round(weather.degrees)}&#176;
                </Grid>
              </Grid>

              <Grid item sm={9}>
                <div className="entry-text">
                  <p>{entry.text}</p>
                </div>
              </Grid>

              <Grid item sm={3}>
                <Typography>images</Typography>
              </Grid>
              <Grid item>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Edit your Entry
                </Button>
              </Grid>
            </Grid>
          </Paper>
        ) : null}
      </Fragment>
    );
  }
}

export default withStyles(styles)(ViewEntry);
