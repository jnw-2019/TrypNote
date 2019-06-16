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

const DashboardEntries = ({ entries, entryFilter, classes, history }) => {
  // const entriesFiltered = filterEntries(entries, entryFilter);
  return (
    <Box style={{ marginTop: 15 }}>
      <Grid container spacing={6}>
        <div className="bulletin-board">
          <div className="bulletin-space">
            <ul className="entries-post-its-list">
              {entries.map(entry => {
                return (
                  <li key={entry.id} className="entry-post-it-item">
                    <Link
                      to={`/entries/${entry.id}`}
                      className="entry-post-it-link"
                    >
                      <Typography variant="subtitle1" color="textPrimary">
                        {/* {entry.title.slice(0, 20)} */}
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
          </div>
        </div>
      </Grid>
    </Box>
  );
};

export default withStyles(styles)(DashboardEntries);
