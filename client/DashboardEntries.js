import React from 'react';
import { Paper, Grid, Typography, Box, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { filterEntries } from './helpFunctions';

const styles = {
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
  },
  paper: {
    padding: 5
  }
};

const DashboardEntries = ({ entries, entryFilter, classes }) => {
  const entriesFiltered = filterEntries(entries, entryFilter);
  return (
    <Box style={{ marginTop: 15 }}>
      <Grid container spacing={2}>
        {entriesFiltered.map(entry => {
          return (
            <Grid item sm={4} key={entry.id}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
              >
                {entry.title.slice(0, 10)}...
              </Button>

              <Typography variant="subtitle1" color="textSecondary">
                {entry.text.slice(0, 30)}...
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default withStyles(styles)(DashboardEntries);
