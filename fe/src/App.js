import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <main>
      <Switch>
        <Route path="/home" exact>
          <HomePage></HomePage>
        </Route>
      </Switch>
    </main>
  );
}

export default App;
