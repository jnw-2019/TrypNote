import React, { Component } from 'react';
import { HashRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import ViewEntry from './ViewEntry';
import { connect } from 'react-redux';
import { syncCookieAndSession } from './store';

class App extends Component {

  // componentDidMount() {
  //   this.props.requestSyncCookie();
  // }
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/entries/:entryId" component={ViewEntry} />
        </Switch>
      </HashRouter>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return {
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestSyncCookie: () => dispatch(syncCookieAndSession())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
