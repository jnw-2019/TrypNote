import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { lightBlue } from '@material-ui/core/colors';
import { Grid, Box, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  DatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';

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
    console.log('state date', date);

    return (
      <Box style={{ marginTop: '2%' }}>
        <Grid container spacing={2}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item>
              <Typography
                component="h2"
                variant="h6"
                color="primary"
                gutterBottom
              >
                View Entries on
              </Typography>
            </Grid>

            <Grid item>
              <Paper>
                <DatePicker value={date} onChange={handleDateChange} />
              </Paper>
            </Grid>
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
//         <Grid item>
//           <Link>
//             <Button
//               type="button"
//               variant="contained"
//               className={classes.button}
//             >
//               Today's Entries
//             </Button>
//           </Link>
//         </Grid>
//         <Grid item>
//           <Link>
//             <Button
//               type="button"
//               variant="contained"
//               className={classes.button}
//             >
//               Yesterday's Entries
//             </Button>
//           </Link>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

export default DashboardFilters;
