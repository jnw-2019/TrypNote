import React from 'react';
import { Link } from 'react-router-dom';
import dateFormat from 'dateformat';
import { Paper, Grid, Typography, Box, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = {
  paper: {
    padding: '1.5em'
  }
};

const DashboardEntries = ({ entries }) => {
  return (
    <Box style={styles.paper}>
      <Grid container spacing={6}>
        <Grid item>
          <ul className="entries-post-its-list">
            {entries ? (
              entries.map(entry => {
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

                      <Typography variant="subtitle1" color="textSecondary">
                        {dateFormat(entry.createdAt, 'dddd, mmmm dS, yyyy')}
                        <br />
                        {entry.createdAt}
                      </Typography>
                    </Link>
                  </li>
                );
              })
            ) : (
              <li className="entry-post-it-item;">
                <div className="entry-post-it-link">
                  <Typography variant="subtitle1" color="textPrimary">
                    Sorry no entries!
                  </Typography>
                </div>
              </li>
            )}
          </ul>
        </Grid>
      </Grid>
    </Box>
  );
};

export default withStyles(styles)(DashboardEntries);
