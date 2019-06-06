import React, { Component } from 'react';
import Nav from './Nav';
import { HashRouter, Route, Switch, Link, Redirect } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import ViewEntry from './ViewEntry';
import { connect } from 'react-redux';
import { syncCookieAndSession } from './store';
import CreateEntry from './CreateEntry';
import SignUp from './SignUp';
import Dashboard from './Dashboard';

class App extends Component {
  componentDidMount() {
    this.props.requestSyncCookie();
  }

  render() {
    return (
      <HashRouter>
        <Nav />
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              return this.props.user.uuid ? <Redirect to="/home" /> : <Login />;
            }}
          />
          <Route
            exact
            path="/home"
            render={() => {
              return this.props.user.uuid ? <Home /> : <Redirect to="/" />;
            }}
          />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/entries/:entryId" component={ViewEntry} />
          <Route exact path="/createEntry" component={CreateEntry} />
          <Route exact path="/dashboard/:" component={Dashboard} />
        </Switch>
      </HashRouter>
    );
  }
}

const mapStateToProps = ({ user }) => {
  console.log('app user', user);
  return {
    user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    requestSyncCookie: () => dispatch(syncCookieAndSession())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
