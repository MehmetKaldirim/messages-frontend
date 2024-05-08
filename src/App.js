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
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import UserItem from "./users/components/UserItem1";

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path="/" exact>
            <Feeds />
          </Route>
          <Route path="/users" exact>
            <Users />
          </Route>
          <Route path="/:userId" exact>
            <UserItem />
          </Route>
          <Route path="/feeds/new" exact>
            <NewFeed />
          </Route>
          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
