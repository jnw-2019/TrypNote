import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Grid, Typography, Box, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { filterEntries } from './helpFunctions';

const styles = {
  paper: {
    padding: 5
  }
};

const DashboardEntries = ({ entries, classes, history }) => {
  // const entriesFiltered = filterEntries(entries, entryFilter);
  return (
    <Box>
      <Grid container spacing={6}>
        <Grid item>
          <ul className="entries-post-its-list">
            {entries.map(entry => {
              return (
                <li key={entry.id} className="entry-post-it-item">
                  <Link
                    to={`/entries/${entry.id}`}
                    className="entry-post-it-link"
                  >
                    <Typography variant="subtitle1" color="textPrimary">
                      {entry.title}
                    </Typography>

                    <Typography variant="subtitle1" color="textSecondary">
                      {entry.text.slice(0, 30)}...
                    </Typography>
                  </Link>
                </li>
              );
            })}
          </ul>
        </Grid>
      </Grid>
    </Box>
  );
};

export default withStyles(styles)(DashboardEntries);
