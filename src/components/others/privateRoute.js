import React from "react";
import { Route, Redirect } from "react-router-dom";
import checkLogin from "./checkLogin";

export default function PrivateRoute({ children, ...rest }) {
  const loggedIn = checkLogin();
  console.log('private');
  return (
    <Route
      {...rest}
      render={() =>
        loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )
      }
    />
  );
}
