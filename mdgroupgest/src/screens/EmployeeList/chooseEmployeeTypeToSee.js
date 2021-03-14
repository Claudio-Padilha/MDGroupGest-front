import React, { useMemo, useCallback } from "react";
import { Link } from "react-router-dom";

import { Heading, SubHeading, Body } from '../../components/Text/text';
import { BackIcon } from '../../components/Icon/icons';

import CONSTANTS from '../../constants';
import {
  CardsContainer,
  FirstRow,
  SecondRow,
  GoHomeButton,
  MainContainerEType
} from "./styles";

import {
  MDCard,
  MDCardBody,
  MDButton 
} from '../../screens/Home/md';

import { useEmployees, useEmployeesActions } from '../../hooks/employees/employees'
import { useAuth } from '../../hooks/employees/auth'
import employeesRequests from "../../hooks/requests/employeesRequests";
import officesRequests from '../../hooks/requests/officesRequests';

const ChooseEmployeeTypeToSee = (props) => {
  function _goBack() {
    window.location.replace('#/BackOffice');    
  }

  const isFromBackOffice = props?.location?.state?.isFromBackOffice;
  const isFromCreation = props?.location?.state?.cameFromCreation;
  const isFromEdit = props?.location?.state?.cameFromEdit;
  const employeesAfterUpdate = props?.location?.state?.employeesAfterUpdate;
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const currentOfficeID = currentUser?.user?.office;

  function _allEmployees() {
    if(isFromBackOffice || isFromCreation) {
      return employeesRequests.getAllEmployees(currentOfficeID)
    } else if (isFromEdit) {
      return employeesAfterUpdate
    }
  }
  _allEmployees()

  const { ceo, regularManager, administrator, regularSecretary, teamLeaders, instructors, comercials } = useEmployees()
  const { isCEO, isRegularManager, isAdministrator, isRegularSecretary } = useAuth()

  const allEmployees = useMemo(() => {
    return JSON.parse(localStorage.getItem('allEmployees'))
  }, [isFromBackOffice, isFromCreation, isFromEdit])

  console.log(ceo, 'CEO')
  console.log(currentUser, 'USER ATUAL')
  console.log(regularManager, 'Gerentes')
  console.log(administrator, 'Administrador')
  console.log(regularSecretary, 'Secretária')
  console.log(teamLeaders, 'Team Leaders')
  console.log(instructors, 'Instrutores')
  console.log(comercials, 'Comerciais')


  const currentOfficeObject = useMemo(() => {
    officesRequests.getOffice(currentOfficeID)

    return JSON.parse(localStorage.getItem('currentOffice'))
  }, [currentOfficeID])

  const renderCEOCard = () => ( 
    <Link to={{
      pathname:"/EmployeeList",
      state: {
        userType: "manager",
        title: "CEO",
        data: ceo,
        dataGoingToList : currentUser,
        officeID: currentOfficeID,
        shouldRenderEmployeeAssociation: false
      }  
    }}>
      <MDCard className={"card"}>
        <MDCardBody>
        { isCEO && 
          <>
            <SubHeading style={{color: CONSTANTS?.colors?.darkGrey, textAlign: 'center'}}>Minha área</SubHeading>  
            <Body style={{color: CONSTANTS?.colors?.darkGrey}}>Clique para editar os teus dados</Body>
          </>
        }

        { currentUser?.user?.user_type === "secretary" && // administrator
          <SubHeading style={{color: CONSTANTS?.colors?.darkGrey, textAlign: 'center'}}>CEO</SubHeading>
        }
        </MDCardBody>
      </MDCard>
    </Link>
  )

  const renderManagerCard = () => (
    <Link to={{
      pathname:"/EmployeeList",
      state: {
        userType: "manager",
        title: "Gerente",
        data: regularManager,
        dataGoingToList : currentUser,
        officeID: currentOfficeID,
        shouldRenderEmployeeAssociation: false
      }  
    }}>
      <MDCard className={"card"}>
        <MDCardBody>
        { isRegularManager &&
          <>
            <SubHeading style={{color: CONSTANTS?.colors?.darkGrey, textAlign: 'center'}}>Minha área</SubHeading>  
            <Body style={{color: CONSTANTS?.colors?.darkGrey}}>Clique para editar os teus dados</Body>
          </>
        }

        { currentUser?.user?.user_type === "secretary" || isCEO &&
          <SubHeading style={{color: CONSTANTS?.colors?.darkGrey, textAlign: 'center'}}>Gerente</SubHeading>
        }
        </MDCardBody>
      </MDCard>
    </Link>
  );

  const renderAdminCard = () => (
    <Link to={{
      pathname:"/EmployeeList",
      state: {
        userType: "secretary", // is_admin
        title: "Administrador(a)",
        data: administrator,
        officeID: currentOfficeID,
        officeOBJ: currentOfficeObject,
        shouldRenderEmployeeAssociation: false
      }  
    }}>
      <MDCard className={"card"}>
        <MDCardBody>
        { currentUser?.user?.user_type === "secretary" && // is_admin
          <>
            <SubHeading style={{color: CONSTANTS?.colors?.darkGrey, textAlign: 'center'}}>Minha área</SubHeading>  
            <Body style={{color: CONSTANTS?.colors?.darkGrey}}>Clique para editar os teus dados</Body>
          </>
        }

        { currentUser?.user?.user_type === "manager" && // ceo
          <SubHeading style={{color: CONSTANTS?.colors?.darkGrey, textAlign: 'center'}}>Administrador(a) </SubHeading>
        }
        </MDCardBody>
      </MDCard>
    </Link>
  );

  const renderSecretaryCard = () => (
    <Link to={{
      pathname:"/EmployeeList",
      state: {
        userType: "secretary", 
        title: "Secretário(a)",
        data: regularSecretary,
        officeID: currentOfficeID,
        officeOBJ: currentOfficeObject,
        shouldRenderEmployeeAssociation: false
      }  
    }}>
      <MDCard className={"card"}>
        <MDCardBody>
        { currentUser?.user?.user_type === "secretary" &&
          <>
            <SubHeading style={{color: CONSTANTS?.colors?.darkGrey, textAlign: 'center'}}>Minha área</SubHeading>  
            <Body style={{color: CONSTANTS?.colors?.darkGrey}}>Clique para editar os teus dados</Body>
          </>
        }

        { currentUser?.user?.user_type === "manager" &&
          <SubHeading style={{color: CONSTANTS?.colors?.darkGrey, textAlign: 'center'}}>Secretário(a) </SubHeading>
        }
        </MDCardBody>
      </MDCard>
    </Link>
  );

  const renderTeamLeaderCard = () => (
    <Link to={{
      pathname:"/EmployeeList",
      state: {
        userType: "teamLeader",
        title: "Team Leader",
        data: teamLeaders,
        employeeToAssociate: regularManager || ceo,
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
      pathname:"/EmployeeList",
      state: {
        userType: "instructor",
        title: "Instrutor(a)",
        data: instructors,
        officeID: currentOfficeID,
        officeOBJ: currentOfficeObject,
        employeeToAssociate: teamLeaders.concat(regularManager).concat(ceo),
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
      pathname:"/EmployeeList",
      state: {
        userType: "salesPerson",
        title: "Comercial",
        data: comercials,
        officeID: currentOfficeID,
        officeOBJ: currentOfficeObject,
        employeeToAssociate: instructors.concat(allEmployees?.manager),
        shouldRenderEmployeeAssociation: true
      }  
    }}>
      <MDCard className={"card"}>
        <MDCardBody>
          <SubHeading style={{color: CONSTANTS?.colors?.darkGrey}}>Comercial</SubHeading>
        </MDCardBody>
      </MDCard>
    </Link>
  );

  const ceoView = () => (
    <CardsContainer>

      <FirstRow ceo >
        {renderCEOCard()}
        {renderAdminCard()}
        {renderManagerCard()}
        {renderTeamLeaderCard()}
      </FirstRow>
      
      <SecondRow ceo >
        {renderSecretaryCard()}
        {renderInstructorCard()}
        {renderComercialCard()}
        
        <GoHomeButton>
          <Body>
            <Link to={"/BackOffice"}>
              <MDButton>Cancelar</MDButton>
            </Link>
          </Body>
        </GoHomeButton>
      </SecondRow>
    
    </CardsContainer>
  )

  const administratorView = () => (
    <CardsContainer>

      <FirstRow administrator >
        {renderAdminCard()}
        {renderManagerCard()}
        {renderSecretaryCard()}      
      </FirstRow>
      
      <SecondRow administrator >
        {renderTeamLeaderCard()}
        {renderInstructorCard()}
        {renderComercialCard()}
        
        <GoHomeButton>
          <Body>
            <Link to={"/BackOffice"}>
              <MDButton>Cancelar</MDButton>
            </Link>
          </Body>
        </GoHomeButton>
      </SecondRow>
    
    </CardsContainer>
  )

  const managerAndSecretaryView = () => (
    <CardsContainer>

      <FirstRow>
        {renderManagerCard()}
        {renderSecretaryCard()}
        {renderTeamLeaderCard()}
      </FirstRow>
      
      <SecondRow>
        {renderInstructorCard()}
        {renderComercialCard()}
        
        <GoHomeButton>
          <Body>
            <Link to={"/BackOffice"}>
              <MDButton>Cancelar</MDButton>
            </Link>
          </Body>
        </GoHomeButton>
      </SecondRow>
    
    </CardsContainer>
  )

  const handleUserView = useCallback(
    () => {

      if (isCEO) {
        return ceoView()
      } else if (isAdministrator) {
        return administratorView()
      } else if (isRegularManager) {
        return managerAndSecretaryView()
      } else if (isRegularSecretary) {
        return managerAndSecretaryView()
      }
    },
    [currentUser],
  )

  
 
  return(
    <MainContainerEType>
      <BackIcon onClick={_goBack} />
      <Heading style={{
        position: 'absolute',
        top: '0%',
        textShadow: '2px 2px 5px rgba(230, 230, 230, 0.8)',
        color: CONSTANTS?.colors?.darkGrey
      }}>
        Olá, {currentUser?.user?.name}!
      </Heading>
      <SubHeading style={{
        position: 'absolute',
        top: '7%',
        textShadow: '2px 2px 5px rgba(230, 230, 230, 0.8)',
        color: CONSTANTS?.colors?.mediumGrey
      }}>
        Que tipo de funcionário queres ver?
      </SubHeading>

      { handleUserView(currentUser) }
    </MainContainerEType>
  );
};

export default ChooseEmployeeTypeToSee;