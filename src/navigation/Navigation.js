import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";

import WrappedRoutes from "./WrappedRoutes";

import { AuthGlobal } from "../contexts/stores/Auth";

const Navigation = () => {
  const { stateUser } = useContext(AuthGlobal);
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact
          render={() =>
            stateUser.isAuthenticated ? <Dashboard /> : <Redirect to="/login" />
          }
        />
        <Route
          path="/login"
          render={() =>
            !stateUser.isAuthenticated ? <Login /> : <Redirect to="/" />
          }
        />
        <Route
          path="/"
          render={() =>
            stateUser.isAuthenticated ? (
              <WrappedRoutes />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </Switch>
    </Router>
  );
};

export default Navigation;