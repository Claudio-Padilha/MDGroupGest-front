import React, { Component } from 'react';

import { BrowserRouter, Switch, Route, useLocation } from "react-router-dom";

import Login from './screens/Login/login';
import CreateContract from './screens/CreateContract/createContract';
import CreateEmployee from './screens/CreateEmployee/createEmployee';

// const paths = {
//   login: "/Login",
//   createContract: "/CreateContract",
//   createEmployee: "/CreateEmployee",
//   homePage: "/homePage", 
// };

// const routes = [
//   { path: paths.login, component: Login },
//   { path: paths.createContract, component: CreateContract },
//   { path: paths.createEmployee, component: CreateEmployee },
//   { path: paths.homePage, component: HomePage },
// ];
 
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