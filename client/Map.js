import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import MapGL, { Marker, NavigationControl, Popup } from 'react-map-gl';
import config from '../config';
import MapMarkerButton from './MapMarkerButton';

const FSCLIENTKEY = config.get('FSCLIENTKEY');
const FSCLIENTSECRET = config.get('FSCLIENTSECRET');

const mapStateToProps = ({ location }) => {
  return { location };
};

class Map extends Component {
  constructor(props) {
    super(props);
    if (!props.location) {
      this.state = {
        viewport: {
          latitude: 40.674827,
          longitude: -73.97021,
          zoom: 12,
          bearing: 0,
          pitch: 0,
          width: 500,
          height: 500,
        },
        popupLocation: [],
        venues: [],
      };
    } else {
      this.state = {
        viewport: {
          latitude: props.location.lat ? props.location.lat * 1 : 40.674827,
          longitude: props.location.lon ? props.location.lon * 1 : -73.97021,
          zoom: 12,
          bearing: 0,
          pitch: 0,
          width: 500,
          height: 500,
        },
        popupLocation: [],
        venues: [],
      };
    }
  }
  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.setState({
        viewport: {
          latitude: this.props.location.lat
            ? this.props.location.lat * 1
            : 40.674827,
          longitude: this.props.location.lon
            ? this.props.location.lon * 1
            : -73.97021,
          zoom: 12,
          bearing: 0,
          pitch: 0,
          width: 500,
          height: 500,
        },
        popupLocation: [],
        venues: [],
      });
    }
  }
  displayLocationOptions = ev => {
    axios
      .get(
        `https://api.foursquare.com/v2/venues/search?client_id=${FSCLIENTKEY}&client_secret=${FSCLIENTSECRET}&v=20190425&ll=${
          ev.lngLat[1]
        },${ev.lngLat[0]}&intent=browse&radius=1&limit=3`
      )
      .then(response => response.data)
      .then(venues => {
        console.log(venues);
        this.setState({
          popupLocation: ev.lngLat,
          venues: venues.response.venues,
        });
      })
      .catch(ex => {
        console.log(ex);
      });
  };
  render() {
    const navStyle = {
      position: 'absolute',
      top: 0,
      left: 0,
      padding: '10px',
    };
    const style = {
      flex: 2,
      height: 'calc(100vh - 3rem)',
      overflow: 'hidden',
    };

    const { viewport, popupLocation, venues } = this.state;
    const { entries } = this.props;
    const { displayLocationOptions } = this;
    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        mapboxApiAccessToken={
          'pk.eyJ1IjoibmVsbHlnZWQiLCJhIjoiY2pzaGdvZDAxMWM4aDQ0cWdmc2c0c3VxcSJ9.66st5uwT4ahIOlp338rhBA'
        }
        style={style}
        //This actually updates the viewpoint value in state which then renders the map again
        onViewportChange={viewport => {
          this.setState({ viewport });
        }}
        onClick={displayLocationOptions}
      >
        <div className="nav" style={navStyle}>
          <NavigationControl captureScroll={true} />
        </div>
        {entries.length
          ? entries.map(marker => (
              <Marker
                key={marker.id}
                longitude={marker.location.longitude * 1}
                latitude={marker.location.latitude * 1}
                captureClick={true}
              >
                <MapMarkerButton marker={marker} />
              </Marker>
            ))
          : ''}
        {popupLocation.length
          ? popupLocation.map((popUp, idx) => (
              <Popup
                key={idx}
                latitude={popupLocation[1]}
                longitude={popupLocation[0]}
                closeButton={true}
                closeOnClick={false}
                onClose={() => this.setState({ popupLocation: [], venues: [] })}
                anchor="top"
              >
                <div>
                  <List dense={true}>
                    {venues.length
                      ? venues.map(venue => (
                          <ListItem key={venue.id}>
                            <ListItemAvatar>
                              <Avatar>
                                <i className="fas fa-map-pin" />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={venue.name}
                              secondary={
                                venue.location.formattedAddress.length
                                  ? `${venue.location.formattedAddress[0]},${
                                      venue.location.formattedAddress[1]
                                    }`
                                  : ''
                              }
                            />
                            <ListItemSecondaryAction>
                              <Link
                                to={`/createEntry/${venue.name}/${`${
                                  venue.location.formattedAddress[0]
                                },${venue.location.formattedAddress[1]}`}/${
                                  venue.location.lat
                                }/${venue.location.lng}`}
                              >
                                <IconButton>
                                  <AddIcon />
                                </IconButton>
                              </Link>
                            </ListItemSecondaryAction>
                          </ListItem>
                        ))
                      : ''}
                  </List>
                </div>
              </Popup>
            ))
          : ''}
      </MapGL>
    );
  }
}

export default connect(mapStateToProps)(Map);
