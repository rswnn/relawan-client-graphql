import React, { useState } from "react";
import LoginView from "../pages/login";
import HomeView from "../pages/home";
import Header from "../common/header";
import RegisterView from "../pages/register";
import PrivateRoute from "./private-route";

import { AuthContext } from "../context/auth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function Index() {
  const existingTokens = localStorage.getItem("tokens");
  console.log(existingTokens);
  const [authTokens, setAuthTokens] = useState(existingTokens);

  const setTokens = (data: string) => {
    localStorage.setItem("tokens", data);
    setAuthTokens(data);
  };
  return (
    <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
      <Router>
        <Header token={existingTokens} />
        <Switch>
          <Route exact path="/login" component={LoginView} />
          <Route exact path="/register" component={RegisterView} />
          <PrivateRoute
            exact
            path="/"
            component={() => <HomeView token={existingTokens} />}
          />
          <PrivateRoute
            exact
            path="/home"
            component={() => <HomeView token={existingTokens} />}
          />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default Index;
