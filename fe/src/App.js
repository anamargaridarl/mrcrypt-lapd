import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route path="/home" exact>
          <HomePage></HomePage>
        </Route>
      </Switch>
    </main>
  );
}

export default App;
