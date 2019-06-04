import React, { Component } from 'react';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import ViewEntry from './ViewEntry';
import CreateEntry from './CreateEntry';

class App extends Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/entries/:entryId" component={ViewEntry} />
          <Route
            exact
            path="/entries/createEntry/users/:userId"
            component={CreateEntry}
          />
        </Switch>
      </HashRouter>
    );
  }
}

export default App;
