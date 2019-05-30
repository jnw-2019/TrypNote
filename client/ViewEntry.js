import React, { Component } from 'react';
import axios from 'axios';

class ViewEntry extends Component {
  constructor() {
    super();
    this.state = {
      entry: {}
    };
  }

  componentDidMount() {
    this.loadData();
  }
  loadData = () => {
    const { match } = this.props;
    return axios
      .get(`/api/entries/${match.params.entryId}`)
      .then(({ data }) => this.setState({ entry: data }));
  };
  render() {
    const { entry } = this.state;
    const { location, weather } = entry;
    return (
      <div className="view-entry-container">
        {Object.keys(entry).length ? (
          <div className="entry-paper">
            <div className="entry-lines">
              <div className="entry-headers">
                <div>
                  {location.longitude}, {location.latitude}
                </div>
                <div>
                  {weather.forecast}, {weather.degrees}&#176;
                </div>
                <div>{entry.createdAt}</div>
                <div>{entry.title}</div>
              </div>
              <div className="entry-text">
                <div>{entry.text}</div>
              </div>
            </div>
            <div className="holes hole-top" />
            <div className="holes hole-middle" />
            <div className="holes hole-bottom" />
          </div>
        ) : null}
      </div>
    );
  }
}

export default ViewEntry;
