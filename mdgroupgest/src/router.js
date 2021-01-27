import React from 'react';

import { BrowserRouter, Switch, Route, HashRouter } from "react-router-dom";

const Router = ({ routes }) => {
  return (
    <HashRouter>
        <Switch>
          {routes.map((route) => {
            return (
              <Route exact path={route.path} component={route.component} />
            );
          })}
        </Switch>
    </HashRouter>
  );
}

export default Router;