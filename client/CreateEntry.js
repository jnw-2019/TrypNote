import React, { Component, Fragment } from 'react';
import {
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  withStyles,
  Avatar,
} from '@material-ui/core';
import axios from 'axios';
import { connect } from 'react-redux';
import config from '../config';
import FourSquareChips from './FourSqaureChips';

const FSCLIENTKEY = config.get('FSCLIENTKEY');
const FSCLIENTSECRET = config.get('FSCLIENTSECRET');

const styles = theme => ({
  metaData: {
    fontSize: '18px',
    fontFamily: 'Merienda',
  },
  notebookPaper: {
    background: 'linear-gradient(to bottom, white 29px, #00b0d7 24px)',
    margin: '50px auto',
    backgroundSize: '100% 30px',
    paddingLeft: '80px',
    fontSize: '20px',
    lineHeight: '30px',
    fontFamily: 'Merienda',
    '&:before': {
      content: '',
      position: 'absolute',
      top: '30%',
      left: '20%',
      height: '80vh',
      width: '1px',
      background: '#db4034',
    },
  },
  entryTitle: {
    fontFamily: 'Forum',
    fontSize: '50px',
  },
  Paper: {
    padding: 10,
    textAlign: 'center',
  },
  toolbar: theme.mixins.toolbar,
});

class CreateEntry extends Component {
  constructor(props) {
    super(props);
    if (props.match.params.markerName) {
      //User Came In With An Exact Locatoin From FourSquare Data Off Map
      this.state = {
        title: '',
        text: '',
        locationName: props.match.params.markerName
          ? props.match.params.markerName
          : '',
        lat: props.match.params.lat ? props.match.params.lat * 1 : '',
        lon: props.match.params.long ? props.match.params.long * 1 : '',
        possibleVenues: [],
        // entryImages: {} to add feature
      };
    } else {
      this.state = {
        title: '',
        text: '',
        locationName: '',
        lat: '',
        lon: '',
        possibleVenues: [],
        // entryImages: {} to add feature
      };
    }
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
    //Based on the values that have been placed in the location field we search the FS api to return chips for each value
    if (target.name === 'locationName') {
      axios
        .get(
          `https://api.foursquare.com/v2/venues/search?client_id=${FSCLIENTKEY}&client_secret=${FSCLIENTSECRET}&v=20190425&ll=${
            this.props.location.lat && this.props.location.lon
              ? `${this.props.location.lat * 1},${this.props.location.lon * 1}`
              : '40.705295,-74.009139'
          }&intent=checkin&radius=200&query=${this.state.locationName}&limit=10`
        )
        .then(response => response.data)
        .then(possibleVenues =>
          this.setState({ possibleVenues: possibleVenues.response.venues })
        );
    }
  };

  handleSubmit = ev => {
    ev.preventDefault();
    const { locationName, lat, lon } = this.state;
    const { history, user, weather } = this.props;
    const forecast = weather.weather[0].main;
    const degrees = weather.main.temp;
    const icon = `http://openweathermap.org/img/w/${
      weather.weather[0].icon
    }.png`;

    return axios
      .post(`/api/entries/createEntry/users/${user.id}`, this.state)
      .then(({ data }) => {
        console.log('axios data', data);
        return Promise.all([
          axios.post(`/api/weathers/${data.id}`, { forecast, degrees, icon }),
          axios.post(`/api/locations/${data.id}`, { lat, lon, locationName }),
        ]);
      })
      .then(() => history.push('/home'));
  };
  selectLocation = (locationName, lat, lon) => {
    this.setState({ locationName, lat, lon });
  };
  render() {
    const { title, text, locationName, possibleVenues } = this.state;
    const { handleChange, handleSubmit, selectLocation } = this;
    const { classes, location, weather } = this.props;
    const currentDate = new Date().toDateString();

    return (
      <Fragment>
        <div className={classes.toolbar} />
        <form onSubmit={handleSubmit} style={{ marginTop: 10 }}>
          <Paper>
            <Grid container>
              <Grid item sm={12}>
                <TextField
                  InputProps={{
                    classes: {
                      input: classes.entryTitle,
                    },
                  }}
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
              <Grid container spacing={1} justify="center">
                <Grid item>
                  <TextField
                    InputProps={{
                      classes: {
                        input: classes.metaData,
                      },
                    }}
                    id="locationName"
                    label="Location"
                    name="locationName"
                    placeholder="Where are you?"
                    required
                    type="text"
                    value={locationName}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item className={classes.metaData}>
                  {currentDate}
                </Grid>

                <Grid item className={classes.metaData}>
                  {weather.weather ? (
                    <Fragment>
                      <Avatar
                        src={`http://openweathermap.org/img/w/${
                          weather.weather[0].icon
                        }.png`}
                      />
                      {weather.weather[0].main}
                    </Fragment>
                  ) : (
                    'Loading Weather'
                  )}
                </Grid>

                <Grid item className={classes.metaData}>
                  {weather.weather
                    ? `${weather.main.temp} \xB0F`
                    : 'Loading Weather'}
                </Grid>
              </Grid>
              <FourSquareChips
                venues={possibleVenues.length ? possibleVenues : []}
                selectLocation={selectLocation}
              />
              <Grid container>
                <Grid item sm={9}>
                  <TextField
                    rows={6}
                    InputProps={{
                      classes: {
                        input: classes.notebookPaper,
                      },
                    }}
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
  weather,
});

export default connect(mapStateToProps)(withStyles(styles)(CreateEntry));
