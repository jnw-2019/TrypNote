import React, { Component, Fragment } from 'react';
import {
  Grid,
  Paper,
  Button,
  withStyles,
  Avatar,
  TextField
} from '@material-ui/core';
import axios from 'axios';
import dateFormat from 'dateformat';

const styles = theme => ({
  metaData: {
    fontSize: '18px',
    fontFamily: 'Merienda'
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
      background: '#db4034'
    }
  },
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

class EditEntry extends Component {
  constructor() {
    super();
    this.state = {
      entry: {},
      text: ''
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  handleSubmit = ev => {
    ev.preventDefault();
    const { text, entry } = this.state;
    const { history } = this.props;

    return axios.put(`/api/entries/${entry.id}`, { text }).then(() => {
      // eslint-disable-next-line no-alert
      alert('Entry Updated');
      history.push(`/entries/${entry.id}`);
    });
  };

  componentDidMount() {
    this.loadData();
  }
  loadData = () => {
    const { match } = this.props;
    return axios
      .get(`/api/entries/${match.params.entryId}`)
      .then(({ data }) => this.setState({ entry: data, text: data.text }));
  };
  render() {
    const { classes } = this.props;
    const { entry, text } = this.state;
    const { handleChange, handleSubmit } = this;

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

              {/* <form onSubmit={handleSubmit} style={{ marginTop: 10 }}> */}
              <Grid container justify="center">
                <Grid item sm={12}>
                  <TextField
                    rows={6}
                    InputProps={{
                      classes: {
                        input: classes.notebookPaper
                      }
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
                <Grid item>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={ev => handleSubmit(ev)}
                  >
                    Save your Entry
                  </Button>
                </Grid>
              </Grid>
              {/* </form> */}
            </Grid>
          </Paper>
        ) : null}
      </Fragment>
    );
  }
}

export default withStyles(styles)(EditEntry);
