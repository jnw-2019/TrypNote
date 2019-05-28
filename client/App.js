import React, { Component } from 'react';
import { HashRouter, Route, Switch, Link } from 'react-router-dom';
import Login from './Login';

class App extends Component {

    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                </Switch>
            </HashRouter>
        )
    }
}

export default App;
