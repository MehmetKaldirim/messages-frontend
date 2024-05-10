import React from "react";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import Users from "./users/pages/Users";
import NewPost from "./feeds/pages/NewPost";
import Feeds from "./feeds/pages/Feeds";
import UpdatePost from "./feeds/pages/UpdatePost";
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
          <Route path="/feeds/new" exact>
            <NewPost />
          </Route>
          <Route path="/feeds/:postId">
            <UpdatePost />
          </Route>

          <Route path="/users" exact>
            <Users />
          </Route>

          <Route path="/:userId">
            <UserItem />
          </Route>

          <Redirect to="/" />
        </Switch>
      </main>
    </Router>
  );
};

export default App;
