import React from "react";
import { Link } from "react-router-dom";

import { Heading, SubHeading, Body } from '../../components/Text/text';
import { BackIcon } from '../../components/Icon/icons';

import {
  MainContainer,
  EmployeeDetailContainer,
  SecondRow,
  HomePageButton
} from "./styles";

import {
  MDCard,
  MDCardBody,
  MDButton 
} from '../../screens/Home/md';


const EmployeeDetail = () => {
  function _goBack() {
    window.history.back();    
  }

  var employee = localStorage.getItem('employeeDetail')

  console.log(employee, 'EMPLOYEE FROM DETAIL')
  // aqui terá a lógica do mês de cada um
  const renderEmployeeDetail = () => {
    return (
      <Link to={{
        pathname:"/EmployeeDetail",
        state: {
          data: "MEU MÊS",
        }  
      }}>
        <MDCard className={"card"}>
          <MDCardBody>
          <SubHeading>{employee}</SubHeading>
          </MDCardBody>
        </MDCard>
      </Link>
    );
  };

  return(
    <MainContainer>
      <BackIcon onClick={_goBack} />
      <EmployeeDetailContainer>
        <SecondRow>
          {renderEmployeeDetail()}
          <HomePageButton>
            <Body>
              <Link to={"/BackOffice"}>
                <MDButton>Cancelar</MDButton>
              </Link>
            </Body>
          </HomePageButton>
        </SecondRow>
      
      </EmployeeDetailContainer>

    </MainContainer>
  );
};

export default EmployeeDetail;
