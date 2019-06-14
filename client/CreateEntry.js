import React, { Component, Fragment } from 'react';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  withStyles,
  Avatar
} from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';

const styles = theme => ({
  Paper: {
    padding: 10,
    textAlign: 'center'
  },
  toolbar: theme.mixins.toolbar,
  lines: {
    marginTop: 40
    // height: 100 % -40
    // alignSelf: 'stretch'
    // backgroundImage:
  }
  // backgroundImage: repeating-linear-gradient(white 0, white 24, steelblue 25)
});

class CreateEntry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      locationName: props.weather ? props.weather.name : 'Loading Location'
      // entryImages: {} to add feature
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    const { locationName } = this.state;
    const { history, user, weather, location } = this.props;
    const forecast = weather.weather[0].main;
    const degrees = weather.main.temp;
    const icon = `http://openweathermap.org/img/w/${
      weather.weather[0].icon
    }.png`;

    const lat = location.lat;
    const lon = location.lon;

    return axios
      .post(`/api/entries/createEntry/users/${user.id}`, this.state)
      .then(({ data }) => {
        console.log('axios data', data);
        return Promise.all([
          axios.post(`/api/weathers/${data.id}`, { forecast, degrees, icon }),
          axios.post(`/api/locations/${data.id}`, { lat, lon, locationName })
        ]);
      })
      .then(() => history.push('/home'));
  };
  render() {
    const { title, text, locationName } = this.state;
    const { handleChange, handleSubmit } = this;
    const { classes, location, weather } = this.props;
    const currentDate = new Date().toDateString();
    // const weatherFound = weather.weather ? weather.weather : null

    return (
      <Fragment>
        <div className={classes.toolbar} />
        <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
          <Paper className>
            <Grid container>
              <Grid item sm={12}>
                <TextField
                  id="title"
                  label="Title"
                  name="title"
                  placeholder="Name your day"
                  margin="normal"
                  required
                  type="text"
                  fullWidth
                  value={title}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={12} container>
                <Grid item sm container spacing={2}>
                  <Grid item>
                    <TextField
                      id="location"
                      label="Location"
                      name="location"
                      placeholder="Where are you?"
                      required
                      type="text"
                      value={locationName}
                      onChange={handleChange}
                    />
                    <Typography>{currentDate}</Typography>

                    <Typography>
                      {weather.weather ? (
                        <Fragment>
                          <Avatar
                            src={`http://openweathermap.org/img/w/${
                              weather.weather[0].icon
                            }.png`}
                          />
                          <Typography>{weather.weather[0].main}</Typography>
                        </Fragment>
                      ) : (
                        'Loading Weather'
                      )}
                    </Typography>

                    <Typography>
                      {weather.weather
                        ? `${weather.main.temp} \xB0F`
                        : 'Loading Weather'}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item sm={9} className="notebook-paper">
                <TextField
                  className="entry-content"
                  id="text"
                  label="Write your thoughts..."
                  name="text"
                  placeholder="What's on your mind?"
                  margin="normal"
                  required
                  multiline
                  fullWidth
                  value={text}
                  onChange={handleChange}
                />
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
          </Paper>
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

export default connect(mapStateToProps)(withStyles(styles)(CreateEntry));
