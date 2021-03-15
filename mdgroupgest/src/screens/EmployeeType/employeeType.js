import React, { useMemo, useCallback } from "react";
import { Link, useHistory, Redirect } from "react-router-dom";

import { Heading, SubHeading, Body } from '../../components/Text/text';
import { BackIcon } from '../../components/Icon/icons';

import CONSTANTS from '../../constants';
import {
  MainContainer,
  CardsContainer,
  FirstRow,
  FirstRowForAdmin,
  SecondRow,
  HomePageButton
} from "./styles";

import {
  MDCard,
  MDCardBody,
  MDButton 
} from '../../screens/Home/md';

import { useAuth } from '../../hooks/employees/auth';
import { useEmployees } from '../../hooks/employees/employees';
import employeesRequests from "../../hooks/requests/employeesRequests";
import officesRequests from "../../hooks/requests/officesRequests"; 
import { GoHomeButton } from "../EmployeeList/styles";

const EmployeeType = (props) => {
  function _goBack() {
    window.location.replace('#/BackOffice');    
  }

  const history = useHistory();

  const isFromBackOffice = props?.location?.state?.isFromBackOffice;
  const currentOfficeID = JSON.parse(localStorage.getItem('currentUser'))?.user?.office;
  const currentUser = props?.location?.state?.user;
  const isAdmin = currentUser?.user?.is_admin;
  const fromEmployeeCreation = props?.location?.state?.fromEmployeeCreation;

  const { isCEO, isRegularManager, isAdministrator, isRegularSecretary } = useAuth()
  const { 
    ceo, 
    regularManager,
    administrator,
    regularSecretary,
    teamLeaders, 
    instructors, 
    comercials
  } = useEmployees()

  const currentOfficeObject = useMemo(() => {
    officesRequests.getOffice(currentOfficeID)

    return JSON.parse(localStorage.getItem('currentOffice'))
  }, [currentOfficeID])

  const _allEmployees = useCallback(() => {
    return employeesRequests.getAllEmployees(currentOfficeID)
    
  }, [isFromBackOffice]);

  _allEmployees()

  const allEmployees = _allEmployees()

  const renderAdminCard = () => (
    <Link to={{
      pathname:"/CreateEmployee",
      state: {
        userType: "admin",
        title: "Criar Administrador(a)",
        officeID: currentOfficeID,
        officeOBJ: currentOfficeObject,
        shouldRenderEmployeeAssociation: false
      }  
    }}>
      <MDCard className={"card"}>
        <MDCardBody>
          <SubHeading style={{color: CONSTANTS?.colors?.darkGrey}}>Administrador(a)</SubHeading>
        </MDCardBody>
      </MDCard>
    </Link>
  )

  const renderManagerCard = () => (
    <Link to={{
      pathname:"/CreateEmployee",
      state: {
        userType: "manager",
        title: "Criar Gerente",
        officeID: currentOfficeID,
        officeOBJ: currentOfficeObject,
        shouldRenderEmployeeAssociation: false
      }  
    }}>
      <MDCard className={"card"}>
        <MDCardBody>
          <SubHeading style={{color: CONSTANTS?.colors?.darkGrey}}>Gerente</SubHeading>
        </MDCardBody>
      </MDCard>
    </Link>
  );

  const renderSecretaryCard = () => (
    <Link to={{
      pathname:"/CreateEmployee",
      state: {
        userType: "secretary",
        title: "Criar Secretário(a)",
        officeID: currentOfficeID,
        officeOBJ: currentOfficeObject,
        shouldRenderEmployeeAssociation: false
      }  
    }}>
      <MDCard className={"card"}>
        <MDCardBody>
          <SubHeading style={{color: CONSTANTS?.colors?.darkGrey}}>Secretário(a)</SubHeading>
        </MDCardBody>
      </MDCard>
    </Link>
  );

  const renderTeamLeaderCard = () => (
    <Link to={{
      pathname:"/CreateEmployee",
      state: {
        userType: "team_leader",
        title: "Criar Team Leader",
        officeID: currentOfficeID,
        officeOBJ: currentOfficeObject,
        employeeToAssociate: allEmployees?.manager,
        shouldRenderEmployeeAssociation: true
      }  
    }}>
      <MDCard className={"card"}>
        <MDCardBody>
          <SubHeading style={{color: CONSTANTS?.colors?.darkGrey}}>Team Leader</SubHeading>
        </MDCardBody>
      </MDCard>
    </Link>
  );

  const renderInstructorCard = () => (
    <Link to={{
      pathname:"/CreateEmployee",
      state: {
        userType: "instructor",
        title: "Criar Instrutor(a)",
        officeID: currentOfficeID,
        officeOBJ: currentOfficeObject,
        employeeToAssociate: allEmployees?.sales_person,
        shouldRenderEmployeeAssociation: true
      }  
    }}>
      <MDCard className={"card"}>
        <MDCardBody>
          <SubHeading style={{color: CONSTANTS?.colors?.darkGrey}}>Instrutor(a)</SubHeading>
        </MDCardBody>
      </MDCard>
    </Link>
  );

  const renderComercialCard = () => (
    <Link to={{
      pathname:"/CreateEmployee",
      state: {
        userType: "sales_person",
        title: "Criar Funcionário(a)",
        officeID: currentOfficeID,
        officeOBJ: currentOfficeObject,
        employeeToAssociate: regularManager?.concat(teamLeaders, instructors),
        shouldRenderEmployeeAssociation: true
      }  
    }}>
      <MDCard className={"card"}>
        <MDCardBody>
          <SubHeading style={{color: CONSTANTS?.colors?.darkGrey}}>Funcionário(a)</SubHeading>
        </MDCardBody>
      </MDCard>
    </Link>
  );
    // ceo e admin deverão ver um shouldShowOffice assim como employeeToAssociate
  const ceoView = () => (
    <CardsContainer>
      <FirstRow ceo>
        {renderAdminCard()}
        {renderManagerCard()}
        
      </FirstRow>

      <SecondRow ceo>
        {renderSecretaryCard()}
        {renderComercialCard()}
      </SecondRow>

      <GoHomeButton style={{alignSelf: 'center' }}>
        <Body>
          <Link to={"/BackOffice"}>
            <MDButton style={{height: '4vh', width: '6vw'}}>Cancelar</MDButton>
          </Link>
        </Body>
      </GoHomeButton>

    </CardsContainer>
  )

  const administratorView = () => (
    <CardsContainer>
      <FirstRow admin>
        {renderManagerCard()}
        {renderSecretaryCard()}
      </FirstRow>

      <SecondRow admin>
        {renderComercialCard()}
        
        <GoHomeButton>
          <Body>
            <Link to={"/BackOffice"}>
              <MDButton style={{height: '4vh', width: '6vw'}}>Cancelar</MDButton>
            </Link>
          </Body>
        </GoHomeButton>
      </SecondRow>
      
    </CardsContainer>
  )

  const managerView = () => (
    <CardsContainer>

      <FirstRow>
        {renderSecretaryCard()}
        {renderComercialCard()}
      </FirstRow>
      
      <SecondRow>
        
        
        <GoHomeButton>
          <Body>
            <Link to={"/BackOffice"}>
              <MDButton style={{height: '4vh', width: '6vw'}}>Cancelar</MDButton>
            </Link>
          </Body>
        </GoHomeButton>
      </SecondRow>
    
    </CardsContainer>
  )

  const regularSecretaryView = () => (
    <CardsContainer>

      <FirstRow>
        {renderComercialCard()}
      </FirstRow>
      
      <SecondRow>   
        <GoHomeButton>
          <Body>
            <Link to={"/BackOffice"}>
              <MDButton style={{height: '4vh', width: '6vw'}}>Cancelar</MDButton>
            </Link>
          </Body>
        </GoHomeButton>
      </SecondRow>
    
    </CardsContainer>
  )
  function _navigateToEmployeeForm() {
return (    <Redirect
      to={{
        pathname: "/CreateEmployee",
        state: {
          userType: "manager",
          title: "Criar Funcionário(a)",
          officeID: currentOfficeID,
          officeOBJ: currentOfficeObject,
          shouldGoToBackOffice: true,
          shouldRenderEmployeeAssociation: false
        }  
      }}
    />)
  }
  

  const handleUserView = useCallback(
    () => {
      if(isCEO) {
        return ceoView()
      } else if (isAdministrator) {
        return administratorView()
      } else if (isRegularManager) {
        return managerView()
      } else if (isRegularSecretary) {
        return _navigateToEmployeeForm()
      }
    },
    [currentUser],
  )

  return(
    <MainContainer>
      <BackIcon onClick={_goBack} />
      <Heading style={{ position: 'absolute', top: '1%', textShadow: '2px 2px 5px rgba(230, 230, 230, 0.8)', color: CONSTANTS?.colors?.darkGrey }}>Qual é o tipo de funcionário a ser inserido?</Heading>
      { handleUserView(currentUser) }
      {/* <CardsContainer>

        {isAdmin && <FirstRowForAdmin>
          {renderManagerCard()}
          {renderSecretaryCard()}
          {renderTeamLeaderCard()}
        </FirstRowForAdmin>}

        {fromEmployeeCreation && <FirstRowForAdmin>
          {renderManagerCard()}
          {renderSecretaryCard()}
          {renderTeamLeaderCard()}
        </FirstRowForAdmin>}

        {!isAdmin && !fromEmployeeCreation && <FirstRow>
          {renderSecretaryCard()}
          {renderTeamLeaderCard()}
        </FirstRow>}
        
        <SecondRow>
          {renderInstructorCard()}
          {renderComercialCard()}
          <HomePageButton>
            <Body>
              <Link to={"/BackOffice"}>
                <MDButton>Cancelar</MDButton>
              </Link>
            </Body>
          </HomePageButton>
        </SecondRow>
      
      </CardsContainer> */}

    </MainContainer>
  );
};

export default EmployeeType;