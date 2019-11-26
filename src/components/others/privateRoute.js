import React from "react";
import { Route, Redirect } from "react-router-dom";
import checkLogin from "./checkLogin";

export default function PrivateRoute({ children, ...rest }) {
  const loggedIn = checkLogin();
  console.log(loggedIn);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        false ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
