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

const EntryChartChips = ({ chartTypes, selectChart }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {chartTypes.map(chart => (
        <Chip
          key={chart.name}
          label={chart.name}
          onClick={() => selectChart(chart.name)}
          className={classes.chip}
          color="primary"
        />
      ))}
    </div>
  );
};

export default EntryChartChips;
