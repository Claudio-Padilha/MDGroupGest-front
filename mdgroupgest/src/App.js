import React from 'react';
import Login from './screens/Login/login';
import CreateContract from './screens/CreateContract/createContract';
import CreateEmployee from './screens/CreateEmployee/createEmployee';
import CreateOffice from './screens/CreateOffice/createOffice';
import BackOffice from './screens/Home/backOffice';
import EmployeeType from './screens/EmployeeType/employeeType';

import TextWithCalendar from './components/TextWithCalendar/textWithCalendar';
import SwitchButton from './components/ToggleComponent/toggleButton';
import Navbar from './components/Navbar/navbar';
import { Route } from 'react-router-dom';
import Router from './router';
import history from './utils/history';

function App() {
  const paths = {
    login: "/",
    createContract: "/CreateContract",
    createEmployee: "/CreateEmployee",
    backOffice: "/BackOffice",
    employeeType: "/EmployeeType",
  };
  
  const routes = [
    { path: paths.login, component: Login },
    { path: paths.createContract, component: CreateContract },
    { path: paths.createEmployee, component: CreateEmployee },
    { path: paths.backOffice, component: BackOffice },
    { path: paths.employeeType, component: EmployeeType },
  ];

  return (
    <Router routes={routes} history={history} />
  );
}

export default App;
