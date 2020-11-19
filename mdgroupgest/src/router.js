import React from 'react';

import { BrowserRouter, Switch, Route } from "react-router-dom";

const Router = ({ routes }) => {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route) => {
          return (
            <Route exact path={route.path} component={route.component} />
          );
        })}
      </Switch>
    </BrowserRouter>
  );
}

export default Router;