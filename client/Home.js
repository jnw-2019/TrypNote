import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardHeader,
  Container,
} from '@material-ui/core/';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Map from './Map';
import dateFormat from 'dateformat';

const mapStateToProps = ({ user }) => {
  return { user };
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
    };
  }
  componentDidMount() {
    if (this.props.user.id) {
      this.load(this.props.user.id);
    }
  }
  componentDidUpdate(prevProps) {
    if (prevProps.user !== this.props.user) {
      this.load(this.props.user.id);
    }
  }
  load = id => {
    axios
      .get(`/api/entries/user/${id}`)
      .then(response => response.data)
      .then(userData => this.setState({ entries: userData.entries }));
  };
  componentDidUpdate() {}
  render() {
    const { entries } = this.state;
    return (
      <Container component="main">
        <CssBaseline />
        <Box mt={12}>
          <Grid container>
            <Map entries={entries} />
          </Grid>
        </Box>

        <Box mt={8}>
          <Grid
            container
            justify="center"
            alignItems="center"
            direction="row"
            spacing={2}
          >
            {entries.length
              ? entries.map(entry => (
                  <Grid item key={entry.id}>
                    <Card style={{ width: 300 }}>
                      <CardHeader
                        avatar={
                          <div>
                            <img src={entry.weather.icon} />
                            <br />
                            <em>
                              {entry.weather.forecast
                                ? `${entry.weather.forecast
                                    .slice(0, 1)
                                    .toUpperCase()}${entry.weather.forecast.slice(
                                    1
                                  )}`
                                : ''}{' '}
                              {`${entry.weather.degrees}°`}
                            </em>
                          </div>
                        }
                        title={entry.location.markerName}
                        subheader={dateFormat(
                          entry.createdAt,
                          'dddd, mmmm dS, yyyy'
                        )}
                      />
                      {entry.headerImage ? (
                        <CardMedia
                          style={{ height: 0, paddingTop: '56.25%' }}
                          image={entry.headerImage}
                        />
                      ) : (
                        ''
                      )}
                      <CardContent>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {entry.title}
                        </Typography>
                      </CardContent>
                      <CardContent>
                        <Typography paragraph>{entry.text}</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              : ''}
          </Grid>
        </Box>
      </Container>
    );
  }
}

export default connect(mapStateToProps)(Home);
