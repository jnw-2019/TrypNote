import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { Typography } from '@material-ui/core/';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MapMarkerButton = ({ marker }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  function handleClose() {
    setOpen(false);
  }

  return (
    <Fragment>
      <button className="marker" onClick={() => handleClickOpen('paper')} />
      <Dialog
        open={open}
        scroll="paper"
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div style={{ alignItems: 'center', justifyContent: 'center' }}>
              <img src={marker.weather.icon} />
              <br />
              <Typography variant="body2" color="textSecondary" component="p">
                <em>
                  {`${marker.weather.forecast
                    .slice(0, 1)
                    .toUpperCase()}${marker.weather.forecast.slice(1)}`}{' '}
                  {`${marker.weather.degrees}°`}
                </em>
              </Typography>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div> {marker.title}</div>
              <div>
                <Typography variant="body2" color="textSecondary" component="p">
                  {' '}
                  {marker.location.markerName}
                </Typography>
              </div>
              <div>
                {' '}
                <Typography variant="body2" color="textSecondary" component="p">
                  {dateFormat(marker.createdAt, 'dddd, mmmm dS, yyyy')}
                </Typography>
              </div>
            </div>
          </div>
        </DialogTitle>
        <DialogContent dividers={true}>
          <DialogContentText id="alert-dialog-slide-description">
            {marker.text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            <Link to={`/entries/${marker.id}`}>View</Link>
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default MapMarkerButton;
