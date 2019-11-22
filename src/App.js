import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PlayPage from "./components/pages/playPage";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/play">
          <PlayPage/>
        </Route>
        <Route path="/">
          <PlayPage/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
