import React from "react";
import { Route, Redirect } from "react-router-dom";
import checkLogin from "./checkLogin";

export default function PublicRoute({ children, ...rest }) {
  const loggedIn = checkLogin();
  console.log('public');
  return (
    <Route
      {...rest}
      render={() =>
        !loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/"
            }}
          />
        )
      }
    />
  );
}
