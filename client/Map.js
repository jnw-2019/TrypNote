import React, { Component } from 'react';
import MapGL, { Marker, NavigationControl } from 'react-map-gl';

const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');
mapboxgl.accessToken =
  'pk.eyJ1IjoibmVsbHlnZWQiLCJhIjoiY2pzaGdvZDAxMWM4aDQ0cWdmc2c0c3VxcSJ9.66st5uwT4ahIOlp338rhBA';

class Map extends Component {
  constructor() {
    super();
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
  }
  componentDidMount() {}

  componentWillUnmount() {}

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
    const { entries } = this.props;
    entries.forEach(marker => {
      // create a HTML element for each feature
      var el = document.createElement('div');
      el.className = 'marker';

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el).setLngLat([
        marker.location.longitude,
        marker.location.latitude,
      ]);
      //.addTo(this.map);
    });
    //<div style={style} ref={el => (this.mapContainer = el)} />;
    // <div className="nav" style={style}>
    //       <NavigationControl />
    //     </div>
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
        {entries.map(marker => (
          <Marker
            key={marker.id}
            longitude={marker.location.longitude * 1}
            latitude={marker.location.latitude * 1}
          >
            <div className="marker" />
          </Marker>
        ))}
      </MapGL>
    );
  }
}

export default Map;
