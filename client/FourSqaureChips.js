import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(1),
  },
}));

const FourSquareChips = ({ venues, selectLocation }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {venues.map(venue => (
        <Chip
          key={venue.id}
          label={venue.name}
          onClick={() =>
            selectLocation(venue.name, venue.location.lat, venue.location.lng)
          }
          className={classes.chip}
          color="primary"
        />
      ))}
    </div>
  );
};

export default FourSquareChips;
