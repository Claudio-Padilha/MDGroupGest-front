import React from 'react';

import { Switch, Route, HashRouter } from "react-router-dom";

const Router = ({ routes }) => {
  return (
    <HashRouter>
        <Switch>
          {routes.map((route) => {
            console.log(route, 'ROUTE')
            return (
              <div>
                <Route exact path={route.path} component={route.component} />
              </div>     
            );
          })}
        </Switch>
    </HashRouter>
  );
}

export default Router;