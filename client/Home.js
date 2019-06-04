import React, { Component } from 'react';
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
import EntryAvatar from './EntryAvatar';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      entries: [],
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
            {entries.map(entry => (
              <Grid item key={entry.id}>
                <Card style={{ width: 300 }}>
                  <CardHeader
                    avatar={
                      <EntryAvatar
                        forecast={entry.weather.forecast}
                        icon={entry.weather.icon}
                      />
                    }
                    // TODO: Parse Date Field & Add To Title
                    title={`${
                      entry.weather.forecast
                        ? entry.weather.forecast.slice(0, 1).toUpperCase() +
                          entry.weather.forecast.slice(1)
                        : ''
                    } ${entry.weather.degrees}°
                    `}
                    // TODO: Parse Corrdinates and Display A Locaiton Name
                    subheader={entry.location.markerName}
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
            ))}
          </Grid>
        </Box>
      </Container>
    );
  }
}

export default Home;
