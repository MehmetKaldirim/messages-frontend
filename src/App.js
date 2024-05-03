import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./users/pages/Users";
import NewFeed from "./feeds/pages/NewFeed";
import Feeds from "./feeds/pages/Feeds";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Feeds />
        </Route>
        <Route path="/feeds/new" exact>
          <NewFeed />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;
