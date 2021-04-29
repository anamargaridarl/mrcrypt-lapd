import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import CoinPage from "./pages/CoinPage";
import ConverserPage from "./pages/ConverserPage";
import HomePage from "./pages/HomePage";
import SocialMediaPage from "./pages/SocialMediaPage";
import NewsPage from "./pages/NewsPage";

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
        <Route path="/converser" exact>
          <ConverserPage></ConverserPage>
        </Route>
        <Route path="/socialmedia" exact>
          <SocialMediaPage></SocialMediaPage>
        </Route>
        <Route path="/coinpage/:coinName" exact>
          <CoinPage></CoinPage>
        </Route>
        <Route path="/news" exact>
          <NewsPage></NewsPage>
        </Route>
      </Switch>
    </main>
  );
}

export default App;
