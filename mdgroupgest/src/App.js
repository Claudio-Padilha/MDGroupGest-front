import React from 'react';
import Login from './screens/Login/login';
import CreateContract from './screens/CreateContract/createContract';
import CreateEmployee from './screens/CreateEmployee/createEmployee';
import CreateOffice from './screens/CreateOffice/createOffice';
import BackOffice from './screens/Home/backOffice';
import EmployeeType from './screens/EmployeeType/employeeType';
import ContractList from './screens/ContractList/contractList';
import MyResults from './screens/MyResults/myResults';
import MyTeam from './screens/MyTeam/myTeam';
import EmployeeList from './screens/EmployeeList/employeeList';
import ContractDetail from './screens/ContractDetail/contractDetail';
import ChooseEmployeeTypeToSee from './screens/EmployeeList/chooseEmployeeTypeToSee';
import ChooseTypeOfContract from './screens/CreateContract/chooseTypeOfContract';
import MyProfile from './screens/MyProfile/myProfile';
import OfficeMonthResultDetail from './screens/OfficeResultDetail/officeResultDetail';
import EditEmployee from './screens/EditEmployee/editEmployee';
import ExportPaymentSheet from './screens/ExportPaymentSheet/exportPaymentSheet';
import TeamReport from './screens/TeamReport/teamReport';

import Router from './router';

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
    myTeam: "/MyTeam",
    employeeList: "/EmployeeList",
    contractDetail: "/ContractDetail",
    chooseEmployeeTypeToSee: "/ChooseEmployeeTypeToSee",
    chooseTypeOfContract: "/ChooseTypeOfContract",
    myProfile: "/MyProfile",
    officeResultDetail: "/OfficeMonthResultDetail",
    editEmployee: "/EmployeeEdit",
    exportPaymentSheet: "/ExportPaymentSheet",
    teamReport: "/TeamReport",
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
    { path: paths.myTeam, component: MyTeam },
    { path: paths.employeeList, component: EmployeeList },
    { path: paths.contractDetail, component: ContractDetail },
    { path: paths.chooseEmployeeTypeToSee, component: ChooseEmployeeTypeToSee },
    { path: paths.chooseTypeOfContract, component: ChooseTypeOfContract },
    { path: paths.myProfile, component: MyProfile },
    { path: paths.officeResultDetail, component: OfficeMonthResultDetail },
    { path: paths.editEmployee, component: EditEmployee },
    { path: paths.exportPaymentSheet, component: ExportPaymentSheet },
    { path: paths.teamReport, component: TeamReport }
  ];

  return (
    <Router routes={routes} />
  );
}

export default App;
