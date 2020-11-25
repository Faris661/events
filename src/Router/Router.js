import React from 'react';
import Dashboard from '../components/Dashboard';
import { Route, Switch } from 'react-router-dom';
import Form from '../components/Form';

function Router() {
  return (
    <div className="main-container">
      <Switch>
        <Route exact path="/" component={Dashboard}></Route>
        <Route exact path="/create" component={Form}></Route>
      </Switch>
    </div>
  );
}

export default Router;