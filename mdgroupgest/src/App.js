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
import MyTeam from './screens/MyTeam/myTeam';
import EmployeeDetail from './screens/EmployeeDetail/employeeDetail';

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
    myTeam: "/MyTeam",
    employeeDetail: "/EmployeeDetail",
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
    { path: paths.myTeam, component: MyTeam },
    { path: paths.employeeDetail, component: EmployeeDetail },
  ];

  console.log(localStorage, 'RAM')

  return (
    <Router routes={routes} history={history} />
  );
}

export default App;
