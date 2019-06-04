import React, { Component, Fragment } from 'react';
import { Grid, Paper, Typography, TextField, Button } from '@material-ui/core';
import axios from 'axios';

const styles = {
  Paper: {
    padding: 10,
    textAlign: 'center'
  }
};

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
    const { match, history } = this.props;
    console.log('MATCH', match);
    return axios
      .post(`/api/entries/createEntry/users/${match.params.userId}`, this.state)
      .then(() => history.push('/home'));
  };
  render() {
    const { entryTitle, entryText } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <Fragment>
        <form onSubmit={handleSubmit}>
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
              <Paper style={styles.Paper}>meta data location</Paper>
            </Grid>

            <Grid item sm={3}>
              <Paper style={styles.Paper}>meta Data timestamp</Paper>
            </Grid>

            <Grid item sm={3}>
              <Paper style={styles.Paper}>metad ata weather forecast</Paper>
            </Grid>

            <Grid item sm={3}>
              <Paper style={styles.Paper}>meta data degrees</Paper>
            </Grid>

            <Grid item sm={9}>
              <Paper>
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

export default CreateEntry;
