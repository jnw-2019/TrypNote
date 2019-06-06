import React, { Component, Fragment } from 'react';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  withStyles
} from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';

const styles = {
  Paper: {
    padding: 10,
    textAlign: 'center'
  }
};

const navOverlapFix = theme => ({
  toolbar: theme.mixins.toolbar
});

class CreateEntry extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      text: ''
      // entryImages: {} to add feature
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    const { history, user } = this.props;
    console.log('user', user);

    return axios
      .post(`/api/entries/createEntry/users/${user.id}`, this.state)
      .then(() => history.push('/home'));
  };
  render() {
    const { entryTitle, entryText } = this.state;
    const { handleChange, handleSubmit } = this;
    const { classes, location, weather } = this.props;
    const currentDate = new Date().toDateString();
    console.log('location', location);

    return (
      <Fragment>
        <div className={classes.toolbar} />
        <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
          <Grid container spacing={3}>
            <Grid item sm={12}>
              <Paper style={styles.Paper}>
                <TextField
                  id="title"
                  label="Title"
                  name="title"
                  placeholder="Name your day"
                  margin="normal"
                  required
                  type="text"
                  fullWidth
                  value={entryTitle}
                  onChange={handleChange}
                />
              </Paper>
            </Grid>

            <Grid item sm={3}>
              {location ? (
                <Paper style={styles.Paper}>
                  {location.lat}, {location.lon}
                </Paper>
              ) : (
                <Paper style={styles.Paper}>Loading Location</Paper>
              )}
            </Grid>

            <Grid item sm={3}>
              <Paper style={styles.Paper}>{currentDate}</Paper>
            </Grid>

            <Grid item sm={3}>
              {weather.weather ? (
                <Paper style={styles.Paper}>{weather.weather[0].main}</Paper>
              ) : (
                <Paper style={styles.Paper}>Loading Weather</Paper>
              )}
            </Grid>

            <Grid item sm={3}>
              {weather.weather ? (
                <Paper style={styles.Paper}>{weather.main.temp}&#176;</Paper>
              ) : (
                <Paper style={styles.Paper}>Loading Weather</Paper>
              )}
            </Grid>

            <Grid item sm={9}>
              <Paper style={styles.Paper}>
                <TextField
                  id="text"
                  label="Write your thoughts..."
                  name="text"
                  placeholder="What's on your mind?"
                  margin="normal"
                  required
                  multiline
                  fullWidth
                  value={entryText}
                  onChange={handleChange}
                />
              </Paper>
            </Grid>

            <Grid item sm={3}>
              <Paper>
                <Typography>images</Typography>
              </Paper>
            </Grid>
            <Grid item>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Log your Entry
              </Button>
            </Grid>
          </Grid>
        </form>
      </Fragment>
    );
  }
}

const mapStateToProps = ({ user, location, weather }) => ({
  user,
  location,
  weather
});

export default connect(mapStateToProps)(withStyles(navOverlapFix)(CreateEntry));
