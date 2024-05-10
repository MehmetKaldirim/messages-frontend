import React, { useContext } from "react";

import { NavLink } from "react-router-dom/";
import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  const userId = auth.userId;
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          ALL FEEDS
        </NavLink>
      </li>
      <li>
        <NavLink to="/feeds/users" exact>
          USERS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/feeds/new" exact>
            ADD POST
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to={`/feeds/${userId}/posts`} exact>
            MY POSTS
          </NavLink>
        </li>
      )}

      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
