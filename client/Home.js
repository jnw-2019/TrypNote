import React, { Component } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardHeader,
  Avatar,
} from '@material-ui/core/';

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
      <Grid container justify="center" direction="column" spacing={8}>
        {entries.map(entry => (
          <Grid item key={entry.id}>
            <Card style={{ width: 400 }}>
              <CardHeader
                avatar={<Avatar>{entry.weather.degrees}</Avatar>}
                title={`${entry.location.latitude} ${entry.location.longitude}`}
                subheader={entry.createdAt}
              />
              <CardMedia
                style={{ height: 0, paddingTop: '56.25%' }}
                image={entry.headerImage}
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
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
    );
  }
}

export default Home;
