import React, { useCallback, useState } from "react";

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
import SingleUser from "./users/pages/SingleUser";
import Auth from "./users/pages/Auth";
import MyFeeds from "./feeds/pages/MyFeeds";

import { AuthContext } from "./shared/context/auth-context";

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const login = useCallback((uid, token) => {
    setToken(token);
    console.log("setToken");
    setUserId(uid);
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
  }, []);

  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Feeds />
        </Route>
        <Route path="/feeds/new" exact>
          <NewPost />
        </Route>
        <Route path="/feeds/posts/:postId">
          <UpdatePost />
        </Route>
        <Route path="/feeds/users" exact>
          <Users />
        </Route>

        <Route path="/feeds/users/:userId">
          <SingleUser />
        </Route>

        <Route path="/feeds/:userId/posts" exact>
          <MyFeeds />
        </Route>

        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Feeds />
        </Route>
        <Route path="/feeds/users" exact>
          <Users />
        </Route>
        <Route path="/feeds/users/:userId">
          <SingleUser />
        </Route>

        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
