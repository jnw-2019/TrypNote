import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { lightBlue } from '@material-ui/core/colors';
import { Grid, Box, Paper, Typography, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';

const styles = theme => ({
  button: {
    background: lightBlue[600],
    color: 'white'
  },
  calendar: {
    background: 'white'
  }
});

class DashboardFilters extends Component {
  // const [selectedDate, handleDateChange] = React.useState(new Date());
  constructor() {
    super();
    this.state = {
      date: new Date()
    };
  }

  handleDateChange = date => {
    this.setState({ date });
    console.log('handle change E', date);
  };

  render() {
    const { date } = this.state;
    const { handleDateChange } = this;
    const { classes } = this.props;
    console.log('state date', date);
    console.log('state date', typeof date);

    return (
      <Box style={{ marginTop: '2%', padding: '1.5em' }}>
        <Grid container spacing={2}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                View Entries:
              </Typography>
            </Grid>

            <Grid item>
              <Link to="/dashboard/today">
                <Button
                  type="button"
                  variant="contained"
                  className={classes.button}
                >
                  Today
                </Button>
              </Link>
            </Grid>
            <Grid item>
              <Link to="/dashboard/lastweek">
                <Button
                  type="button"
                  variant="contained"
                  className={classes.button}
                >
                  Last Week
                </Button>
              </Link>
            </Grid>

            <Grid item>
              <Link to="/dashboard/thirtydays">
                <Button
                  type="button"
                  variant="contained"
                  className={classes.button}
                >
                  Last 30 Days
                </Button>
              </Link>
            </Grid>

            {/* <Grid item>
              <Link to={`/dashboard/${date.toString()}`}>
                <Button
                  type="button"
                  variant="contained"
                  className={classes.calendar}
                >
                  <DatePicker value={date} onChange={handleDateChange} />
                </Button>
              </Link>
            </Grid> */}
          </MuiPickersUtilsProvider>
        </Grid>
      </Box>
    );
  }
}

// const styles = theme => ({
//   button: {
//     background: lightBlue[600],
//     color: 'white'
//   }
// });

// const DashboardFilters = ({ classes }) => {
//   return (
//     <Box style={{ marginTop: '2%' }}>
//       <Grid container spacing={2}>
// <Grid item>
//   <Link>
//     <Button
//       type="button"
//       variant="contained"
//       className={classes.button}
//     >
//       Today's Entries
//     </Button>
//   </Link>
// </Grid>
// <Grid item>
//   <Link>
//     <Button
//       type="button"
//       variant="contained"
//       className={classes.button}
//     >
//       Yesterday's Entries
//     </Button>
//   </Link>
// </Grid>
//       </Grid>
//     </Box>
//   );
// };

export default withStyles(styles)(DashboardFilters);
