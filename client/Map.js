import React, { Component } from 'react';
import { connect } from 'react-redux';
import MapGL, { Marker, NavigationControl } from 'react-map-gl';

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
      });
    }
  }

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
    const { viewport } = this.state;
    const { entries, location } = this.props;
    return (
      <MapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
        mapboxApiAccessToken={
          'pk.eyJ1IjoibmVsbHlnZWQiLCJhIjoiY2pzaGdvZDAxMWM4aDQ0cWdmc2c0c3VxcSJ9.66st5uwT4ahIOlp338rhBA'
        }
        style={style}
        //This actually updates the viewpoint value in state which then renders the map again
        onViewportChange={viewport => this.setState({ viewport })}
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
              >
                <div className="marker" />
              </Marker>
            ))
          : ''}
      </MapGL>
    );
  }
}

export default connect(mapStateToProps)(Map);
