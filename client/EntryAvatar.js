import React from 'React';
import { makeStyles } from '@material-ui/core/styles';
import yellow from '@material-ui/core/colors/yellow';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';

import { Avatar } from '@material-ui/core/';

const useStyles = makeStyles({
  sunny: {
    margin: 10,
    color: '#fff',
    backgroundColor: yellow[500],
  },
  cloudy: {
    margin: 10,
    color: '#fff',
    backgroundColor: grey[500],
  },
  clear: {
    margin: 10,
    color: '#fff',
    backgroundColor: blue[200],
  },
});

const EntryAvatar = ({ forecast, icon }) => {
  const classes = useStyles();
  return (
    <Avatar className={classes[forecast]}>
      <i className={`fas fa-${icon}`} />
    </Avatar>
  );
};

export default EntryAvatar;
