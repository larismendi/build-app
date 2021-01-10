import React from "react";
import { Route, Switch } from "react-router-dom";

import Profile from "../../pages/Profile";
import Github from "../../pages/Github";
import Error from "../../pages/Error";

const WrappedRoutes = () => (
  <Switch>
    <Route path="/profile" exact component={Profile} />
    <Route path="/github" exact component={Github} />
    <Route path="/github/favorites" exact component={Github} />
    <Route component={Error} />
  </Switch>
);

export default WrappedRoutes;