import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import Home from '../Home';
import Review from '../Review';
import SignIn from '../SignIn';
import Landing from '../Landing';
import history from './history';

export default function PrivateRoute({
}) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/Review" exact component={Review} />
        <Route path="/SignIn" exact component={SignIn} />
      </Switch>
    </Router>
  );
}
