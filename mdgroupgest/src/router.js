import React, { Component } from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './screens/Login/login';
import CreateContract from './screens/CreateContract/createContract';
import CreateEmployee from './screens/CreateEmployee/createEmployee';

const AppRouter = ({ component: Component, path, props} ) => {
  return <Route exact path={path} render={() => <Component {...props} />} />;
};

const paths = {
  login: "/Login",
  createContract: "/CreateContract",
  createEmployee: "/CreateEmployee"
};

const routes = [
  { path: paths.login, component: Login },
  { path: paths.createContract, component: CreateContract },
  { path: paths.createEmployee, component: CreateEmployee }
];
 
const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route) => {
          return (
            <AppRouter 
              key={route.path}
              path={route.path}
              isPrivate={route.isPrivate}
              component={route.component}
              />
          );
        })}
      </Switch>
    </BrowserRouter>
  );
}

export default Router;