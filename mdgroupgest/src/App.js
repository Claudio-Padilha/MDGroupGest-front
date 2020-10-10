import React from 'react';
import Login from './screens/Login/login';
import CreateContract from './screens/CreateContract/createContract';
import CreateEmployee from './screens/CreateEmployee/createEmployee';
import CreateOffice from './screens/CreateOffice/createOffice';
import BackOffice from './screens/Home/backOffice';
import EmployeeType from './screens/EmployeeType/employeeType';
import ContractList from './screens/ContractList/contractList';
import MyResults from './screens/MyResults/myResults';
import MyMonth from './screens/MyMonth/myMonth';

import TextWithCalendar from './components/TextWithCalendar/textWithCalendar';
import SwitchButton from './components/ToggleComponent/toggleButton';
import Navbar from './components/Navbar/navbar';
import { Route } from 'react-router-dom';
import Router from './router';
import history from './utils/history';

function App() {
  const paths = {
    login: "/",
    createOffice: "/CreateOffice",
    createContract: "/CreateContract",
    createEmployee: "/CreateEmployee",
    backOffice: "/BackOffice",
    employeeType: "/EmployeeType",
    contractList: "/ContractList",
    myResults: "/MyResults",
    myMonth: "/MyMonth",
  };
  
  const routes = [
    { path: paths.login, component: Login },
    { path: paths.createOffice, component: CreateOffice},
    { path: paths.createContract, component: CreateContract },
    { path: paths.createEmployee, component: CreateEmployee },
    { path: paths.backOffice, component: BackOffice },
    { path: paths.employeeType, component: EmployeeType },
    { path: paths.contractList, component: ContractList },
    { path: paths.myResults, component: MyResults },
    { path: paths.myMonth, component: MyMonth },
  ];

  return (
    <Router routes={routes} history={history} />
  );
}

export default App;
